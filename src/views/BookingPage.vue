<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Book Your Appointment</h2>
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card p-4 shadow-sm">
          <div class="text-center mb-4">
            <img :src="doctor.image || 'https://via.placeholder.com/150'" class="img-fluid rounded-circle doctor-photo" :alt="doctor.name || 'Doctor Photo'">
            <h2 class="mt-3">{{ doctor.name || 'Loading Doctor...' }}</h2>
            <p class="text-muted">{{ doctor.specialty || 'N/A' }} - {{ doctor.location || 'N/A' }}</p>
            <p v-if="doctor.slots !== undefined" :class="{'text-success': doctor.slots > 0, 'text-danger': doctor.slots === 0}">
                <i class="fas fa-check-circle me-1"></i> Available: {{ doctor.slots }} slots
            </p>
          </div>
          <hr>
          <form @submit.prevent="confirmBooking">
            <h5 class="mb-3">Appointment Details</h5>
            <div class="mb-3">
              <label for="yourName" class="form-label">Your Name</label>
              <input type="text" class="form-control" id="yourName" v-model="appointment.patientName" placeholder="Enter your full name" required>
            </div>
            <div class="mb-3">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input type="tel" class="form-control" id="phoneNumber" v-model="appointment.phoneNumber" placeholder="Enter your phone number" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="appointment.email" placeholder="Enter your email">
            </div>
            <div class="mb-3">
              <label for="appointmentDate" class="form-label">Appointment Date</label>
              <div class="input-group">
                <input type="date" class="form-control" id="appointmentDate" v-model="appointment.date" required>
                <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
              </div>
            </div>
            <div class="mb-3">
              <label for="appointmentTime" class="form-label">Appointment Time</label>
              <div class="input-group">
                <input type="time" class="form-control" id="appointmentTime" v-model="appointment.time" required>
                <span class="input-group-text"><i class="fas fa-clock"></i></span>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100 mt-4">Confirm Booking</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingPage',
  props: ['doctorId'],
  data() {
    return {
      doctor: {},
      allDoctors: [ 
        { id: 1, name: 'Sarah Johnson', specialty: 'Cardiologist', location: 'New York', slots: 3, phone: '123-456-7890', image: 'https://png.pngtree.com/thumb_back/fh260/background/20231008/pngtree-d-rendering-secure-heart-concept-with-stethoscope-embracing-a-red-heart-image_13559658.png' },
        { id: 2, name: 'Michael Chen', specialty: 'Dermatologist', location: 'Banha', slots: 3, phone: '123-456-7890', image: 'https://s.alicdn.com/@sc04/kf/U97ddd15866f148bbb4606d82c5704039k/Minor-Operation-Instrument-Pack-Dermatology-Disposable-EO-Sterilized.jpg_300x300.jpg' },
        { id: 3, name: 'Emily Williams', specialty: 'Dentist', location: 'Banha', slots: 3, phone: '123-456-7890', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHNWKBmMI6YTBGuqTjEj2Z-B41carDqsivSw&s' },
        { id: 4, name: 'Ahmed Hassan', specialty: 'Pediatrician', location: 'Banha', slots: 5, phone: '123-456-7890', image: 'https://pic.pikbest.com/01/34/35/02z888piC4vb.jpg!bebw700' },
        { id: 5, name: 'Lena Petrova', specialty: 'Neurologist', location: 'Zagazig', slots: 2, phone: '123-456-7890', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8LYxKSIBn4qAeJzmBR0teIw5kuaEeAlhTg&s' },
        { id: 6, name: 'Alex Smith', specialty: 'Orthopedist', location: 'Cairo', slots: 4, phone: '123-456-7890', image: 'https://png.pngtree.com/thumb_back/fh260/background/20230524/pngtree-some-surgical-instruments-are-displayed-on-a-white-surface-image_2689856.jpg' },
        { id: 7, name: 'Omar Ali', specialty: 'Cardiologist', location: 'Banha', slots: 3, phone: '123-456-7891', image: 'https://png.pngtree.com/thumb_back/fh260/background/20231008/pngtree-d-rendering-secure-heart-concept-with-stethoscope-embracing-a-red-heart-image_13559658.png' },
        { id: 8, name: 'Nour Mohamed', specialty: 'Dermatologist', location: 'Cairo', slots: 4, phone: '123-456-7892', image: 'https://s.alicdn.com/@sc04/kf/U97ddd15866f148bbb4606d82c5704039k/Minor-Operation-Instrument-Pack-Dermatology-Disposable-EO-Sterilized.jpg_300x300.jpg' },
        { id: 9, name: 'Khaled Mansour', specialty: 'Dentist', location: 'Alexandria', slots: 2, phone: '123-456-7893', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHNWKBmMI6YTBGuqTjEj2Z-B41carDqsivSw&s' },
        { id: 10, name: 'Sara Ebrahim', specialty: 'Pediatrician', location: 'Banha', slots: 6, phone: '123-456-7894', image: 'https://pic.pikbest.com/01/34/35/02z888piC4vb.jpg!bebw700' },
        { id: 11, name: 'Youssef Gamal', specialty: 'Neurologist', location: 'Banha', slots: 3, phone: '123-456-7895', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8LYxKSIBn4qAeJzmBR0teIw5kuaEeAlhTg&s' },
        { id: 12, name: 'Fatma Zakaria', specialty: 'Orthopedist', location: 'Cairo', slots: 5, phone: '123-456-7896', image: 'https://png.pngtree.com/thumb_back/fh260/background/20230524/pngtree-some-surgical-instruments-are-displayed-on-a-white-surface-image_2689856.jpg' },
      ],
      appointment: {
        patientName: '',
        phoneNumber: '',
        email: '',
        date: '',
        time: '',
      },
    };
  },
  watch: {
    doctorId: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.doctor = this.allDoctors.find(doc => doc.id == newId) || {
            name: 'Doctor Not Found', specialty: 'N/A', location: 'N/A', image: 'https://via.placeholder.com/150', slots: 0
          };
        } else {
          this.doctor = {
            name: 'Select a Doctor', specialty: 'N/A', location: 'N/A', image: 'https://via.placeholder.com/150', slots: 0
          };
        }
      }
    }
  },
  methods: {
    confirmBooking() {
      if (!this.doctor.name || !this.appointment.patientName || !this.appointment.date || !this.appointment.time) {
        alert('Please fill in all required appointment details.');
        return;
      }

      const newAppointment = {
        id: Date.now(), // Generate a unique ID for the appointment
        doctorId: this.doctor.id,
        doctorName: this.doctor.name,
        doctorSpecialty: this.doctor.specialty,
        doctorImage: this.doctor.image,
        patientName: this.appointment.patientName,
        phoneNumber: this.appointment.phoneNumber,
        email: this.appointment.email,
        date: this.appointment.date,
        time: this.appointment.time,
        status: 'Confirmed' // Initial status
      };

      // Get existing appointments from Local Storage
      const existingAppointments = JSON.parse(localStorage.getItem('myAppointments')) || [];
      existingAppointments.push(newAppointment);

      // Save updated appointments back to Local Storage
      localStorage.setItem('myAppointments', JSON.stringify(existingAppointments));

      alert(`Appointment with Dr. ${this.doctor.name} on ${this.appointment.date} at ${this.appointment.time} has been booked!`);
      
      // Optionally, clear the form
      this.appointment = {
        patientName: '',
        phoneNumber: '',
        email: '',
        date: '',
        time: '',
      };

      // Redirect to My Appointments page
      this.$router.push('/my-appointments');
    }
  }
};
</script>

<style scoped>
.doctor-photo {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 4px solid #3498db;
  border-radius: 50%; /* Ensure it's a perfect circle */
}

/* Dark Mode Specific Styles */
.dark-mode .card {
  background-color: var(--card-background) !important;
  color: var(--text-color) !important;
}
.dark-mode .form-label {
    color: var(--text-color) !important;
}
.dark-mode .form-control {
    background-color: #333 !important;
    color: var(--text-color) !important;
    border-color: #555 !important;
}
.dark-mode .input-group-text {
    background-color: #444 !important;
    color: var(--text-color) !important;
    border-color: #555 !important;
}
</style>