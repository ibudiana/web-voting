export const RegisterPage = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden">
    
    <div class="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>

    <div class="w-full max-w-lg relative z-10">

        <div class="text-center mb-10">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white shadow-xl mb-6">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            </div>

            <h1 class="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
                E-VOTING
            </h1>

            <p class="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-[0.2em] uppercase mt-1">
                Desa Maju Jaya
            </p>
        </div>

        <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-4xl p-8 md:p-10 shadow-2xl">

            <div class="mb-8">
                <h2 class="text-2xl font-black text-slate-800 dark:text-white">
                    Daftar Akun Warga
                </h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Lengkapi data diri untuk berpartisipasi dalam pemilihan.
                </p>
            </div>

            <form @submit.prevent="handleRegister" class="grid grid-cols-1 md:grid-cols-2 gap-5">

                <!-- NIK -->
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        NIK (16 Digit)
                    </label>

                    <input
                        type="text"
                        x-model="regData.nik"
                        placeholder="3201..."
                        :class="errors.nik ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white transition"
                    >

                    <p x-show="errors.nik" x-text="errors.nik" class="text-red-500 text-xs mt-1"></p>
                </div>

                <!-- Nama -->
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Nama Lengkap
                    </label>

                    <input
                        type="text"
                        x-model="regData.fullName"
                        placeholder="Nama sesuai KTP"
                        :class="errors.fullName ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white transition"
                    >

                    <p x-show="errors.fullName" x-text="errors.fullName" class="text-red-500 text-xs mt-1"></p>
                </div>

                 <!-- Email -->
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Email
                    </label>

                    <input
                        type="text"
                        x-model="regData.email"
                        placeholder="user123@example.com"
                        :class="errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white transition"
                    >

                    <p x-show="errors.email" x-text="errors.email" class="text-red-500 text-xs mt-1"></p>
                </div>

                <!-- Username -->
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Username
                    </label>

                    <input
                        type="text"
                        x-model="regData.username"
                        placeholder="user123"
                        :class="errors.username ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white transition"
                    >

                    <p x-show="errors.username" x-text="errors.username" class="text-red-500 text-xs mt-1"></p>
                </div>

                <!-- Password -->
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Password
                    </label>

                    <input
                        type="password"
                        x-model="regData.password"
                        placeholder="••••••••"
                        :class="errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white transition"
                    >

                    <p x-show="errors.password" x-text="errors.password" class="text-red-500 text-xs mt-1"></p>
                </div>

                <!-- Confirm Password -->
                <div class="md:col-span-2">
                    <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Konfirmasi Password
                    </label>

                    <input
                        type="password"
                        x-model="regData.confirmPassword"
                        placeholder="••••••••"
                        :class="errors.confirmPassword ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-3.5 text-slate-800 dark:text-white transition"
                    >

                    <p x-show="errors.confirmPassword" x-text="errors.confirmPassword" class="text-red-500 text-xs mt-1"></p>
                </div>

                <!-- Submit -->
                <button
                    type="submit"
                    class="md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] mt-4"
                >
                    Daftar Sekarang
                </button>

            </form>

            <p class="mt-8 text-center text-sm text-slate-500 font-medium">
                Sudah punya akun?
                <a
                    href="#"
                    @click.prevent="currentPage = 'login'; renderPage()"
                    class="text-indigo-600 font-bold hover:underline"
                >
                    Masuk di sini
                </a>
            </p>

        </div>
    </div>
</div>
`;
