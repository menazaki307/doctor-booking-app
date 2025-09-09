<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <h2>✅ Appointment Confirmed!</h2>
      <p>
        Your appointment with <strong>{{ doctor }}</strong> has been booked for
        <strong>{{ date }}</strong> at <strong>{{ time }}</strong>.
      </p>
      <button @click="$emit('close')">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationModal",
  props: {
    show: Boolean,
    doctor: String,
    date: String,
    time: String,
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content h2 {
  color: #2e7d32;
  margin-bottom: 10px;
}

.modal-content button {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background: #3498db;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.modal-content button:hover {
  background: #217dbb;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
