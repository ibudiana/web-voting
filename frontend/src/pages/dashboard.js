import { Sidebar, Header } from '../components/layout.js';

export const DashboardPage = `
<div class="flex min-h-screen">
    ${Sidebar}
    <main class="flex-1 md:ml-72 p-4 md:p-10 transition-all duration-300 dark:bg-slate-950">
        ${Header('Dashboard Utama', 'Ringkasan operasional E-Voting Desa Maju Jaya')}
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div class="card group">
                <div class="w-14 h-14 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-sm shadow-indigo-100 dark:shadow-none">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <p class="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-3">Total DPT</p>
                <h3 class="text-4xl font-black text-slate-800 dark:text-white flex items-baseline gap-2">
                    <span x-text="users.length"></span>
                    <span class="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">Warga</span>
                </h3>
            </div>
            <div class="card group">
                <div class="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-sm shadow-emerald-100 dark:shadow-none">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p class="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-3">Total Suara</p>
                <h3 class="text-4xl font-black text-slate-800 dark:text-white flex items-baseline gap-2">
                    <span x-text="candidates.reduce((a, b) => a + (b.votes || 0), 0)"></span>
                    <span class="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider">Masuk</span>
                </h3>
            </div>
            <div class="card group sm:col-span-2 lg:col-span-1">
                <div class="w-14 h-14 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-sm shadow-amber-100 dark:shadow-none">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p class="text-slate-400 dark:text-slate-500 text-[11px] font-black uppercase tracking-[0.2em] mb-3">Log Sistem</p>
                <h3 class="text-xl font-bold text-slate-700 dark:text-slate-200 mt-1">Status: Siap Memilih</h3>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div class="card p-10!">
                <div class="flex items-center justify-between mb-10">
                    <h3 class="text-xl font-black text-slate-800 dark:text-white">Hasil Quick Count</h3>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time</span>
                    </div>
                </div>

                <div class="space-y-8">
                    <template x-for="candidate in candidates" :key="candidate.id">
                        <div class="space-y-3">
                            <div class="flex justify-between items-end">
                                <div class="flex items-center gap-3">
                                    <span class="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center font-black text-xs" x-text="candidate.number"></span>
                                    <span class="font-bold text-slate-700 dark:text-slate-200" x-text="candidate.name"></span>
                                </div>
                                <span class="text-sm font-black text-slate-900 dark:text-white" x-text="candidate.votes + ' Suara'"></span>
                            </div>
                            <div class="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full bg-indigo-600 transition-all duration-1000" 
                                     :style="'width: ' + (candidates.reduce((a, b) => a + (b.votes || 0), 0) > 0 ? (candidate.votes / candidates.reduce((a, b) => a + (b.votes || 0), 0) * 100) : 0) + '%'"></div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="bg-indigo-600 dark:bg-indigo-900 rounded-[40px] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl transition-all duration-300">
                <div class="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                
                <div class="relative z-10">
                    <h2 class="text-3xl font-black mb-6 leading-tight tracking-tight">Kelola Data Paslon</h2>
                    <p class="text-indigo-100/90 mb-10 leading-relaxed font-medium">Tambah, ubah, atau hapus pasangan calon yang akan bertanding dalam pemilihan periode ini.</p>
                    <button @click="$dispatch('navigate', 'candidates')" class="inline-flex items-center gap-3 bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all shadow-xl active:scale-95">
                        Manajemen Paslon
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                </div>
            </div>
        </div>
    </main>
</div>
`;
