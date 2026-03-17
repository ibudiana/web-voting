import "./style.css";
import Alpine from "alpinejs";
import { DashboardPage } from "./pages/dashboard.js";
import { UsersPage } from "./pages/users.js";
import { CandidatesPage } from "./pages/candidates.js";
import { LoginPage } from "./pages/login.js";
import { RegisterPage } from "./pages/register.js";

window.Alpine = Alpine;

// Cookie Helpers
const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name) => {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
};

document.addEventListener("alpine:init", () => {
  Alpine.data("app", () => ({
    apiUrl: import.meta.env.VITE_BACKEND_URL,
    currentPage: "register", // 'login', 'register', 'dashboard', 'users', 'candidates'
    theme: "light",
    isSidebarOpen: false,

    // Data State
    users: [],
    candidates: [],
    loading: false,
    hasVoted: false,

    // Modal & Form State
    showModal: false,
    showDeleteModal: false,
    userToDelete: null,
    candidateToDelete: null,
    isEdit: false,
    modalType: "user", // 'user' or 'candidate'

    loginData: {
      email: "",
      password: "",
    },

    regData: {
      email: "",
      nik: "",
      fullName: "",
      username: "",
      password: "",
      confirmPassword: null,
    },

    formData: {
      id: "",
      username: "",
      email: "",
      fullName: "",
      nik: "",
      role: "user",
      alamat: "",
    },
    candidateFormData: {
      id: "",
      number: "",
      name: "",
      vision: "",
      mission: "",
      image: "",
    },
    errors: {},
    toasts: [],

    showToast(message, type = "success") {
      const id = Date.now();
      this.toasts.push({ id, message, type });
      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== id);
      }, 3000);
    },

    async init() {
      // Theme initialization
      const savedTheme = getCookie("theme");
      if (savedTheme) {
        this.theme = savedTheme;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        this.theme = "dark";
      }

      this.applyTheme();

      const token = getCookie("token");

      if (token) {
        try {
          const res = await fetch(`${this.apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const result = await res.json();

          if (result.success) {
            this.user = result.data;
            this.hasVoted = result.data.hasVoted;
            this.currentPage = "dashboard";
            // load data
            if (this.user.role === "admin") {
              await Promise.all([this.fetchUsers(), this.fetchCandidates()]);
            } else {
              await Promise.all([this.fetchUsers(), this.fetchCandidates()]);
            }
          } else {
            console.warn("Token invalid:", result.message);
            this.currentPage = "login";
          }
        } catch (err) {
          console.error("Fetch /auth/me failed:", err);
          this.currentPage = "login";
        }
      } else {
        this.currentPage = "register";
      }

      this.renderPage();

      // Listen for internal navigation
      window.addEventListener("navigate", (e) => {
        this.currentPage = e.detail;
        this.renderPage();
      });
    },

    toggleTheme() {
      this.theme = this.theme === "light" ? "dark" : "light";
      setCookie("theme", this.theme);
      this.applyTheme();
    },

    applyTheme() {
      if (this.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },

    renderPage() {
      const appRoot = document.getElementById("app");
      if (!appRoot) return;

      if (this.currentPage === "login") {
        appRoot.innerHTML = LoginPage;
      } else if (this.currentPage === "register") {
        appRoot.innerHTML = RegisterPage;
      } else if (this.currentPage === "users") {
        appRoot.innerHTML = UsersPage;
      } else if (this.currentPage === "candidates") {
        appRoot.innerHTML = CandidatesPage;
      } else {
        appRoot.innerHTML = DashboardPage;
      }
      this.isSidebarOpen = false;
    },

    validateLogin() {
      this.errors = {};

      // Validasi email
      if (!this.loginData.email) {
        this.errors.email = "Email wajib diisi";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.loginData.email)) {
        this.errors.email = "Format email tidak valid";
      }

      // Validasi password
      if (!this.loginData.password) {
        this.errors.password = "Password wajib diisi";
      }

      return Object.keys(this.errors).length === 0;
    },

    async handleLogin() {
      if (!this.validateLogin()) {
        this.showToast("Periksa kembali data login", "warning");
        return;
      }

      try {
        const response = await fetch(`${this.apiUrl}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.loginData),
        });

        const result = await response.json();

        if (result.success) {
          // Simpan token ke cookie jika API mengirimkan token
          const token = result.data?.token;
          if (token) setCookie("token", token);

          const me = await fetch(`${this.apiUrl}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const meResult = await me.json();

          if (meResult.success) {
            this.user = meResult.data;
            this.hasVoted = meResult.data.hasVoted;
          }

          this.showToast("Login Berhasil! Selamat datang.");
          this.currentPage = "dashboard";
          this.renderPage();
          this.fetchUsers();
          this.fetchCandidates();
        } else {
          this.showToast(
            result.message || "Email atau Password salah",
            "error",
          );
        }
      } catch (err) {
        this.showToast("Gagal terhubung ke server", "error");
      }
    },

    async logout() {
      try {
        const token = getCookie("token");

        await fetch(`${this.apiUrl}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // hapus token
        deleteCookie("token");

        this.showToast("Logout berhasil", "success");

        this.currentPage = "login";
        this.renderPage();
      } catch (err) {
        this.showToast("Gagal logout", "error");
      }
    },

    validateRegister() {
      this.errors = {};

      // NIK: wajib 16 digit angka
      if (!this.regData.nik || !/^\d{16}$/.test(this.regData.nik)) {
        this.errors.nik = "NIK harus 16 digit";
      }

      // Nama lengkap
      if (!this.regData.fullName) {
        this.errors.fullName = "Nama lengkap wajib diisi";
      }

      // Email
      if (
        !this.regData.email ||
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.regData.email)
      ) {
        this.errors.email = "Email tidak valid";
      }

      // Username
      if (!this.regData.username) {
        this.errors.username = "Username wajib diisi";
      }

      // Password
      if (!this.regData.password || this.regData.password.length < 6) {
        this.errors.password = "Password minimal 6 karakter";
      }

      // Konfirmasi password
      if (this.regData.confirmPassword !== this.regData.password) {
        this.errors.confirmPassword = "Konfirmasi password tidak sama";
      }

      return Object.keys(this.errors).length === 0;
    },

    async handleRegister() {
      if (!this.validateRegister()) {
        this.showToast("Periksa kembali data form", "error");
        return;
      }

      try {
        const response = await fetch(`${this.apiUrl}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.regData),
        });

        const result = await response.json();

        if (result.success) {
          this.showToast("Pendaftaran berhasil! Silahkan login.");
          this.currentPage = "login";
          this.renderPage();
        } else {
          this.showToast(result.message || "Gagal mendaftar", "error");
        }
      } catch (err) {
        this.showToast("Gagal mendaftar", "error");
      }
    },

    async logout() {
      try {
        await fetch(`${this.apiUrl}/auth/logout`, {
          method: "POST",
        });
      } catch (err) {
        console.error("Server logout failed, cleaning client side anyway.");
      } finally {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        this.currentPage = "login";
        this.showToast("Berhasil keluar dari sistem");
        this.renderPage();
      }
    },

    // Fetch Data
    async fetchUsers() {
      try {
        const response = await fetch(`${this.apiUrl}/users`);
        const result = await response.json();
        if (result.success) this.users = result.data;
      } catch (err) {
        console.error("Fetch users error:", err);
      }
    },

    async fetchCandidates() {
      this.loading = true;
      try {
        const response = await fetch(`${this.apiUrl}/candidates`);
        const result = await response.json();
        if (result.success) this.candidates = result.data;
      } catch (err) {
        console.error("Fetch candidates error:", err);
      } finally {
        this.loading = false;
      }
    },

    // Statistik jumlah user & candidate
    computedUsersCount() {
      return this.users?.length || 0; // hanya untuk admin
    },

    computedCandidatesCount() {
      return this.candidates?.length || 0; // bisa untuk semua user
    },

    // User Management
    validateUser() {
      this.errors = {};
      if (!this.formData.username)
        this.errors.username = "Username wajib diisi";
      if (!this.formData.fullName)
        this.errors.fullName = "Nama lengkap wajib diisi";
      if (!this.formData.email || !/^\S+@\S+\.\S+$/.test(this.formData.email))
        this.errors.email = "Format email tidak valid";
      if (!this.formData.nik || !/^\d{16}$/.test(this.formData.nik))
        this.errors.nik = "NIK harus 16 digit";
      if (!this.formData.alamat) this.errors.alamat = "Alamat wajib diisi";
      return Object.keys(this.errors).length === 0;
    },

    openAddModal() {
      this.modalType = "user";
      this.isEdit = false;
      this.errors = {};
      this.formData = {
        id: "",
        username: "",
        email: "",
        fullName: "",
        nik: "",
        role: "user",
        alamat: "",
      };
      this.showModal = true;
    },

    openEditModal(user) {
      this.modalType = "user";
      this.isEdit = true;
      this.errors = {};
      this.formData = { ...user };
      this.showModal = true;
    },

    async saveUser() {
      if (!this.validateUser()) return;
      const url = this.isEdit
        ? `${this.apiUrl}/users/${this.formData.id}`
        : `${this.apiUrl}/users`;
      const method = this.isEdit ? "PUT" : "POST";
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.formData),
        });
        const result = await response.json();
        if (result.success) {
          await this.fetchUsers();
          this.showModal = false;
          this.showToast(
            this.isEdit
              ? "Data user berhasil diperbarui"
              : "User baru berhasil ditambahkan",
          );
        }
      } catch (err) {
        this.showToast("Gagal menyimpan data", "error");
      }
    },

    confirmDelete(user) {
      this.modalType = "user";
      this.userToDelete = user;
      this.showDeleteModal = true;
    },

    // Candidate Management
    validateCandidate() {
      this.errors = {};
      if (!this.candidateFormData.number)
        this.errors.number = "Nomor urut wajib diisi";
      if (!this.candidateFormData.name)
        this.errors.name = "Nama paslon wajib diisi";
      if (!this.candidateFormData.vision)
        this.errors.vision = "Visi wajib diisi";
      return Object.keys(this.errors).length === 0;
    },

    openAddCandidateModal() {
      this.modalType = "candidate";
      this.isEdit = false;
      this.errors = {};
      this.candidateFormData = {
        id: "",
        number: "",
        name: "",
        vision: "",
        mission: "",
        image: "",
      };
      this.showModal = true;
    },

    openEditCandidateModal(candidate) {
      this.modalType = "candidate";
      this.isEdit = true;
      this.errors = {};
      this.candidateFormData = { ...candidate };
      this.showModal = true;
    },

    async saveCandidate() {
      if (!this.validateCandidate()) return;
      const url = this.isEdit
        ? `${this.apiUrl}/candidates/${this.candidateFormData.id}`
        : `${this.apiUrl}/candidates`;
      const method = this.isEdit ? "PUT" : "POST";
      try {
        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.candidateFormData),
        });
        const result = await response.json();
        if (result.success) {
          await this.fetchCandidates();
          this.showModal = false;
          this.showToast(
            this.isEdit ? "Data paslon diperbarui" : "Paslon baru ditambahkan",
          );
        }
      } catch (err) {
        this.showToast("Gagal menyimpan data", "error");
      }
    },

    confirmDeleteCandidate(candidate) {
      this.modalType = "candidate";
      this.candidateToDelete = candidate;
      this.showDeleteModal = true;
    },

    async executeDelete() {
      const isUser = this.modalType === "user";
      const id = isUser ? this.userToDelete.id : this.candidateToDelete.id;
      const endpoint = isUser ? "users" : "candidates";

      try {
        const response = await fetch(`${this.apiUrl}/${endpoint}/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.success) {
          isUser ? await this.fetchUsers() : await this.fetchCandidates();
          this.showDeleteModal = false;
          this.showToast("Data berhasil dihapus");
        }
      } catch (err) {
        this.showToast("Gagal menghapus data", "error");
      }
    },

    async castVote(candidateId) {
      if (this.hasVoted) {
        this.showToast("Anda sudah memberikan suara!", "warning");
        return;
      }

      try {
        const response = await fetch(
          `${this.apiUrl}/candidates/${candidateId}/vote`,
          { method: "POST" },
        );
        const result = await response.json();
        if (result.success) {
          this.hasVoted = true; // tandai sudah vote
          //   Update user data untuk menandai sudah vote
          const token = getCookie("token");
          try {
            await fetch(`${this.apiUrl}/auth/vote`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}` },
              body: JSON.stringify(this.hasVoted),
            });
          } catch (err) {
            console.error("Failed to mark user as voted:", err);
          }

          await this.fetchCandidates();
          this.showToast("Suara Anda berhasil dikirim!");
        } else {
          this.showToast(result.message || "Gagal mengirim suara", "error");
        }
      } catch (err) {
        this.showToast("Gagal mengirim suara", "error");
      }
    },
  }));
});

Alpine.start();
