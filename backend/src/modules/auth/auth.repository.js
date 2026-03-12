import { auth, db } from "../../config/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref as dbRef, set, update, get, child } from "firebase/database";

class AuthRepository {
  /**
   * Login user dengan email & password
   * @param {string} email
   * @param {string} password
   */
  async login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const userId = user.uid;
    const now = new Date().toISOString();

    // Update last login & online status
    const userRef = dbRef(db, `users/${userId}`);
    await update(userRef, {
      onlineStatus: true,
      lastLogin: now,
      updatedAt: now,
    });

    const token = await user.getIdToken();

    return {
      id: userId,
      email: user.email,
      token,
    };
  }

  /**
   * Register user baru
   * @param {object} payload
   *  - email
   *  - password
   *  - nik
   *  - fullName
   *  - username
   * @param {string} role default "user"
   */
  async register(payload, role = "user") {
    const { email, password, nik, fullName, username } = payload;

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const now = new Date().toISOString();

    const userData = {
      email,
      nik,
      fullName,
      username,
      role,
      hasVoted: false,
      createdAt: now,
      updatedAt: now,
    };

    console.log("Registering user in database:", userData);

    const userRef = dbRef(db, `users/${user.uid}`);
    await set(userRef, userData);

    const token = await user.getIdToken();

    return {
      id: user.uid,
      ...userData,
      token,
    };
  }

  /**
   * Logout user
   * @param {string} userId
   */
  async logout(userId) {
    const now = new Date().toISOString();

    if (userId) {
      const userRef = dbRef(db, `users/${userId}`);
      await update(userRef, {
        onlineStatus: false,
        lastLogin: now,
        updatedAt: now,
      });
    }

    await signOut(auth);
  }

  /**
   * Ambil data user dari database berdasarkan UID
   * @param {string} uid
   */
  async getUserByUid(uid) {
    try {
      const snapshot = await get(child(dbRef(db), `users/${uid}`));
      const user = snapshot.val();

      if (!user) return null;
      return { id: uid, hasVoted: user.hasVoted || false, ...user };
    } catch (err) {
      console.error("Failed to fetch user by UID:", err);
      throw err;
    }
  }

  async markHasVoted(uid) {
    const now = new Date().toISOString();
    await update(dbRef(db, `users/${uid}`), { hasVoted: true, updatedAt: now });
  }
}

export default new AuthRepository();
