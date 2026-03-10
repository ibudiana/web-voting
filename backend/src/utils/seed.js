import { db } from '../config/firebase.js';
import { ref, set, push, remove } from 'firebase/database';

const users = [
  {
    username: 'admin_desa',
    email: 'admin@desamaju.id',
    role: 'admin',
    fullName: 'Budi Santoso',
    nik: '3201010101010001',
    alamat: 'Jl. Merdeka No. 1, Desa Maju Jaya',
    avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=4f46e5&color=fff'
  },
  {
    username: 'ahmad_subarjo',
    email: 'ahmad@gmail.com',
    role: 'user',
    fullName: 'Ahmad Subarjo',
    nik: '3201010101010002',
    alamat: 'RT 01/RW 02, Desa Maju Jaya',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Subarjo&background=10b981&color=fff'
  },
  {
    username: 'siti_aminah',
    email: 'siti@outlook.com',
    role: 'user',
    fullName: 'Siti Aminah',
    nik: '3201010101010003',
    alamat: 'RT 03/RW 02, Desa Maju Jaya',
    avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=f59e0b&color=fff'
  },
  {
    username: 'eko_prasetyo',
    email: 'eko.p@perusahaan.com',
    role: 'user',
    fullName: 'Eko Prasetyo',
    nik: '3201010101010004',
    alamat: 'Dusun Sukamandi, Desa Maju Jaya',
    avatar: 'https://ui-avatars.com/api/?name=Eko+Prasetyo&background=ec4899&color=fff'
  }
];

const candidates = [
  {
    number: 1,
    name: 'Andi & Budi',
    vision: 'Mewujudkan Desa Maju Jaya yang Berdikari dan Digital.',
    mission: '1. Optimalisasi pelayanan publik digital.\n2. Pembangunan infrastruktur merata.\n3. Pemberdayaan UMKM lokal.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
    votes: 0
  },
  {
    number: 2,
    name: 'Citra & Deni',
    vision: 'Desa Maju Jaya Hijau dan Sejahtera Berbasis Komunitas.',
    mission: '1. Program pengolahan sampah terintegrasi.\n2. Beasiswa pendidikan untuk warga kurang mampu.\n3. revitalisasi pasar desa.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Citra',
    votes: 0
  }
];

async function seedDatabase() {
  console.log('Memulai seeding database E-Voting Desa Maju Jaya...');
  
  try {
    // Reset users
    const usersRef = ref(db, 'users');
    await set(usersRef, null);

    // Seed users tanpa field id
    for (const user of users) {
      const newUserRef = push(usersRef);
      await set(newUserRef, {
        ...user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`User seeded: ${user.fullName}`);
    }

    // Reset candidates
    const candidatesRef = ref(db, 'candidates');
    await set(candidatesRef, null);

    // Seed candidates
    for (const candidate of candidates) {
      const newCandidateRef = push(candidatesRef);
      await set(newCandidateRef, {
        ...candidate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`Candidate seeded: ${candidate.name}`);
    }

    console.log('Seeding selesai dengan sukses!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding gagal:', error.message);
    process.exit(1);
  }
}

seedDatabase();