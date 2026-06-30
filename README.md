Instructions for updating the CSVs within the GitHub repository assigned. Please note that changes in data structure - through the addition or removal of columns or fields - will nullify the process.

1. The master file is 'Cat_DDO_Master.csv'. Update this file as well as 'Cat_DDO_Prior_Actions.csv' and 'Cat_DDO_Metadata.csv'
2. Once this file is updated, run the code "Update_wbcatddodashboard.py" file which will produce the files: 'Cat_DDO_Portfolio.csv', ‘Cat_DDO_Triggers.csv’ and 'Climate_cobenefits.csv'.
   (The financing can be updated from https://projects.worldbank.org/en/projects-operations/project-detail/P174191)
3. Log in to the GitHub account: ‘wbcatddodashboard’. To login into Vercel, login using GitHub credentials, not email
4. Upload the new CSV files. Make sure they are in the correct directory that the project expects (src/data):
   • 'Cat_DDO_Portfolio.csv'
   • 'Cat_DDO_Prior_Actions.csv'
   • 'Cat_DDO_Metadata.csv'  
   • ‘Cat_DDO_Triggers.csv’
   • 'Climate_cobenefits.csv'

5. Stage and commit the files: git commit -m "Add new CSV files for update (date)"
6. Push the changes to the main branch: git push origin main
   a. Both Commit and Push can be done through the interface, no need for command line.
7. Wait 5m for the deployment to complete (Check the status in Vercel dashboard.)
8. Review changes to confirm the updates from the CSV files are applied. Check for any errors or broken functionality: If needed, inspect logs in Vercel or GitHub Actions.

Notes:

• When a new FY occurs, update the Last_FY row in 'Cat_DDO_Metadata.csv'.
• Climate cobenefits data can be updated by going to myconnect. Go to Target Map > Climate Finance > Project > Download Complete Dataset XXX Climate Finance dashboard was discontinued apparently. Need to go through Climate Finance Assessment for each project
• As the file is not for public disclosure, put it in "Internal_data" folder, then clean it to keep only columns and rows that are relevant using the "Clean_Cobenefits_CatDDO_Dashbord.py" file.
• NOT DRM data should be removed from PAs
• Only keep Active and closed operations

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
