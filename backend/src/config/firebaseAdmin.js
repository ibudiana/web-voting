import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.PUBLIC_FIREBASE_DATABASE_URL,
});

export const adminAuth = admin.auth();
export const adminDb = admin.database();
export default admin;
