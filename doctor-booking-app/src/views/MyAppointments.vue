<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">My Appointments</h1>
    <div v-if="appointments.length === 0" class="alert alert-info text-center">
      You have no upcoming appointments. Book one now!
    </div>
    <div v-else class="row">
      <div class="col-md-6 col-lg-4 mb-4" v-for="appointment in appointments" :key="appointment.id">
        <div class="card appointment-card shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center mb-3">
              <img :src="appointment.doctorImage || 'https://via.placeholder.com/50'" class="doctor-thumbnail rounded-circle me-3" alt="Doctor Thumbnail">
              <div>
                <h5 class="card-title mb-0">Dr. {{ appointment.doctorName }}</h5>
                <p class="card-text text-muted mb-0">{{ appointment.doctorSpecialty }}</p>
              </div>
            </div>
            <ul class="list-group list-group-flush mb-3">
              <li class="list-group-item">
                <strong>Patient:</strong> {{ appointment.patientName }}
              </li>
              <li class="list-group-item">
                <strong>Date:</strong> {{ appointment.date }}
              </li>
              <li class="list-group-item">
                <strong>Time:</strong> {{ appointment.time }}
              </li>
              <li class="list-group-item">
                <strong>Status:</strong> 
                <span :class="{'text-success': appointment.status === 'Confirmed', 'text-danger': appointment.status === 'Cancelled'}">
                  {{ appointment.status }}
                </span>
              </li>
            </ul>
            <button
              v-if="appointment.status === 'Confirmed'"
              @click="cancelAppointment(appointment.id)"
              class="btn btn-danger w-100"
            >
              Cancel Appointment
            </button>
            <button
              v-else-if="appointment.status === 'Cancelled'"
              class="btn btn-secondary w-100"
              disabled
            >
              Cancelled
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAppointments',
  data() {
    return {
      appointments: [],
    };
  },
  created() {
    this.loadAppointments();
  },
  methods: {
    loadAppointments() {
      // Get appointments from Local Storage
      const savedAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
      this.appointments = savedAppointments;
    },
    cancelAppointment(id) {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        // Find the appointment and update its status
        const appointmentIndex = this.appointments.findIndex(app => app.id === id);
        if (appointmentIndex !== -1) {
          this.appointments[appointmentIndex].status = 'Cancelled';

          // Save updated appointments back to Local Storage
          localStorage.setItem('myAppointments', JSON.stringify(this.appointments));
          alert('Appointment cancelled successfully!');
        }
      }
    },
  },
};
</script>

<style scoped>
.appointment-card {
  border-radius: 10px;
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease-in-out;
}
.appointment-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
.doctor-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid #007bff;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-color: #e9ecef; /* Lighter border for list items */
}
.list-group-item:first-child {
  border-top-width: 0;
}
.list-group-flush > .list-group-item {
    border-right-width: 0;
    border-left-width: 0;
    border-radius: 0;
}

.text-success {
    color: #28a745 !important;
}
.text-danger {
    color: #dc3545 !important;
}
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
}

/* Dark Mode Specific Styles */
.dark-mode .appointment-card {
  background-color: var(--card-background) !important;
  color: var(--text-color) !important;
  border-color: #333 !important;
}
.dark-mode .list-group-item {
  background-color: var(--card-background) !important;
  color: var(--text-color) !important;
  border-color: #444 !important;
}
</style>