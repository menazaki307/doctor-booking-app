<template>
  <div>
    <div class="hero-section text-center text-white py-5">
      <div class="container">
        <h1>Find & Book Your Doctor Online</h1>
        <p class="lead">Easy way to book your appointment with preferred doctor. Save your time and forget about waiting.</p>
        <div class="search-box mx-auto mt-4">
          <input type="text" class="form-control" placeholder="Search doctors by name or specialty..." v-model="searchQuery">
          <button class="btn btn-success"><i class="fas fa-search"></i></button>
        </div>
      </div>
    </div>
    
    <div class="container my-5">
      <h2 class="text-center mb-4">How It Works</h2>
      <div class="row text-center">
        <div class="col-md-4">
          <div class="p-4 rounded-3 shadow-sm mb-4">
            <i class="fas fa-search fa-3x text-primary mb-3"></i>
            <h5>Find a Doctor</h5>
            <p class="text-muted">Search by specialty, location, or name to find the right doctor for you.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-3 shadow-sm mb-4">
            <i class="fas fa-calendar-check fa-3x text-primary mb-3"></i>
            <h5>Book Appointment</h5>
            <p class="text-muted">Choose a convenient time slot and book your appointment instantly online.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="p-4 rounded-3 shadow-sm mb-4">
            <i class="fas fa-stethoscope fa-3x text-primary mb-3"></i>
            <h5>Get a Consultation</h5>
            <p class="text-muted">Visit the doctor at the scheduled time and get the care you need.</p>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <div class="container my-5">
      <h2 class="text-center mb-4">Popular Specialties</h2>
      <div class="row justify-content-center">
        <div class="col-md-3 col-sm-6 mb-4" v-for="specialty in specialties" :key="specialty.name">
          <div class="specialty-card text-center p-4 rounded-3 shadow-sm">
            <i :class="specialty.icon" class="fa-3x text-primary mb-3"></i>
            <h5>{{ specialty.name }}</h5>
            <p class="text-muted">{{ specialty.description }}</p>
            <button @click="findDoctor(specialty.name)" class="btn btn-primary mt-2">Find Doctor</button>
          </div>
        </div>
      </div>
    </div>
    
    <hr>
    
    <div class="container my-5 py-5 text-center">
      <h2 class="mb-4">Our Achievements</h2>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="p-4 stat-card rounded-3 shadow-sm">
            <i class="fas fa-user-md fa-3x text-primary mb-3"></i>
            <h3 class="fw-bold">500+</h3>
            <p class="text-muted">Qualified Doctors</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="p-4 stat-card rounded-3 shadow-sm">
            <i class="fas fa-users fa-3x text-primary mb-3"></i>
            <h3 class="fw-bold">10K+</h3>
            <p class="text-muted">Happy Patients</p>
          </div>
        </div>
        <div class="col-md-4 mb-4">
          <div class="p-4 stat-card rounded-3 shadow-sm">
            <i class="fas fa-calendar-alt fa-3x text-primary mb-3"></i>
            <h3 class="fw-bold">25K+</h3>
            <p class="text-muted">Appointments Booked</p>
          </div>
        </div>
      </div>
    </div>
    
    <hr>
    
    <div class="container-fluid my-5 py-5 testimonial-section">
      <div class="container">
        <h2 class="text-center mb-5">What Our Patients Say</h2>
        <div class="row justify-content-center">
          <div class="col-md-4 mb-4" v-for="testimonial in testimonials" :key="testimonial.name">
            <div class="p-4 testimonial-card rounded-3 shadow-sm">
              <p class="fst-italic">"{{ testimonial.quote }}"</p>
              <div class="d-flex align-items-center mt-3">
                <img :src="testimonial.image" alt="Patient" class="rounded-circle me-3 testimonial-img">
                <div>
                  <h6 class="mb-0 fw-bold">{{ testimonial.name }}</h6>
                  <small class="text-muted">{{ testimonial.location }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>
    
    <div class="container my-5">
      <h2 class="text-center mb-5">Health News & Blog</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="post in blogPosts" :key="post.title">
          <div class="card h-100 shadow-sm blog-card">
            <img :src="post.image" class="card-img-top" :alt="post.title">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text text-muted">{{ post.date }}</p>
              <a href="#" class="btn btn-primary">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container-fluid py-5 bg-light">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h3 class="mb-3">Why Choose MedBook?</h3>
            <ul>
              <li><i class="fas fa-check-circle text-success me-2"></i> Find doctors by specialty and location easily.</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Book appointments 24/7 with a few clicks.</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Access to a network of qualified healthcare professionals.</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Get instant appointment confirmations and reminders.</li>
            </ul>
          </div>
          <div class="col-md-6 d-flex align-items-center justify-content-center">
            <img src="https://static.bookinghealth.com/assets/images/main-images/glass_static.webp">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      searchQuery: '',
      specialties: [
        { name: 'Cardiologist', description: 'Specializes in heart diseases.', icon: 'fas fa-heart' },
        { name: 'Dermatologist', description: 'Specializes in skin conditions.', icon: 'fas fa-hand-sparkles' },
        { name: 'Dentist', description: 'Specializes in dental care.', icon: 'fas fa-tooth' },
        { name: 'Pediatrician', description: 'Specializes in children\'s health.', icon: 'fas fa-child' },
        { name: 'Neurologist', description: 'Specializes in the nervous system.', icon: 'fas fa-brain' },
        { name: 'Orthopedist', description: 'Specializes in bones and joints.', icon: 'fas fa-bone' }
      ],
      // New Data for Testimonials Section
      testimonials: [
        { name: 'Mona El-Sayed', location: 'Cairo, Egypt', quote: 'The best experience I have had booking a doctor appointment online. Very easy and quick.', image: 'https://www.cairo24.com/Upload/libfiles/157/2/590.jpg' },
        { name: 'Karim Ahmed', location: 'Giza, Egypt', quote: 'I was able to find a dermatologist and book an appointment in less than 5 minutes. The website is fantastic!', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' },
        { name: 'Salma Ibrahim', location: 'Alexandria, Egypt', quote: 'MedBook helped me find a great doctor near my home. I highly recommend it to everyone.', image: 'https://images.pexels.com/photos/1082962/pexels-photo-1082962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
      ],
      // New Data for Blog Posts Section
      blogPosts: [
        { title: 'The Importance of a Healthy Diet', date: 'January 1, 2020', image: 'https://waznok.com/wp-content/uploads/2024/10/%D8%A3%D9%87%D9%85%D9%8A%D8%A9-%D8%A7%D8%AA%D8%A8%D8%A7%D8%B9-%D9%86%D8%B8%D8%A7%D9%85-%D8%BA%D8%B0%D8%A7%D8%A6%D9%8A-%D8%B5%D8%AD%D9%8A-%D9%84%D8%B2%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D9%88%D8%B2%D9%86-1024x585.jpg' },
        { title: 'Understanding Your Blood Pressure', date: 'December 30, 2022', image: 'https://img.saudigerman.com/wp-content/uploads/2023/06/09155921/Diastole-vs.-Systole-Understand-Your-Blood-Pressure-Readings.webp' },
        { title: 'Common Myths About Flu Vaccines', date: 'August 25, 2025', image: 'https://static.webteb.net/images/content/tbl_articles_article_26709_4333149a369-3491-453b-8611-efe16e74f418.jpg' }
      ]
    };
  },
  methods: {
    findDoctor(specialtyName) {
      this.$router.push({ path: '/doctors', query: { specialty: specialtyName } });
    }
  }
};
</script>

