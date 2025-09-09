<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Find Your Doctor</h1>
    <div class="filters mb-4 d-flex justify-content-center">
      <div class="input-group search-input-group me-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search doctors by name..."
          v-model="searchTerm"
          @keyup.enter="performSearch"
        />
        <button class="btn btn-outline-secondary" type="button" @click="performSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div class="dropdown me-3">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="specialtyDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedSpecialty === 'All Specialties' ? 'All Specialties' : selectedSpecialty }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="specialtyDropdown">
          <li><a class="dropdown-item" @click="selectSpecialty('All Specialties')">All Specialties</a></li>
          <li v-for="specialty in uniqueSpecialties" :key="specialty">
            <a class="dropdown-item" @click="selectSpecialty(specialty)">{{ specialty }}</a>
          </li>
        </ul>
      </div>

      <div class="dropdown">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="locationDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedLocation === 'All Locations' ? 'All Locations' : selectedLocation }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="locationDropdown">
          <li><a class="dropdown-item" @click="selectLocation('All Locations')">All Locations</a></li>
          <li v-for="location in uniqueLocations" :key="location">
            <a class="dropdown-item" @click="selectLocation(location)">{{ location }}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="doctor in paginatedDoctors" :key="doctor.id">
        <DoctorCard :doctor="doctor" />
      </div>
    </div>
    <div v-if="paginatedDoctors.length === 0" class="alert alert-warning text-center mt-5">
      No doctors found matching your criteria.
    </div>

    <nav aria-label="Page navigation" class="mt-5" v-if="totalPages > 1">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import DoctorCard from '@/components/DoctorCard.vue';

