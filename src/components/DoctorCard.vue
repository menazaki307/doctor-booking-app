<template>
  <div class="doctor-card card mb-4 shadow-sm">
    <img :src="doctor.image" class="card-img-top" :alt="doctor.name">
    <div class="card-body text-center">
      <h5 class="card-title">{{ doctor.name }}</h5>
      <p class="card-text text-muted">{{ doctor.specialty }}</p>
      <p class="card-text text-muted">
        <i class="fas fa-map-marker-alt me-1"></i> {{ doctor.location }}
      </p>
      <p :class="{'text-success': doctor.slots > 0, 'text-danger': doctor.slots === 0}">
        <i class="fas fa-check-circle me-1"></i> Available: {{ doctor.slots }} slots
      </p>
      <router-link
        :to="{ name: 'book-appointment', params: { doctorId: doctor.id } }"
        class="btn btn-primary"
        :class="{'disabled': doctor.slots === 0}"
        :aria-disabled="doctor.slots === 0 ? true : null"
      >
        Book Appointment
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorCard',
  props: {
    doctor: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>

.doctor-card {
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  border: 1px solid #e0e0e0;
}

.doctor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.doctor-card img {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #34495e;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-size: 1.1rem;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.dark-mode .doctor-card {
  background-color: var(--card-background) !important;
  color: var(--text-color) !important;
  border-color: #333 !important;
}
.dark-mode .card-title,
.dark-mode .card-text {
  color: var(--text-color) !important;
}
</style>