// env.js
import dotenv from "dotenv";
dotenv.config();

const requiredEnv = [
  "PUBLIC_FIREBASE_API_KEY",
  "PUBLIC_FIREBASE_AUTH_DOMAIN",
  "PUBLIC_FIREBASE_DATABASE_URL",
  "PUBLIC_FIREBASE_PROJECT_ID",
  "PUBLIC_FIREBASE_STORAGE_BUCKET",
  "PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "PUBLIC_FIREBASE_APP_ID",
  "PUBLIC_FIREBASE_MEASUREMENT_ID",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} belum di-set`);
  }
});

export const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID,
};