export default {
  name: 'Doctors',
  components: {
    DoctorCard,
  },
  data() {
    return {
      // قائمة الأطباء الـ 12 هنا
      doctors: [
        { id: 1, name: 'Sarah Johnson', specialty: 'Cardiologist', location: 'New York', slots: 3, phone: '123-456-7890', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxSZsI6EOAI5mi7-RoLW3CTLB-RyLmLKO5WA&s' },
        { id: 2, name: 'Michael Chen', specialty: 'Dermatologist', location: 'Banha', slots: 3, phone: '123-456-7890', image: 'https://i.pinimg.com/736x/f4/c9/ef/f4c9ef33d04a22050038e9e53eeb7d85.jpg' },
        { id: 3, name: 'Emily Williams', specialty: 'Dentist', location: 'Banha', slots: 3, phone: '123-456-7890', image: 'https://i.pinimg.com/originals/7c/45/94/7c4594f292a739ae1432a0fadd81149c.jpg' },
        { id: 4, name: 'Ahmed Hassan', specialty: 'Pediatrician', location: 'Banha', slots: 5, phone: '123-456-7890', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5keGS9H3EJ2iDJeBVMyyAbgiok7UXm5uYYA&s' },
        { id: 5, name: 'Lena Petrova', specialty: 'Neurologist', location: 'Zagazig', slots: 2, phone: '123-456-7890', image: 'https://images.unsplash.com/photo-1659353888906-adb3e0041693?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww' },
        { id: 6, name: 'Alex Smith', specialty: 'Orthopedist', location: 'Cairo', slots: 4, phone: '123-456-7890', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJtKdAsjxpzF6__MNY6Zmy-98Ltm_sMbyDFg&s' },
        { id: 7, name: 'Omar Ali', specialty: 'Cardiologist', location: 'Banha', slots: 3, phone: '123-456-7891', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzaMnHi6KNYytVgddmcukl8cZJi00Se17gyA&s' },
        { id: 8, name: 'Nour Mohamed', specialty: 'Dermatologist', location: 'Cairo', slots: 4, phone: '123-456-7892', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA1FSUP1X-aGmqTb4HSyb1eoLdikYli2OTVQ&s' },
        { id: 9, name: 'Khaled Mansour', specialty: 'Dentist', location: 'Alexandria', slots: 2, phone: '123-456-7893', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxGsmP00ze5jUFJVZsXTJQzVQpiW3Hx3BoNg&s' },
        { id: 10, name: 'Sara Ebrahim', specialty: 'Pediatrician', location: 'Banha', slots: 6, phone: '123-456-7894', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6PiAEfxrM0REe7Xvc9r7HeFSeFfXsJvzltg&s' },
        { id: 11, name: 'Youssef Gamal', specialty: 'Neurologist', location: 'Banha', slots: 3, phone: '123-456-7895', image: 'https://t3.ftcdn.net/jpg/01/97/67/00/360_F_197670014_6oxmH8IKdB5WPRTKrATgdw6xM4dkt6cp.jpg' },
        { id: 12, name: 'Fatma Zakaria', specialty: 'Orthopedist', location: 'Cairo', slots: 5, phone: '123-456-7896', image: 'https://plus.unsplash.com/premium_photo-1664475450083-5c9eef17a191?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwZG9jdG9yfGVufDB8fDB8fHww' },
      ],
      selectedSpecialty: 'All Specialties',
      selectedLocation: 'All Locations',
      searchTerm: '',
      currentPage: 1,
      doctorsPerPage: 6,
    };
  },
  computed: {
    uniqueSpecialties() {
      const specialties = this.doctors.map(doctor => doctor.specialty);
      return [...new Set(specialties)];
    },
    uniqueLocations() {
      const locations = this.doctors.map(doctor => doctor.location);
      return [...new Set(locations)];
    },
    filteredDoctors() {
      let currentDoctors = this.doctors;

      // Filter by specialty
      if (this.selectedSpecialty !== 'All Specialties') {
        currentDoctors = currentDoctors.filter(doctor =>
          doctor.specialty === this.selectedSpecialty
        );
      }

      // Filter by location
      if (this.selectedLocation !== 'All Locations') {
        currentDoctors = currentDoctors.filter(doctor =>
          doctor.location === this.selectedLocation
        );
      }

      // Filter by search term
      if (this.searchTerm) {
        const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
        currentDoctors = currentDoctors.filter(doctor =>
          doctor.name.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
      
      return currentDoctors;
    },
    totalPages() {
    
      return Math.ceil(this.filteredDoctors.length / this.doctorsPerPage);
    },
    paginatedDoctors() {
    
      const startIndex = (this.currentPage - 1) * this.doctorsPerPage;
      const endIndex = startIndex + this.doctorsPerPage;
      return this.filteredDoctors.slice(startIndex, endIndex);
    },
  },
  methods: {
    selectSpecialty(specialty) {
      this.selectedSpecialty = specialty;
      this.searchTerm = '';
      this.currentPage = 1;
    },
    selectLocation(location) {
      this.selectedLocation = location;
      this.searchTerm = '';
      this.currentPage = 1;
    },
    performSearch() {
      this.currentPage = 1;
      // The v-model and computed property handle most of the work.
      console.log('Search performed with term:', this.searchTerm);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    if (this.$route.query.specialty) {
      this.selectedSpecialty = this.$route.query.specialty;
    }
    if (this.$route.query.search) {
      this.searchTerm = this.$route.query.search;
    }
    // Set current page to 1 if coming from an external link or refreshed
    this.currentPage = 1; 
  },
  watch: {
    '$route.query.search'(newSearchTerm) {
      this.searchTerm = newSearchTerm || '';
      this.currentPage = 1; // Reset page on new search from URL
    },
    '$route.query.specialty'(newSpecialty) {
      this.selectedSpecialty = newSpecialty || 'All Specialties';
      this.currentPage = 1; // Reset page on new specialty from URL
    }
  }
};
</script>

<style scoped>

.filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}
.filters .dropdown-toggle {
  background-color: #f8f9fa;
  color: #34495e;
  border-color: #ced4da;
  font-weight: 500;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
}
.filters .dropdown-toggle:hover {
  background-color: #e2e6ea;
}
.filters .dropdown-menu {
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.filters .dropdown-item {
  cursor: pointer;
  padding: 0.75rem 1.25rem;
}
.filters .dropdown-item:hover {
  background-color: #f8f9fa;
  color: #007bff;
}
.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border-color: #ffeeba;
  font-size: 1.1rem;
  padding: 1.5rem;
  border-radius: 8px;
}
.search-input-group {
    max-width: 300px;
}

/* Pagination Styles */
.pagination .page-item .page-link {
  border-radius: 0.5rem;
  margin: 0 0.25rem;
  min-width: 40px;
  text-align: center;
  color: #007bff;
  border: 1px solid #dee2e6;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.pagination .page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}

.pagination .page-item .page-link:hover:not(.active) {
  background-color: #e9ecef;
  border-color: #dee2e6;
  color: #0056b3;
}

.pagination .page-item.disabled .page-link {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
  border-color: #dee2e6;
}
</style>