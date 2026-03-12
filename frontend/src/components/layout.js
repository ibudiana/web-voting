export const Sidebar = `
<!-- Mobile Overlay -->
<div x-show="isSidebarOpen" 
     x-transition:enter="transition ease-out duration-300"
     x-transition:enter-start="opacity-0"
     x-transition:enter-end="opacity-100"
     x-transition:leave="transition ease-in duration-200"
     x-transition:leave-start="opacity-100"
     x-transition:leave-end="opacity-0"
     @click="isSidebarOpen = false"
     class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"></div>

<aside :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
       class="w-72 glass-sidebar fixed h-full z-50 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none">
    <div class="p-6 h-full flex flex-col">
        <div class="flex items-center justify-between mb-10">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span class="font-bold text-xl tracking-tight italic text-indigo-800 dark:text-indigo-400">E-VOTING <br><span class="text-xs text-slate-400 not-italic">DESA MAJU JAYA</span></span>
            </div>
            <button @click="isSidebarOpen = false" class="md:hidden p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>

        <nav class="space-y-2 flex-1" x-data>
            <!-- Dashboard: Semua user bisa akses -->
            <button 
                @click="$dispatch('navigate', 'dashboard')" 
                :class="currentPage === 'dashboard' ? 'active-nav' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Beranda
            </button>

            <!-- Manajemen Warga: Hanya admin -->
            <button 
                x-show="user?.role === 'admin'" 
                @click="$dispatch('navigate', 'users')" 
                :class="currentPage === 'users' ? 'active-nav' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Manajemen Warga
            </button>

            <!-- Manajemen Paslon: Hanya admin -->
            <button 
                x-show="user?.role === 'admin'" 
                @click="$dispatch('navigate', 'candidates')" 
                :class="currentPage === 'candidates' ? 'active-nav' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Manajemen Paslon
            </button>
        </nav>

        <div class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <div class="bg-indigo-50 dark:bg-indigo-500/10 p-4 rounded-2xl">
                <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-1">Status Keamanan</p>
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span class="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Terenskripsi End-to-End</span>
                </div>
            </div>
        </div>
    </div>
</aside>
`;

export const Header = (title, subtitle, actions = "") => `
<header class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
    <div class="flex items-center gap-4">
        <button @click="toggleSidebar" class="md:hidden p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 shadow-sm active:scale-95 transition-all">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div>
            <h1 class="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight">${title}</h1>
            <p class="text-slate-500 dark:text-slate-400 text-sm font-medium tracking-wide">${subtitle}</p>
        </div>
    </div>
    
    <div class="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
        <div class="flex items-center gap-3">
            ${actions}
        </div>

        <div class="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

        <div class="flex items-center gap-3">
            <!-- Theme Toggle -->
            <button @click="toggleTheme" class="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95 group">
                <template x-if="theme === 'light'">
                    <svg class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                </template>
                <template x-if="theme === 'dark'">
                    <svg class="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 16.243l.707.707M7.757 7.757l.707.707M7 12a5 5 0 1110 0 5 5 0 01-10 0z" /></svg>
                </template>
            </button>

            <div class="flex items-center gap-3 pl-1">
            <div class="text-right hidden lg:block">
                <p class="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1"
                x-text="user?.fullName || 'Guest'"></p>

                <p class="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-tighter"
                x-text="user?.role || 'User'"></p>
            </div>
                <div class="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 ring-4 ring-white dark:ring-slate-900 transition-all">
                    <span x-text="user ? user.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : 'G'"></span>
                </div>
            </div>

             <button @click="logout" 
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 mt-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
            </button>
        </div>
    </div>
</header>
`;
