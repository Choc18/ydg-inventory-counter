# YDG Inventory Counter — React + Vite + Firebase

A responsive React + TypeScript + Vite web app for YDG's daily inventory/order counter. This is an inventory counter, **not a POS system**. It does not process payments or checkout.

## Run locally

1. Install Node.js LTS.
2. Extract the ZIP and open a terminal in `YDG-React-Vite`.
3. Install packages:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env.local` and fill in the Firebase **Web app** configuration from Firebase Console. Do not commit `.env.local`.
5. In Firebase Console, enable **Authentication → Email/Password** and create a Firestore database.
6. Publish the rules in `firestore.rules` to Firestore Rules.
7. Create staff accounts in **Authentication → Users**. For each account, create `users/{AUTH_UID}` in Firestore with fields like:

   ```json
   {
     "role": "admin",
     "displayName": "YDG Admin",
     "active": true
   }
   ```

   Use `role: "cashier"` for cashier accounts. Use the exact Firebase Authentication UID as the document ID. Role documents cannot be written from this client; manage them in the Firebase Console or a trusted Admin SDK.
8. Start Vite:

   ```bash
   npm run dev
   ```

9. Open the URL shown by Vite, normally `http://localhost:5173`.

## Firebase behavior

- Firebase Authentication signs staff in with email/password.
- The user's Firestore profile determines the Admin or Cashier portal; there is no client-side demo role switch.
- Counter drafts/submissions are saved to `counterRecords` in Cloud Firestore.
- Firestore listeners sync records between the signed-in account and the app. Admins can view all records; cashiers can read their own records.
- Records use a deterministic document ID per user and business date, so saving a draft and submitting it updates the same daily record.
- Firebase configuration is read from `VITE_FIREBASE_*` environment variables. The API key is a client config value; Firestore Security Rules and Authentication are what protect data access.

## Workbook-derived calculations and assets

- The supplied source workbook is preserved at `public/assets/YDG-source-workbook.xlsx` and downloadable in Reports & Export.
- Ingredient/code/ratio definitions and calculations remain in `src/model.ts`; Firebase is the persistence/authentication layer and does not replace the workbook as the reference source.
- Usucha (U) is 3 g/order; other regular/large ratios are as represented in the starter model; coffee is 18 g/order including calibration shots.
- Add-on and milk prices/options remain in `src/model.ts`. Add-on selections are tracked separately and do not change powder gram calculations.

## Security and deployment notes

- Do not allow public writes to the `users` collection. Use the included rules as a starting point and test them in Firebase Rules Playground before production.
- Cashier role documents must use lowercase `cashier`; admin role documents must use lowercase `admin`.
- A cashier may update a record only while its current status is `Draft`. Submitted records are intended to be final. Admin updates are permitted by the current rules.
- This app has not been connected to your actual Firebase project because project credentials were not provided. You must configure `.env.local`, deploy the rules, and create user profiles before sign-in and cloud sync will work.
- The workbook is included as the source reference, but this code does not execute Excel formulas directly. Validate all mappings/ratios against the workbook before operational use.


## UI/UX improvements in this revision

- Sticky table headers and ingredient-name column for easier scanning across wide counter matrices.
- A sticky bottom TOTAL row that calculates each workbook drink-code column independently, plus total orders and powder used.
- Larger, clearer numeric inputs with focus states and row hover highlighting.
- Improved horizontal/vertical scrolling on tablet and mobile widths.
- Existing app structure, Firebase integration, and workbook-derived model retained.


## Auto-save, daily rollover, and Excel export

- Counter edits are saved to browser local storage immediately and synced as a Draft to Firestore after a short pause.
- Use **Save now** to force a cloud save. **Submit & download Excel** saves the submitted record and downloads an Excel-compatible `.xls` report.
- **Clear all** and **Clear this counter** ask for confirmation and download a backup before clearing.
- The app checks Philippine time (`Asia/Manila`) and at/after 2:00 AM exports the current shift, archives the record in Firestore, and resets the counters for a new day.
- Automatic 2:00 AM rollover runs while the app is open; if the browser/device is fully closed, it runs on the next time the app is opened. Keep the device online for Firestore sync.


## Daily Backlog and Profile update
- Daily Backlog is available to staff to review saved counter records by date. Records are retained in Firestore; opening a record loads that day's counts.
- Profile lets a signed-in staff member update their display name. Role and active status remain administrator-controlled.
- If deploying the profile edit, publish the updated `firestore.rules` to the Firebase project. The rule permits a user to update only their own `displayName`; it does not allow role or account-status changes.
- The app's record history depends on Firebase authentication and Firestore being configured and available.
