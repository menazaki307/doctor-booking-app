<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">Contact Us</h2>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="name" class="form-control" placeholder="Your Name" required />
      <input type="email" v-model="email" class="form-control" placeholder="Your Email" required />
      <textarea v-model="message" class="form-control" placeholder="Your Message" rows="4" required></textarea>
      <button type="submit" class="btn btn-primary w-100">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const message = ref("");

function submitForm() {
  if (name.value && email.value && message.value) {
    alert("Message sent successfully!");
    name.value = "";
    email.value = "";
    message.value = "";
  }
}
</script>
