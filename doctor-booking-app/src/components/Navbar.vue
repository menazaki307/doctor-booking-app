<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?_gl=1*1twu2xy*_ga*MjE0NjE1OTgxNi4xNzU3MjY5Nzcw*_ga_8JE65Q40S6*czE3NTcyNjk3NzAkbzEkZzEkdDE3NTcyNzA2NjAkajU4JGwwJGgw" alt="MedBook Logo" width="30" height="30" class="d-inline-block align-text-top me-2">
        MedBook
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/doctors">Doctors</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/my-appointments">My Appointments</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item d-flex align-items-center ms-lg-3">
            <button class="btn btn-link theme-toggle-btn" @click="toggleTheme">
              <i :class="['fas', currentTheme === 'light' ? 'fa-moon' : 'fa-sun']"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      currentTheme: 'light',
    };
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      localStorage.setItem('theme', this.currentTheme);
    },
  },
  created() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
};
</script>

<style scoped>
/* Navbar base styles (using CSS variables) */
.navbar {
  background-color: var(--navbar-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  padding: 0.75rem 1rem;
  transition: background-color 0.3s ease;
}

.navbar-brand {
  font-weight: bold;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.nav-link {
  color: var(--navbar-text);
  font-weight: 500;
  margin-right: 15px;
  transition: color 0.3s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--primary-color);
}

.theme-toggle-btn {
  color: var(--primary-color);
  font-size: 1.2rem;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
}

.theme-toggle-btn:focus {
  box-shadow: none;
}
</style>