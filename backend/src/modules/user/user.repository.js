import { db } from "../../config/firebase.js";
import { ref, get, set, update, remove, push } from "firebase/database";

class UserRepository {

  // Ambil semua user, sertakan id dari key Firebase
  async findAll() {
    const snapshot = await get(ref(db, "users"));
    if (!snapshot.exists()) return [];

    const usersObj = snapshot.val();
    // Konversi object ke array dengan id = key Firebase
    return Object.entries(usersObj).map(([key, user]) => ({
      id: key,
      ...user
    }));
  }

  // Ambil user by id (key Firebase)
  async findById(id) {
    const snapshot = await get(ref(db, `users/${id}`));
    if (!snapshot.exists()) return null;

    return { id, ...snapshot.val() };
  }

  // Create user baru tanpa menyimpan field id
  async create(userData) {
    const usersRef = ref(db, "users");
    const newUserRef = push(usersRef); // Firebase key otomatis
    const now = new Date().toISOString();

    const { id, ...cleanUserData } = userData; // buang id

    const newUser = {
      ...cleanUserData,
      createdAt: now,
      updatedAt: now,
    };

    await set(newUserRef, newUser);

    return {
      id: newUserRef.key,
      ...newUser
    };
  }

  // Update user by id (tidak menyentuh id di DB)
  async update(id, userData) {
    const now = new Date().toISOString();
    const { id: _ignored, ...cleanUserData } = userData; // buang id

    await update(ref(db, `users/${id}`), {
      ...cleanUserData,
      updatedAt: now
    });

    return this.findById(id);
  }

  // Hapus user by id
  async delete(id) {
    await remove(ref(db, `users/${id}`));
    return true;
  }
}

export default new UserRepository();