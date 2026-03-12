import app from './app.js';
import { db } from './config/firebase.js';
import { ref, get } from 'firebase/database';

const PORT = process.env.PORT || 5001;

async function testFirebaseConnection() {
  try {
    const snapshot = await get(ref(db, '/'));
    console.log("Firebase Realtime Database CONNECTED!");
  } catch (error) {
    console.error("Firebase connection FAILED:", error.message);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  testFirebaseConnection();
});
