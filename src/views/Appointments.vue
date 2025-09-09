<template>
  <div class="appointments-page">
    <h1>Book Appointment</h1>

    <!-- Doctor Details -->
    <div v-if="selectedDoctor" class="doctor-info">
      <h2>Booking with {{ selectedDoctor }}</h2>
    </div>

    <!-- Booking Form -->
    <form @submit.prevent="confirmBooking" class="booking-form">
      <label>
        Your Name:
        <input type="text" v-model="formData.name" required />
      </label>

      <label>
        Mobile Number:
        <input type="tel" v-model="formData.mobile" required />
      </label>

      <label>
        Date:
        <input type="date" v-model="formData.date" required />
      </label>

      <label>
        Time:
        <input type="time" v-model="formData.time" required />
      </label>

      <button type="submit">Confirm Booking</button>
    </form>

    <!-- Confirmation Message -->
    <div v-if="confirmationMessage" class="confirmation">
      <h3>{{ confirmationMessage }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentsPage",
  data() {
    return {
      selectedDoctor: null,
      formData: {
        name: "",
        mobile: "",
        date: "",
        time: "",
      },
      confirmationMessage: "",
    };
  },
  created() {
  
    this.selectedDoctor = this.$route.query.doctor || null;
  },
  methods: {
    confirmBooking() {
    
      this.confirmationMessage = `✅ Appointment confirmed with ${this.selectedDoctor} on ${this.formData.date} at ${this.formData.time}.`;
      
      // reset form
      this.formData = { name: "", mobile: "", date: "", time: "" };
    },
  },
};
</script>

<style scoped>
.appointments-page {
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.doctor-info {
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: bold;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.booking-form label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: bold;
}

.booking-form input {
  margin-top: 5px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
}

.booking-form button {
  margin-top: 10px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: #3498db;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.booking-form button:hover {
  background: #217dbb;
}

.confirmation {
  margin-top: 20px;
  padding: 15px;
  background: #e0f7e9;
  border-radius: 8px;
  color: #2e7d32;
  font-weight: bold;
}
</style>
