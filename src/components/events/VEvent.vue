<script setup>
import TokenService from "@/services/token";
import VEmptyList from "@/components/VEmptyList.vue";
import { inject, onBeforeMount, ref } from "vue";

const EVENT_URL = import.meta.env.VITE_BASE_URL + "/v2/events";

const events = ref([]);
const event = ref({});
const json = inject("json");
const isAuth = ref(false);
const showModal = ref(false);

const toggleModal = (open) => (showModal.value = !open);

// GET [get events]
const getEvents = async () => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "GET",
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  const res = await fetch(EVENT_URL, options);
  if (res.status === 200) {
    events.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// GET [get event by id]
const getEvent = async (id) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "GET",
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  const res = await fetch(EVENT_URL + "/" + id, options);
  if (res.status === 200) {
    event.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// POST [create event]
// DELETE
// PATCH

onBeforeMount(async () => {
  if (TokenService.checkLocalStorage()) {
    isAuth.value = true;
    await getEvents();
  } else {
    isAuth.value = false;
  }
});
</script>

<template>
  <div v-show="isAuth && events.length > 0" id="booking-list">
    <div class="container p-2 mx-auto sm:p-4 text-gray-800">
      <h2 class="mb-4 text-2xl font-semibold leading-tight">Events</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col class="w-24" />
          </colgroup>
          <thead class="bg-gray-300">
            <tr class="text-left">
              <th class="p-3">#</th>
              <th class="p-3">Booking Name</th>
              <th class="p-3">Clinic</th>
              <th class="p-3">Event Start Time</th>
              <th class="p-3">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ev of events"
              :key="ev.id"
              class="border-b border-opacity-20 border-gray-300 bg-gray-50"
            >
              <td class="p-3">
                <p>{{ ev.id }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.bookingName }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.categoryName }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.startDateTime }}</p>
              </td>
              <td class="p-3 text-right">
                <span
                  class="px-3 py-1 font-semibold rounded-md bg-rose-600 text-gray-50"
                >
                  <button @click="clicked(ev.id)">Detail</button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-show="!isAuth">
    <VEmptyList />
  </div>
</template>

<style scoped></style>
