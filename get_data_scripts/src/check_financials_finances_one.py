"""Compare dashboard portfolio numbers with World Bank Finances One loan data.

For every P# in Cat_DDO_Portfolio.csv, fetch its IBRD loans and IDA credits
from the public Finances One "latest available snapshot" datasets, pick the
loan(s) whose original amount matches the Cat DDO commitment, and flag rows
where disbursed/undisbursed amounts differ from the dashboard.

Run from the repository root (no API key needed):
    python get_data_scripts/src/check_financials_finances_one.py
Output: get_data_scripts/data/finances_one_comparison.csv plus a printed list.

See get_data_scripts/DATA_UPDATE_GUIDE.md for how to read the flags.
"""
import csv
import json
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

B = "https://datacatalogapi.worldbank.org/dexapps/fone/api/apiservice"
PORTFOLIO = sys.argv[1] if len(sys.argv) > 1 else "src/data/Cat_DDO_Portfolio.csv"
OUT = sys.argv[2] if len(sys.argv) > 2 else "get_data_scripts/data/finances_one_comparison.csv"


def num(v):
    v = (v or "").strip().replace(",", "")
    if v in ("", "-", "–", "—"):
        return 0.0
    try:
        return float(v)
    except ValueError:
        return 0.0


def fetch(ds, rs, pid):
    q = urllib.parse.urlencode(
        {"datasetId": ds, "resourceId": rs, "type": "json", "top": 100, "filter": f"project_id='{pid}'"}
    )
    for attempt in range(3):
        try:
            req = urllib.request.Request(f"{B}?{q}", headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r).get("data", [])
        except Exception:
            time.sleep(2)
    return None


def loans(pid):
    out = []
    ibrd = fetch("DS00047", "RS00049", pid) or []
    for r in ibrd:
        out.append(dict(src="IBRD", num=r["loan_number"], status=r["loan_status"], orig=r["original_principal_amount"],
                        disb=r["disbursed_amount"], undisb=r["undisbursed_amount"], canc=r["cancelled_amount"],
                        approved=r["board_approval_date"]))
    ida = fetch("DS00001", "RS00001", pid) or []
    for r in ida:
        out.append(dict(src="IDA", num=r["credit_number"], status=r["credit_status"], orig=r["original_principal_amount_us_"],
                        disb=r["disbursed_amount_us_"], undisb=r["undisbursed_amount_us_"], canc=r["cancelled_amount_us_"],
                        approved=r["board_approval_date"]))
    return pid, out


with open(PORTFOLIO, encoding="latin1") as f:
    rows = [{k.strip(): (v or "").strip() for k, v in r.items()} for r in csv.DictReader(f)]

with ThreadPoolExecutor(8) as ex:
    results = dict(ex.map(loans, [r["P#"] for r in rows]))

report = []
for r in rows:
    pid = r["P#"]
    cat = num(r["Commitment (Cat DDO only)"])
    dash_disb = num(r["Disbursements - Cat DDO Cum."])
    dash_und = num(r["CAT DDO Undisbursed"])
    ls = results[pid]
    # Cat DDO tranche(s): loans whose original amount is closest to the Cat DDO commitment.
    best = sorted(ls, key=lambda l: abs(l["orig"] - cat))
    match = [l for l in ls if abs(l["orig"] - cat) <= max(1.0, 0.03 * cat)]
    fone_disb = sum(l["disb"] for l in match)
    fone_und = sum(l["undisb"] for l in match)
    flag = ""
    if not ls:
        flag = "NO LOANS FOUND"
    elif not match:
        flag = "NO LOAN MATCHES CAT DDO AMOUNT"
    elif len(match) > 1:
        flag = "SEVERAL LOANS MATCH"
    elif abs(fone_disb - dash_disb) > 0.03 * max(cat, 1) or abs(fone_und - dash_und) > 0.03 * max(cat, 1):
        flag = "NUMBERS DIFFER"
    report.append(dict(pid=pid, country=r["Country"], status=r["Status"], cat=cat, dash_disb=dash_disb,
                       dash_und=dash_und, fone_disb=fone_disb, fone_und=fone_und, flag=flag,
                       loans="; ".join(f"{l['num']} {l['status']} orig={l['orig']/1e6:.1f}M disb={l['disb']/1e6:.1f}M und={l['undisb']/1e6:.1f}M" for l in ls)))

with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=list(report[0]))
    w.writeheader()
    w.writerows(report)

from collections import Counter
print(Counter(x["flag"] or "OK" for x in report))
for x in report:
    if x["flag"]:
        print(f"{x['pid']} {x['country']:<22} {x['status']:<7} {x['flag']:<32} catDDO={x['cat']/1e6:.0f}M dash disb={x['dash_disb']/1e6:.1f} und={x['dash_und']/1e6:.1f} | {x['loans']}")
