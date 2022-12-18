<script setup>
import {
  PencilSquareIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/vue/20/solid";
import TokenService from "@/services/token";
import VEmptyList from "@/components/VEmptyList.vue";
import { inject, onBeforeMount, ref } from "vue";

const EVENT_URL = import.meta.env.VITE_BASE_URL + "/v2/events";

const events = ref([]);
const event = ref({});
const json = inject("json");
const isAuth = ref(false);
const showModal = ref(false);
const showFormModal = ref(false);

const toggleModal = (open) => (showModal.value = !open);
const toggleFormModal = (open) => (showFormModal.value = !open);

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
const createEvent = async (data) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "POST",
    headers: {
      Authorization: TokenService.getAccessToken(),
      "Content-Type": json,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(EVENT_URL, options);
  if (res.status === 201) {
    const newEvent = await res.json();
    alert("Event created successfully");
    events.value.push(newEvent);
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// DELETE [delete event by id]
const deleteEvent = async (id) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "DELETE",
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  const res = await fetch(EVENT_URL + "/" + id, options);
  if (res.status === 204) {
    events.value = events.value.filter((e) => e.id !== id);
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// PATCH [update event by id]
const updateEvent = async (id, data) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "PATCH",
    headers: {
      Authorization: TokenService.getAccessToken(),
      "Content-Type": json,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(EVENT_URL + "/" + id, options);
  if (res.status === 200) {
    event.value = await res.json();
    events.value = events.value.map((e) => {
      e.id === event.value.id ? event.value : e;
    });
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

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
      <h2 class="mb-4 text-2xl font-semibold leading-tight">
        Events
        <button
          v-show="isAuth && TokenService.getRole() === 'admin'"
          class="float-right px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          @click.left="toggleFormModal(showFormModal)"
        >
          New
        </button>
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col class="w-25" />
          </colgroup>
          <thead class="bg-gray-300">
            <tr class="text-left">
              <th class="p-3">Start Date</th>
              <th class="p-3">Start Time</th>
              <th class="p-3">Duration (minutes)</th>
              <th class="p-3">Category</th>
              <th class="p-3">Booking Name</th>
              <th class="p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ev of events"
              :key="ev.id"
              class="border-b border-opacity-20 border-gray-300 bg-gray-50"
            >
              <td class="p-3">
                <p>{{ ev.eventStartDate }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.eventStartTime }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.eventDuration }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.categoryName }}</p>
              </td>
              <td class="p-3">
                <p>{{ ev.bookingName }}</p>
              </td>
              <td class="p-2 text-right">
                <button type="button" class="mr-2">
                  <MagnifyingGlassIcon
                    v-if="isAuth && TokenService.getRole() === 'lecturer'"
                    class="w-5 h-5"
                    @click.left="
                      getEvent(ev.id);
                      toggleModal(showModal);
                    "
                  />
                  <PencilSquareIcon
                    v-else
                    class="w-5 h-5"
                    @click.left="
                      getEvent(ev.id);
                      toggleModal(showModal);
                    "
                  />
                </button>
                <button
                  v-show="isAuth && TokenService.getRole() !== 'lecturer'"
                  type="button"
                >
                  <XCircleIcon
                    class="w-5 h-5 text-red-600"
                    @click.left="deleteEvent(ev.id)"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-show="events.length === 0 || !isAuth">
    <VEmptyList />
  </div>
</template>

<style scoped></style>
