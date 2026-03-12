import { db, auth } from "../config/firebase.js";
import { ref, set, push, remove } from "firebase/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { adminAuth } from "../config/firebaseAdmin.js";

const users = [
  {
    username: "admin_desa",
    email: "admin@desamaju.id",
    role: "admin",
    fullName: "Budi Santoso",
    nik: "3201010101010001",
    alamat: "Jl. Merdeka No. 1, Desa Maju Jaya",
    password: "password",
    avatar:
      "https://ui-avatars.com/api/?name=Budi+Santoso&background=4f46e5&color=fff",
  },
  {
    username: "ahmad_subarjo",
    email: "ahmad@gmail.com",
    role: "user",
    fullName: "Ahmad Subarjo",
    nik: "3201010101010002",
    alamat: "RT 01/RW 02, Desa Maju Jaya",
    password: "password",
    avatar:
      "https://ui-avatars.com/api/?name=Ahmad+Subarjo&background=10b981&color=fff",
  },
  {
    username: "siti_aminah",
    email: "siti@outlook.com",
    role: "user",
    fullName: "Siti Aminah",
    nik: "3201010101010003",
    alamat: "RT 03/RW 02, Desa Maju Jaya",
    password: "password",
    avatar:
      "https://ui-avatars.com/api/?name=Siti+Aminah&background=f59e0b&color=fff",
  },
  {
    username: "eko_prasetyo",
    email: "eko.p@perusahaan.com",
    role: "user",
    fullName: "Eko Prasetyo",
    nik: "3201010101010004",
    alamat: "Dusun Sukamandi, Desa Maju Jaya",
    password: "password",
    avatar:
      "https://ui-avatars.com/api/?name=Eko+Prasetyo&background=ec4899&color=fff",
  },
];

const candidates = [
  {
    number: 1,
    name: "Andi & Budi",
    vision: "Mewujudkan Desa Maju Jaya yang Berdikari dan Digital.",
    mission:
      "1. Optimalisasi pelayanan publik digital.\n2. Pembangunan infrastruktur merata.\n3. Pemberdayaan UMKM lokal.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    votes: 0,
  },
  {
    number: 2,
    name: "Citra & Deni",
    vision: "Desa Maju Jaya Hijau dan Sejahtera Berbasis Komunitas.",
    mission:
      "1. Program pengolahan sampah terintegrasi.\n2. Beasiswa pendidikan untuk warga kurang mampu.\n3. revitalisasi pasar desa.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Citra",
    votes: 0,
  },
];

async function seedDatabase() {
  console.log("Memulai seeding database E-Voting Desa Maju Jaya...");

  try {
    // Reset users
    const usersRef = ref(db, "users");
    await set(usersRef, null);

    // Seed users tanpa field id
    for (const user of users) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password,
      );
      const userId = userCredential.user.uid;

      const userRef = ref(db, `users/${userId}`);
      await set(userRef, {
        ...user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        hasVoted: false, // Contoh field tambahan
      });

      console.log(`User seeded: ${user.fullName}`);
    }

    // Reset candidates
    const candidatesRef = ref(db, "candidates");
    await set(candidatesRef, null);

    // Seed candidates
    for (const candidate of candidates) {
      const newCandidateRef = push(candidatesRef);
      await set(newCandidateRef, {
        ...candidate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      console.log(`Candidate seeded: ${candidate.name}`);
    }

    console.log("Seeding selesai dengan sukses!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding gagal:", error.message);
    process.exit(1);
  }
}

async function deleteAllUsers() {
  try {
    console.log(
      "Memulai penghapusan semua pengguna Firebase Authentication...",
    );

    // Mendapatkan daftar pengguna pertama kali
    let listUsersResult = await adminAuth.listUsers(1000);

    // Menghapus pengguna satu per satu
    let deletedCount = 0;
    while (listUsersResult.users.length > 0) {
      const userList = listUsersResult.users;
      for (const user of userList) {
        try {
          await adminAuth.deleteUser(user.uid);
          deletedCount++;
          console.log(`Pengguna dengan UID ${user.uid} dihapus.`);
        } catch (error) {
          console.error(
            `Gagal menghapus pengguna dengan UID ${user.uid}:`,
            error,
          );
        }
      }

      // Mendapatkan batch berikutnya dari pengguna
      if (listUsersResult.pageToken) {
        listUsersResult = await adminAuth.listUsers(
          1000,
          listUsersResult.pageToken,
        );
      } else {
        break;
      }
    }

    console.log(`Total pengguna yang dihapus: ${deletedCount}`);
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus pengguna:", error);
  }
}

async function runSeeding() {
  await deleteAllUsers();
  await seedDatabase();
}

runSeeding();
