<template>
  <div class="contact-page container my-5">
    <h2 class="text-center mb-5 contact-title">Contact Us</h2>
    <div class="row justify-content-center">
      <div class="col-md-9 col-lg-7"> <div class="card p-5 shadow-sm">
          <form @submit.prevent="sendMessage">
            <div class="mb-4">
              <label for="name" class="form-label">Your Name</label>
              <input type="text" class="form-control form-control-lg" id="name" v-model="form.name" required />
            </div>
            <div class="mb-4">
              <label for="email" class="form-label">Email Address</label>
              <input type="email" class="form-control form-control-lg" id="email" v-model="form.email" required />
            </div>
            <div class="mb-4">
              <label for="message" class="form-label">Message</label>
              <textarea class="form-control form-control-lg" id="message" rows="8" v-model="form.message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100 mt-3">Send Message</button>
          </form>
        </div>
        <div class="text-center mt-5 contact-info">
          <p class="lead">Alternatively, you can reach us at:</p>
          <p class="mb-1">
            <i class="fas fa-envelope me-2"></i>
            <a href="mailto:support@medbook.com">support@medbook.com</a>
          </p>
          <p>
            <i class="fas fa-phone-alt me-2"></i>
            <a href="tel:+201234567890">+20 (123) 456-7890</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    sendMessage() {
      console.log('Sending message:', this.form);
      alert('Your active message has been sent!');
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
};
</script>

<style scoped>
.contact-title {
  color: #007bff;
  font-weight: bold;
  font-size: 2.5rem;
}
.card {
  border-radius: 10px;
}
.form-label {
  font-weight: 600;
  color: #34495e;
  font-size: 1.1rem;
}
.form-control-lg {
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    line-height: 1.5;
    border-radius: 0.3rem;
}
.btn-lg {
    padding: 0.75rem 1.25rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
}

.contact-info {
  color: #555;
  font-size: 1.1rem;
}
.contact-info a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}
.contact-info a:hover {
  text-decoration: underline;
}
</style>