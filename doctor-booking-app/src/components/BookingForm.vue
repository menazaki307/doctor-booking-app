<template>
  <div class="card p-4">
    <h4>Book Appointment with {{ doctor.name }}</h4>
    <form @submit.prevent="submitBooking">
      <input type="text" v-model="patientName" class="form-control" placeholder="Your Name" required />
      <input type="tel" v-model="phone" class="form-control" placeholder="Phone Number" required />
      <input type="email" v-model="email" class="form-control" placeholder="Email" required />
      <input type="date" v-model="date" class="form-control" required />
      <input type="time" v-model="time" class="form-control" required />
      <button type="submit" class="btn btn-success w-100 mt-3">Confirm Booking</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  doctor: Object
});
defineEmits(["confirm"]);

const patientName = ref("");
const phone = ref("");
const email = ref("");
const date = ref("");
const time = ref("");

function submitBooking() {
  if (patientName.value && phone.value && email.value && date.value && time.value) {
    const appointment = {
      doctor: doctor,
      patientName: patientName.value,
      phone: phone.value,
      email: email.value,
      date: date.value,
      time: time.value
    };
    emit("confirm", appointment);

    patientName.value = "";
    phone.value = "";
    email.value = "";
    date.value = "";
    time.value = "";
  }
}
</script>