<style scoped>
.hero-section {
  background-image: linear-gradient(to right, #007bff, #48a6ff);
  background-size: cover;
  background-position: center;
  position: relative;
}
.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}
.hero-section * {
    position: relative;
    z-index: 1;
}

.search-box {
  max-width: 600px;
  display: flex;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  overflow: hidden;
}
.search-box .form-control {
  border: none;
  padding: 15px 25px;
  border-radius: 50px 0 0 50px;
  height: auto;
}
.search-box .btn {
  border-radius: 0 50px 50px 0;
  padding: 0 25px;
  font-size: 1.25rem;
  background-color: #28a745;
  border-color: #28a745;
}
.search-box .btn:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.specialty-card {
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
}
.specialty-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.stat-card {
  border-radius: 10px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  transition: transform 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-5px);
}

.testimonial-section {
  background-color: #e9ecef;
}
.testimonial-card {
  background-color: #ffffff;
  border-left: 5px solid #007bff;
}
.testimonial-img {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.blog-card .card-img-top {
  height: 200px;
  object-fit: cover;
}

/* Dark Mode Specific Styles */
.dark-mode .bg-light, .dark-mode .testimonial-section {
    background-color: var(--card-background) !important;
}
.dark-mode .specialty-card, .dark-mode .stat-card, .dark-mode .testimonial-card, .dark-mode .blog-card {
  background-color: var(--card-background) !important;
  color: var(--text-color) !important;
  border-color: #444 !important;
}
.dark-mode .specialty-card h5, .dark-mode .specialty-card p {
    color: var(--text-color) !important;
}
.dark-mode .shadow-sm {
    box-shadow: 0 0.125rem 0.25rem rgba(255, 255, 255, 0.1) !important;
}
.dark-mode ul li i {
    color: var(--primary-color) !important;
}
.dark-mode .testimonial-card {
  border-left-color: var(--primary-color) !important;
}
.dark-mode .testimonial-card p {
    color: var(--text-color) !important;
}
</style>