import { Sidebar, Header } from '../components/layout.js';

export const UsersPage = `
<div class="flex min-h-screen" x-cloak>
    ${Sidebar}
    <main class="flex-1 md:ml-72 p-4 md:p-8 transition-all duration-300 dark:bg-slate-950">
        ${Header('Daftar Pemilih Tetap', 'Kelola data warga untuk keperluan pemilihan', `
            <button @click="openAddModal" class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all flex items-center gap-2 active:scale-95 text-xs whitespace-nowrap">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Tambah Warga
            </button>
        `)}

        <div class="card dark:bg-slate-900 overflow-hidden p-0!">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead class="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                            <th class="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Warga</th>
                            <th class="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">NIK & Alamat</th>
                            <th class="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Status</th>
                            <th class="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                        <template x-if="loading">
                            <tr><td colspan="4" class="py-24 text-center">
                                <div class="flex flex-col items-center gap-4">
                                    <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                                    <p class="text-xs font-bold text-slate-400 animate-pulse">Memuat data warga...</p>
                                </div>
                            </td></tr>
                        </template>
                        <template x-show="!loading && users.length === 0">
                            <tr><td colspan="4" class="py-24 text-center">
                                <p class="text-slate-400 font-bold">Belum ada data warga terdaftar.</p>
                            </td></tr>
                        </template>
                        <template x-for="user in users" :key="user.id">
                            <tr class="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                                <td class="px-6 py-5">
                                    <div class="flex items-center gap-4">
                                        <div class="relative">
                                            <img :src="user.avatar || \`https://ui-avatars.com/api/?name=\${user.fullName}&background=4f46e5&color=fff\`" class="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 object-cover shadow-sm group-hover:scale-110 transition-transform duration-300">
                                            <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm" :class="user.role === 'admin' ? 'bg-indigo-500' : 'bg-emerald-500'"></div>
                                        </div>
                                        <div>
                                            <div class="font-bold text-slate-900 dark:text-white" x-text="user.fullName"></div>
                                            <div class="text-xs text-slate-500 font-medium" x-text="user.email"></div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-5 text-sm">
                                    <div class="font-bold text-slate-700 dark:text-slate-300 mb-1" x-text="user.nik"></div>
                                    <div class="text-[11px] text-slate-400 font-medium truncate max-w-[200px]" x-text="user.alamat || 'Alamat belum diatur'"></div>
                                </td>
                                <td class="px-6 py-5 text-sm">
                                    <span :class="user.role === 'admin' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'" class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider" x-text="user.role"></span>
                                </td>
                                <td class="px-6 py-5 text-right">
                                    <div class="flex justify-end gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                        <button @click="openEditModal(user)" class="p-2.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-xl transition-all">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                        </button>
                                        <button @click="confirmDelete(user)" class="p-2.5 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- User Modal (Create/Edit) -->
        <div x-show="showModal" 
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"
             x-transition:leave="transition ease-in duration-200"
             x-transition:leave-start="opacity-100"
             x-transition:leave-end="opacity-0"
             class="fixed inset-0 z-100 overflow-y-auto bg-slate-500/30 dark:bg-slate-950/80 backdrop-blur-sm">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div @click.away="showModal = false" 
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0 scale-95 translate-y-4"
                     x-transition:enter-end="opacity-100 scale-100 translate-y-0"
                     class="bg-white dark:bg-slate-900 rounded-[40px] max-w-xl w-full p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800 transition-all">
                    
                    <div class="flex justify-between items-center mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <div>
                                <h2 class="text-2xl font-black text-slate-900 dark:text-white" x-text="isEdit ? 'Sunting Data Warga' : 'Tambah Warga Baru'"></h2>
                                <p class="text-slate-500 text-xs font-medium">Lengkapi informasi warga di bawah ini</p>
                            </div>
                        </div>
                        <button @click="showModal = false" class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <form @submit.prevent="saveUser" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Username</label>
                                <input type="text" x-model="formData.username" :class="errors.username ? 'error-input' : ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 outline-none transition-all font-bold dark:text-white text-slate-900">
                                <span x-show="errors.username" class="text-[10px] text-red-500 font-bold ml-1" x-text="errors.username"></span>
                            </div>
                            <div class="space-y-2">
                                <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Hak Akses</label>
                                <select x-model="formData.role" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 outline-none transition-all font-bold dark:text-white text-slate-900 appearance-none">
                                    <option value="user">Warga (User)</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nama Lengkap Sesuai KTP</label>
                            <input type="text" x-model="formData.fullName" :class="errors.fullName ? 'error-input' : ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 outline-none transition-all font-bold dark:text-white text-slate-900">
                            <span x-show="errors.fullName" class="text-[10px] text-red-500 font-bold ml-1" x-text="errors.fullName"></span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Alamat Email</label>
                            <input type="email" x-model="formData.email" :class="errors.email ? 'error-input' : ''" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 outline-none transition-all font-bold dark:text-white text-slate-900">
                            <span x-show="errors.email" class="text-[10px] text-red-500 font-bold ml-1" x-text="errors.email"></span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Nomor Induk Kependudukan (NIK)</label>
                            <input type="text" x-model="formData.nik" :class="errors.nik ? 'error-input' : ''" placeholder="16 digit NIK" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 outline-none transition-all font-bold dark:text-white text-slate-900">
                            <span x-show="errors.nik" class="text-[10px] text-red-500 font-bold ml-1" x-text="errors.nik"></span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Alamat Domisili</label>
                            <textarea x-model="formData.alamat" :class="errors.alamat ? 'error-input' : ''" rows="3" class="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/20 outline-none transition-all font-bold dark:text-white text-slate-900"></textarea>
                            <span x-show="errors.alamat" class="text-[10px] text-red-500 font-bold ml-1" x-text="errors.alamat"></span>
                        </div>

                        <div class="pt-4 flex gap-4">
                            <button type="button" @click="showModal = false" class="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black py-4 rounded-2xl transition-all active:scale-95">
                                Batalkan
                            </button>
                            <button type="submit" class="flex-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-2xl shadow-indigo-200 dark:shadow-none transition-all active:scale-95">
                                Simpan Data
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div x-show="showDeleteModal" 
             x-transition:enter="transition ease-out duration-300"
             x-transition:enter-start="opacity-0"
             x-transition:enter-end="opacity-100"
             x-transition:leave="transition ease-in duration-200"
             x-transition:leave-start="opacity-100"
             x-transition:leave-end="opacity-0"
             class="fixed inset-0 z-100 overflow-y-auto bg-slate-500/30 dark:bg-slate-950/80 backdrop-blur-sm">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div @click.away="showDeleteModal = false" 
                     x-transition:enter="transition ease-out duration-300"
                     x-transition:enter-start="opacity-0 scale-95 translate-y-4"
                     x-transition:enter-end="opacity-100 scale-100 translate-y-0"
                     class="bg-white dark:bg-slate-900 rounded-[40px] max-w-sm w-full p-10 shadow-2xl border border-slate-100 dark:border-slate-800 transition-all text-center">
                    <div class="w-24 h-24 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </div>
                    <h3 class="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Warga?</h3>
                    <p class="text-slate-500 font-medium mb-10 leading-relaxed">Apakah Anda yakin ingin menghapus <span class="font-black text-slate-900 dark:text-white" x-text="userToDelete?.fullName"></span>?</p>
                    <div class="flex gap-4">
                        <button @click="showDeleteModal = false" class="flex-1 px-6 py-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black hover:bg-slate-200 dark:hover:bg-slate-750 transition-all">Batal</button>
                        <button @click="executeDelete" class="flex-1 px-6 py-5 rounded-2xl bg-red-500 text-white font-black shadow-2xl shadow-red-200 dark:shadow-none hover:bg-red-600 transition-all active:scale-95">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
`;
