export const LoginPage = `
<div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 relative overflow-hidden">
    <div class="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>

    <div class="w-full max-w-md relative z-10">

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
            
            <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-8">
                Masuk ke Panel Admin
            </h2>

            <form @submit.prevent="handleLogin" class="space-y-6">

                <!-- EMAIL -->
                <div>
                    <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Email
                    </label>

                    <input
                        type="email"
                        x-model="loginData.email"
                        placeholder="user@email.com"
                        :class="errors.email ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-slate-800 dark:text-white transition"
                    >

                    <p 
                        x-show="errors.email" 
                        x-text="errors.email"
                        class="text-red-500 text-xs mt-1">
                    </p>
                </div>

                <!-- PASSWORD -->
                <div>
                    <label class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                        Password
                    </label>

                    <input
                        type="password"
                        x-model="loginData.password"
                        placeholder="••••••••"
                        :class="errors.password ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'"
                        class="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-5 py-4 text-slate-800 dark:text-white transition"
                    >

                    <p 
                        x-show="errors.password" 
                        x-text="errors.password"
                        class="text-red-500 text-xs mt-1">
                    </p>
                </div>

                <!-- BUTTON -->
                <button
                    type="submit"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                    <span>Masuk Sekarang</span>

                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                </button>

            </form>

            <div class="mt-8 text-center">
                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Belum memiliki akun warga?
                    <button
                        @click="currentPage = 'register'; renderPage()"
                        class="text-indigo-600 dark:text-indigo-400 font-bold hover:underline ml-1"
                    >
                        Daftar Baru
                    </button>
                </p>
            </div>

            <div class="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                <p class="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    Sistem Keamanan Terenkripsi <br>
                    <span class="text-emerald-500">End-to-End Encryption Aktif</span>
                </p>
            </div>

        </div>

        <div class="mt-8 flex justify-center">
            <button
                @click="toggleTheme"
                class="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 transition-all shadow-sm active:scale-95"
            >

                <template x-if="theme === 'light'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    </svg>
                </template>

                <template x-if="theme === 'dark'">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3"/>
                    </svg>
                </template>

            </button>
        </div>

    </div>
</div>
`;
