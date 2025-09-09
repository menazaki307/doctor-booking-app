import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Doctors from '../views/Doctors.vue';
import BookingPage from '../views/BookingPage.vue';
import MyAppointments from '../views/MyAppointments.vue';
import ContactUs from '../views/ContactUs.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: Doctors,
  },
  {
  
    path: '/book-appointment/:doctorId', 
    name: 'book-appointment',
    component: BookingPage,
    props: true
  },
  {
    path: '/my-appointments',
    name: 'my-appointments',
    component: MyAppointments,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactUs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;