This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More Here

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

-----------------

Updating Data

Instructions for updating the CSVs within the GitHub repository assigned. Please note that changes in data structure - through the addition or removal of columns or fields - will nullify the process. 

1.	Log in to the GitHub account: ‘wbcatddodashboard’
2.	Upload the new CSV files. Make sure they are in the correct directory that the project expects (src/data):
•	'Cat_DDO_Portfolio.csv'
•	'Cat_DDO_Prior_Actions.csv'
•	'Cat_DDO_Metadata.csv'
•	‘Cat_DDO_Triggers.csv’
•	'Climate_cobenefits.csv'

3.	Stage and commit the files: git commit -m "Add new CSV files for update (date)"
4.	Push the changes to the main branch: git push origin main
a.	Both Commit and Push can be done through the interface, no need for command line.
5.	Wait 5m for the deployment to complete (Check the status in Vercel dashboard.)
6.	Review changes (Visit the live site https://dashboard-rho-liard-46.vercel.app/ to confirm the updates from the CSV files are applied.). Check for any errors or broken functionality: If needed, inspect logs in Vercel or GitHub Actions.

Notes:

•	When a new FY occurs, update the Last_FY row in 'Cat_DDO_Metadata.csv'.
•	The Portfolio file defines the main list of PCodes that will be considered (i.e., a new row added to the Triggers file will not be considered if the PCode is not in the Portfolio file).
•	Climate cobenefits data can be updated by going to myconnect. Go to Target Map > Climate Finance > Project  >  Download Complete Dataset
•	As the file is not for public disclosure, put it in "Internal_data" folder, then clean it to keep only columns and rows that are relevant using the "Clean_Cobenefits_CatDDO_Dashbord.py" file.
•	NOT DRM data should be removed from PAs
•	Only keep Active and closed operations


