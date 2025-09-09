<template>
  <footer class="footer py-4 mt-5">
    <div class="container text-center">
      <p class="mb-2">
        &copy; 2023 MedBook - Doctor Appointment System. All rights reserved.
      </p>
      <div class="social-links">
        <a href="#" class="mx-2"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="mx-2"><i class="fab fa-twitter"></i></a>
        <a href="#" class="mx-2"><i class="fab fa-instagram"></i></a>
        <a href="#" class="mx-2"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #34495e;
  color: white;
}

.social-links a {
  color: white;
  font-size: 1.25rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #007bff;
}
</style>