# Project status

Updated to React + Vite with Firebase Authentication and Cloud Firestore integration code.

Implemented in source:
- Email/password sign-in using Firebase Authentication
- Firestore user profile lookup and role-based Admin/Cashier navigation
- Firestore counter record writes and live record-list subscription
- Firestore rules template for user-scoped cashier access and admin access
- Environment-based Firebase Web app configuration
- Preserved YDG logo, source workbook, counter UI, and calculations

Still required before real use:
- Add the actual Firebase Web app values to `.env.local`
- Enable Email/Password Authentication and create Firestore
- Publish `firestore.rules`
- Create Firebase Auth users and matching `users/{uid}` profile documents
- Run `npm install` and verify `npm run build` in the target environment
- Reconcile every workbook formula/code mapping and test rules before production

This project cannot be fully connected to a Firebase project without its configuration and project-side setup. Do not share service-account credentials or private keys in the frontend.
