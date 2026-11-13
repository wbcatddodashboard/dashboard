# Cat DDO dashboard: data sources and how to update them

What every file in `src/data` contains, where each column comes from, and where to get fresh data.
Checked against the live sources on 13 November 2026.

## How the files fit together

`src/data/Cat_DDO_Master.csv` is the one file you edit: one row per Cat DDO operation (76 today), 71 columns.
`get_data_scripts/src/Update_wbcatddodashboard.py` then splits it into the files the website reads:

| File the website reads | Built from | Rows |
|---|---|---|
| `Cat_DDO_Portfolio.csv` | Master: identity, status, ratings, money columns | 1 per operation |
| `Cat_DDO_Triggers.csv` | Master: trigger text, disasters, legal-agreement links | 1 per operation |
| `Climate_cobenefits.csv` | Master: the three `CCB %` columns | 1 per operation that has them |
| `Cat_DDO_Prior_Actions.csv` | Edited by hand (not in Master) | 1 per prior action (447 today) |
| `Cat_DDO_Metadata.csv` | Edited by hand | "Data last updated" date and `Last_FY` |

Update order: edit Master and Prior Actions, run `python get_data_scripts/src/Update_wbcatddodashboard.py`, run `npm test` (catches broken columns, duplicate P#s and totals that don't add up), then update `Cat_DDO_Metadata.csv` and push.

## Where each column comes from

All sources below are public and need no login, except the two marked **internal**.

| Columns in Master | Source | How to get it |
|---|---|---|
| **Which operations exist** (new rows) | World Bank Documents & Reports API | Search for Cat DDO documents, see "Finding new operations" below. `find_new_projects.py` uses the Projects API, which is stale for recent operations (it still lists Jamaica P507259 as "Pipeline, $0"). |
| P#, Country, ISO3, Region, Description, PDO, Global Practice, Approval Date, Closing Date | [Project page](https://projects.worldbank.org/en/projects-operations/project-detail/P507259) and Program Document | Copy by hand. ISO3 and SIDS from the country. |
| Fiscal Year, Status | Approval date (WB fiscal year runs Jul–Jun) and loan status in Finances One | `Closed` once every Cat DDO loan is fully disbursed, cancelled or past closing. |
| Source, Commitment (All), Commitment (Cat DDO only), Cat DDO Comm - IBRD/IDA | **Finances One** loan data (below) | Each Cat DDO is its own loan/credit number under the P#. Its `original_principal_amount` is the Cat DDO commitment; the other loans under the same P# are the upfront DPF. |
| `FYxx Cat DDO Disb.` (one column per year) | **Finances One historical snapshots** | FY disbursement = `disbursed_amount` on 30 June of that FY minus 30 June of the year before. Monthly history exists from April 2011; keep earlier years as they are. |
| Disbursements - Cat DDO Cum. (+ IBRD / IDA), CAT DDO Undisbursed (+ IBRD / IDA), % Undisbursed | **Finances One latest snapshot** | `disbursed_amount` and `undisbursed_amount` of the Cat DDO loan(s). For closed operations the dashboard puts the cancelled remainder in "Undisbursed"; keep that convention. |
| Outcomes, Bank Performance, Relevance of Prior Actions, Achievement of Objectives, Quality at Entry/Supervision, Risk to Development Outcome, Borrower Performance | **IEG World Bank Project Performance Ratings** | Only for closed operations with an IEG review (ICRR). |
| ICR | Documents API | `Yes` once an "Implementation Completion and Results Report" exists. |
| Generation, Renewal (times), Standalone/Mixed, Activation for COVID, Cofinancing, Note | Program Document, ISRs, renewal letters | By hand. "Mixed" = the operation also has an upfront DPF tranche. |
| Trigger from Loan/Financing Agreements, Link to Financing or Loan Agreement | Loan/Financing Agreement (Documents API, type "Loan Agreement" / "Financing Agreement") | Copy the drawdown condition from the agreement's schedule. |
| Additional Information from Minutes & Program Document, Health Related emergencies…, Disasters that have triggered the Cat DDO | Program Document, Board minutes, ISRs, press releases | By hand. A drawdown shows up in Finances One as a jump in `disbursed_amount`. |
| Adaptation / Mitigation / Total CCB % | **Internal**: One Target Map in myconnect (current method, see README). Public alternative: the project's "Climate Co-Benefits Assessment" document in Documents & Reports, or the World Bank's yearly [project-level climate finance PDF](https://thedocs.worldbank.org/en/doc/af985cf92e8b967ba707f43fb2dd9de7-0320012025/original/FY25-Project-Level-WB-CCB-data.pdf). | `CCB % = 100 × co-benefit $ / total IBRD/IDA commitment $`. |
| Gender Tagged | **Internal**: Gender Tag tracker export (`PostBoardProjects_GeneralUser*.xlsx`, merged by `merge_gender_files.py`) | Not public. |
| **Prior Actions file** (P#, Country, DRM Pillar, Prior Action, Result Indicator) | **DPAD**, the official Development Policy Actions Database ([FY25 Excel](https://thedocs.worldbank.org/en/doc/0da9a60f674a6d1ccfac1f5b75df539c-0290012026/original/DPAD-database-FY25-external.xlsx), updated once a year after June) for the prior-action text; the Program Document's results matrix for the result indicator | DPAD has all prior actions of the operation (not only DRM ones) and covers operations through FY25. `DRM Pillar` is our own classification, done by hand. For FY26+ operations, take prior actions from the Program Document. |

## The public data sources

### Finances One (money columns)

No key needed. Filter by project with `filter=project_id='P507259'`. Send a normal browser `User-Agent` header; the API returns 403 to Python's default one.

| Dataset | datasetId / resourceId | Use |
|---|---|---|
| IBRD Statement of Loans – latest snapshot | `DS00047` / `RS00049` | Current disbursed / undisbursed per IBRD loan |
| IDA Statement of Credits & Grants – latest snapshot | `DS00001` / `RS00001` | Same for IDA credits and grants (field names end in `_us_`) |
| IBRD Statement of Loans – historical (monthly) | `DS00975` / `RS00905` | June 30 snapshots for FY disbursement columns |
| IDA Statement of Credits & Grants – historical (monthly) | `DS00976` / `RS00906` | Same for IDA |
| IEG World Bank Project Performance Ratings | `DS00053` / `RS00051` | ICR review ratings |

Example (latest IBRD loans for Jamaica):
`https://datacatalogapi.worldbank.org/dexapps/fone/api/apiservice?datasetId=DS00047&resourceId=RS00049&type=json&top=100&filter=project_id='P507259'`

IDA amounts are recorded in SDR and converted to US$ every month, so a $20M IDA credit can show $20.7M. Use the commitment in US$ at approval for the commitment columns, and keep the Finances One figures for disbursed amounts.

`get_data_scripts/src/check_financials_finances_one.py` runs this for every P# and lists the operations whose numbers differ from the dashboard.

### Documents & Reports API (documents, new operations)

- All documents of one operation:
  `https://search.worldbank.org/api/v3/wds?format=json&proid=P507259&fl=docty,display_title,docdt,url`
- **Finding new operations:** search recent documents that mention the instrument, newest first:
  `https://search.worldbank.org/api/v3/wds?format=json&rows=100&qterm="Catastrophe Deferred Drawdown"&strdate=2026-07-01&fl=docdt,display_title,projectid,docty&sort=docdt&order=desc`
  Repeat with `qterm="Cat DDO"`. A new operation shows up as a "Program Document", "Project Paper" (additional financing) or "Minutes"/"Record of Approval". Ignore operations with a plain "Deferred Drawdown Option" (DDO) that is not a *Catastrophe* DDO, e.g. Peru P506131.

## What changed since the last update (30 June 2026 data)

Found while checking these sources on 13 November 2026. None of this is in the dashboard yet.

**New Cat DDO operations approved**
- **Mexico P512359**, Disaster and Climate Resilience DPL with a Cat DDO, approved 21 Oct 2026 (FY27).
- **Grenada P512523**, First Competitiveness and Resilience DPC with a Cat DDO, approved 30 Jun 2026 (FY26).

**Additional Cat DDO financing on existing operations**
- **Jamaica P507259**: a second $42M IBRD loan (9962-JM, project paper March 2026), already fully disbursed by 31 Mar 2026. The dashboard shows only the first $42M.
- **Marshall Islands P504373**: project paper May 2026; Finances One now shows a third credit (IDAE6720, $9M) under this P#. Check whether it is Cat DDO or DPF money.

**Drawdowns after 30 June 2026 (go in the FY27 column)**
- **El Salvador P509413**: Cat DDO loan IBRD 9855 ($100M) fully drawn by Oct 2026. Dashboard shows $0 disbursed.
- **Romania P502111**: $346.2M → $397.1M disbursed by Oct 2026.
- **Nepal P181344**: $139.4M → $147.9M disbursed by Sep 2026.
- **Marshall Islands P504373**: Cat DDO credit IDAE3420 ($12M) $11.0M disbursed by Oct 2026.

**New IEG reviews (ICRRs) to take ratings from**
- Colombia P176650 (Oct 2026), Honduras P177001 (Oct 2026), Nepal P166788 (May 2026).

**In preparation (pipeline), check whether they include a Cat DDO**
- Samoa P514213 (appraisal, Oct 2026), Philippines P518644 (concept, Jul 2026), Morocco P517767 (concept, Jul 2026).

**Useful background:** IEG evaluation *Managing Disaster-Related Fiscal Risks in a Shock-Prone World: Insights from the Cat DDO* (P181771, June 2026).

## Before you push

- `Last_FY` in `Cat_DDO_Metadata.csv` controls the last year shown in the disbursement chart. FY27 started on 1 July 2026; switch to `FY27` once you have FY27 disbursements (El Salvador, Romania, Nepal, Marshall Islands above).
- Run `npm test`. The data checks fail if a column is missing, a P# is duplicated, a status or fiscal year is misspelled, an amount isn't a number, or IBRD + IDA don't add up to the totals.
- Raw downloads that are not for public disclosure (One Target Map export, Gender Tag tracker) must not be committed: this repository is public.
