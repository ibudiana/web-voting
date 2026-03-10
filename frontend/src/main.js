import './style.css'
import Alpine from 'alpinejs'
import { DashboardPage } from './pages/dashboard.js'
import { UsersPage } from './pages/users.js'
import { CandidatesPage } from './pages/candidates.js'

window.Alpine = Alpine

// Cookie Helpers
const setCookie = (name, value, days = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=');
        return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
}

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        currentPage: 'dashboard',
        theme: 'light',
        isSidebarOpen: false,
        
        // Data State
        users: [],
        candidates: [],
        loading: false,
        
        // Modal & Form State
        showModal: false,
        showDeleteModal: false,
        userToDelete: null,
        candidateToDelete: null,
        isEdit: false,
        modalType: 'user', // 'user' or 'candidate'
        
        formData: { id: '', username: '', email: '', fullName: '', nik: '', role: 'user', alamat: '' },
        candidateFormData: { id: '', number: '', name: '', vision: '', mission: '', image: '' },
        errors: {},
        toasts: [],

        showToast(message, type = 'success') {
            const id = Date.now();
            this.toasts.push({ id, message, type });
            setTimeout(() => {
                this.toasts = this.toasts.filter(t => t.id !== id);
            }, 3000);
        },

        async init() {
            // Theme initialization
            const savedTheme = getCookie('theme');
            if (savedTheme) {
                this.theme = savedTheme;
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.theme = 'dark';
            }
            this.applyTheme();

            this.renderPage();
            await this.fetchUsers();
            await this.fetchCandidates();
            
            // Listen for internal navigation
            window.addEventListener('navigate', (e) => {
                this.currentPage = e.detail;
                this.renderPage();
            });
        },

        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            setCookie('theme', this.theme);
            this.applyTheme();
        },

        applyTheme() {
            if (this.theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        },

        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },

        renderPage() {
            const appRoot = document.getElementById('app');
            if (!appRoot) return;
            
            if (this.currentPage === 'users') {
                appRoot.innerHTML = UsersPage;
            } else if (this.currentPage === 'candidates') {
                appRoot.innerHTML = CandidatesPage;
            } else {
                appRoot.innerHTML = DashboardPage;
            }
            this.isSidebarOpen = false; // Close sidebar on navigation on mobile
        },

        // Fetch Data
        async fetchUsers() {
            try {
                const response = await fetch('http://localhost:5001/api/users');
                const result = await response.json();
                if (result.success) this.users = result.data;
            } catch (err) {
                console.error('Fetch users error:', err);
            }
        },

        async fetchCandidates() {
            this.loading = true;
            try {
                const response = await fetch('http://localhost:5001/api/candidates');
                const result = await response.json();
                if (result.success) this.candidates = result.data;
            } catch (err) {
                console.error('Fetch candidates error:', err);
            } finally {
                this.loading = false;
            }
        },

        // User Management
        validateUser() {
            this.errors = {};
            if (!this.formData.username) this.errors.username = 'Username wajib diisi';
            if (!this.formData.fullName) this.errors.fullName = 'Nama lengkap wajib diisi';
            if (!this.formData.email || !/^\S+@\S+\.\S+$/.test(this.formData.email)) this.errors.email = 'Format email tidak valid';
            if (!this.formData.nik || !/^\d{16}$/.test(this.formData.nik)) this.errors.nik = 'NIK harus 16 digit';
            if (!this.formData.alamat) this.errors.alamat = 'Alamat wajib diisi';
            return Object.keys(this.errors).length === 0;
        },

        openAddModal() {
            this.modalType = 'user';
            this.isEdit = false;
            this.errors = {};
            this.formData = { id: '', username: '', email: '', fullName: '', nik: '', role: 'user', alamat: '' };
            this.showModal = true;
        },

        openEditModal(user) {
            this.modalType = 'user';
            this.isEdit = true;
            this.errors = {};
            this.formData = { ...user };
            this.showModal = true;
        },

        async saveUser() {
            if (!this.validateUser()) return;
            const url = this.isEdit ? `http://localhost:5001/api/users/${this.formData.id}` : 'http://localhost:5001/api/users';
            const method = this.isEdit ? 'PUT' : 'POST';
            try {
                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formData)
                });
                const result = await response.json();
                if (result.success) {
                    await this.fetchUsers();
                    this.showModal = false;
                    this.showToast(this.isEdit ? 'Data user berhasil diperbarui' : 'User baru berhasil ditambahkan');
                }
            } catch (err) {
                this.showToast('Gagal menyimpan data', 'error');
            }
        },

        confirmDelete(user) {
            this.modalType = 'user';
            this.userToDelete = user;
            this.showDeleteModal = true;
        },

        // Candidate Management
        validateCandidate() {
            this.errors = {};
            if (!this.candidateFormData.number) this.errors.number = 'Nomor urut wajib diisi';
            if (!this.candidateFormData.name) this.errors.name = 'Nama paslon wajib diisi';
            if (!this.candidateFormData.vision) this.errors.vision = 'Visi wajib diisi';
            return Object.keys(this.errors).length === 0;
        },

        openAddCandidateModal() {
            this.modalType = 'candidate';
            this.isEdit = false;
            this.errors = {};
            this.candidateFormData = { id: '', number: '', name: '', vision: '', mission: '', image: '' };
            this.showModal = true;
        },

        openEditCandidateModal(candidate) {
            this.modalType = 'candidate';
            this.isEdit = true;
            this.errors = {};
            this.candidateFormData = { ...candidate };
            this.showModal = true;
        },

        async saveCandidate() {
            if (!this.validateCandidate()) return;
            const url = this.isEdit ? `http://localhost:5001/api/candidates/${this.candidateFormData.id}` : 'http://localhost:5001/api/candidates';
            const method = this.isEdit ? 'PUT' : 'POST';
            try {
                const response = await fetch(url, {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.candidateFormData)
                });
                const result = await response.json();
                if (result.success) {
                    await this.fetchCandidates();
                    this.showModal = false;
                    this.showToast(this.isEdit ? 'Data paslon diperbarui' : 'Paslon baru ditambahkan');
                }
            } catch (err) {
                this.showToast('Gagal menyimpan data', 'error');
            }
        },

        confirmDeleteCandidate(candidate) {
            this.modalType = 'candidate';
            this.candidateToDelete = candidate;
            this.showDeleteModal = true;
        },

        async executeDelete() {
            const isUser = this.modalType === 'user';
            const id = isUser ? this.userToDelete.id : this.candidateToDelete.id;
            const endpoint = isUser ? 'users' : 'candidates';
            
            try {
                const response = await fetch(`http://localhost:5001/api/${endpoint}/${id}`, { method: 'DELETE' });
                const result = await response.json();
                if (result.success) {
                    isUser ? await this.fetchUsers() : await this.fetchCandidates();
                    this.showDeleteModal = false;
                    this.showToast('Data berhasil dihapus');
                }
            } catch (err) {
                this.showToast('Gagal menghapus data', 'error');
            }
        },

        async castVote(candidateId) {
            try {
                const response = await fetch(`http://localhost:5001/api/candidates/${candidateId}/vote`, { method: 'POST' });
                const result = await response.json();
                if (result.success) {
                    await this.fetchCandidates();
                    this.showToast('Suara Anda berhasil dikirim!');
                }
            } catch (err) {
                this.showToast('Gagal mengirim suara', 'error');
            }
        }
    }))
})

Alpine.start()

