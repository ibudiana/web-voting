import { Sidebar, Header } from '../components/layout.js';

export const CandidatesPage = `
<div class="flex min-h-screen" x-cloak>
    ${Sidebar}
    <main class="flex-1 md:ml-72 p-4 md:p-8 transition-all duration-300 dark:bg-slate-950">
        ${Header('Manajemen Pasangan Calon', 'Kelola data kandidat E-Voting', `
            <button @click="openAddCandidateModal" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 active:scale-95 text-xs whitespace-nowrap">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Tambah Paslon
            </button>
        `)}

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <template x-for="candidate in candidates" :key="candidate.id">
                <div class="card group relative overflow-hidden flex flex-col md:flex-row gap-6">
                    <div class="w-full md:w-48 h-64 md:h-auto rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                        <img :src="candidate.image || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + candidate.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                    
                    <div class="flex-1 flex flex-col">
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <span class="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block" x-text="'No. Urut ' + candidate.number"></span>
                                <h3 class="text-2xl font-black text-slate-800 dark:text-white leading-tight" x-text="candidate.name"></h3>
                            </div>
                            <div class="flex gap-1">
                                <button @click="openEditCandidateModal(candidate)" class="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                                <button @click="confirmDeleteCandidate(candidate)" class="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                            </div>
                        </div>

                        <div class="space-y-4 flex-1">
                            <div>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Visi</p>
                                <p class="text-xs font-semibold text-slate-600 dark:text-slate-400 line-clamp-2" x-text="candidate.vision"></p>
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Misi</p>
                                <p class="text-xs font-medium text-slate-500 dark:text-slate-500 whitespace-pre-line line-clamp-3" x-text="candidate.mission"></p>
                            </div>
                        </div>

                        <div class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                </div>
                                <div>
                                    <p class="text-[10px] font-black text-slate-400 uppercase">Perolehan Suara</p>
                                    <p class="text-xl font-black text-slate-800 dark:text-white" x-text="candidate.votes || 0"></p>
                                </div>
                            </div>
                            <button @click="castVote(candidate.id)" class="bg-indigo-50 border border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-xs font-black hover:bg-indigo-600 hover:text-white transition-all">
                                Simulasikan Vote
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </div>

        <!-- Candidate Modal (Create/Edit) -->
        <div x-show="showModal && modalType === 'candidate'" 
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"
             x-transition:leave="transition ease-in duration-200"
             x-transition:leave-start="opacity-100"
             x-transition:leave-end="opacity-0"
             class="fixed inset-0 z-100 overflow-y-auto bg-slate-500/30 dark:bg-slate-950/80 backdrop-blur-sm">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div @click.away="showModal = false" 
                     class="bg-white dark:bg-slate-900 rounded-[40px] max-w-2xl w-full p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800">
                    
                    <div class="flex justify-between items-center mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <div>
                                <h2 class="text-2xl font-black text-slate-900 dark:text-white" x-text="isEdit ? 'Sunting Data Paslon' : 'Tambah Paslon Baru'"></h2>
                                <p class="text-slate-500 text-xs font-medium">Lengkapi informasi kandidat di bawah ini</p>
                            </div>
                        </div>
                        <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form @submit.prevent="saveCandidate" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nomor Urut</label>
                                <input type="number" x-model="candidateFormData.number" :class="errors.number ? 'error-input' : ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl fill-none outline-none transition-all font-bold dark:text-white text-slate-900">
                            </div>
                            <div class="md:col-span-2 space-y-2">
                                <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap Paslon</label>
                                <input type="text" x-model="candidateFormData.name" :class="errors.name ? 'error-input' : ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-bold dark:text-white text-slate-900">
                            </div>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Visi</label>
                            <input type="text" x-model="candidateFormData.vision" :class="errors.vision ? 'error-input' : ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-bold dark:text-white text-slate-900">
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Misi</label>
                            <textarea x-model="candidateFormData.mission" rows="4" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-bold dark:text-white text-slate-900"></textarea>
                        </div>

                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">URL Foto (Opsional)</label>
                            <input type="text" x-model="candidateFormData.image" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl outline-none font-bold dark:text-white text-slate-900">
                        </div>

                        <div class="pt-4 flex gap-4">
                            <button type="button" @click="showModal = false" class="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black py-4 rounded-2xl active:scale-95 transition-all">
                                Batalkan
                            </button>
                            <button type="submit" class="flex-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-200 dark:shadow-none active:scale-95 transition-all">
                                Simpan Paslon
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Global Delete Confirmation Modal -->
        <div x-show="showDeleteModal" 
             class="fixed inset-0 z-100 overflow-y-auto bg-slate-500/30 dark:bg-slate-950/80 backdrop-blur-sm">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div @click.away="showDeleteModal = false" 
                     class="bg-white dark:bg-slate-900 rounded-[40px] max-w-sm w-full p-10 shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
                    <div class="w-20 h-20 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </div>
                    <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">Hapus Data?</h3>
                    <p class="text-slate-500 text-sm mb-8">Tindakan ini tidak dapat dibatalkan.</p>
                    <div class="flex gap-4">
                        <button @click="showDeleteModal = false" class="flex-1 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 font-black">Batal</button>
                        <button @click="executeDelete" class="flex-2 px-4 py-3 rounded-2xl bg-red-500 text-white font-black">Hapus Selamanya</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
`;
