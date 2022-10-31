<script setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
} from "@heroicons/vue/20/solid";
import { onBeforeMount, ref } from "vue";
import TokenService from "@/services/token";
import HttpMethod from "@/services/http-method";
import VEmptyList from "@/components/VEmptyList.vue";

const USER_URL = import.meta.env.VITE_BASE_URL + "/v2/users";

const css = {
  pageNumber:
    "inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-50 border-gray-100",
  arrow:
    "inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-gray-50 border-gray-100",
};
const users = ref({});
const user = ref({});
const currentPage = ref(0);

// GET [start page]
const getUsers = async () => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: HttpMethod.GET,
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  const res = await fetch(USER_URL, options);
  if (res.status === 200) {
    users.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// GET [next page]
const nextPage = async () => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: HttpMethod.GET,
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  currentPage.value = currentPage.value + 1;
  if (currentPage.value > users.value.totalPages - 1) {
    currentPage.value = users.value.totalPages - 1;
  }
  const res = await fetch(USER_URL + "?page=" + currentPage.value, options);
  if (res.status === 200) {
    users.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// GET [previous page]
const previousPage = async () => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: HttpMethod.GET,
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  currentPage.value = currentPage.value - 1;
  if (currentPage.value < 0) {
    currentPage.value = 0;
  }
  const res = await fetch(USER_URL + "?page=" + currentPage.value, options);
  if (res.status === 200) {
    users.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// GET [go to page]
const goToPage = async (page) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: HttpMethod.GET,
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  const res = await fetch(USER_URL + "?page=" + page, options);
  if (res.status === 200) {
    users.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// GET [get user by id]
const getUserById = async (id) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: HttpMethod.GET,
    headers: {
      Authorization: TokenService.getAccessToken(),
    },
  };
  const res = await fetch(USER_URL + "/" + id, options);
  if (res.status === 200) {
    user.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

onBeforeMount(async () => {
  await getUsers();
});
</script>

<template>
  <div id="user-list" v-show="users.totalElements > 0">
    <div class="container p-2 mx-auto sm:p-4 text-gray-800">
      <h2 class="mb-4 text-2xl font-semibold leading-tight">Users</h2>
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
              <th class="p-3">Username</th>
              <th class="p-3">Email</th>
              <th class="p-3">Role</th>
              <th class="p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b border-opacity-20 border-gray-300 bg-gray-50"
              v-for="user in users.content"
              :key="user.id"
            >
              <td class="p-3">
                <p>{{ user.id }}</p>
              </td>
              <td class="p-3">
                <p>{{ user.userName }}</p>
              </td>
              <td class="p-3">
                <p>{{ user.userEmail }}</p>
              </td>
              <td class="p-3">
                <p>{{ user.userRoles[0].roleName }}</p>
              </td>
              <td class="p-3 text-right">
                <button type="button">
                  <PencilSquareIcon class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center space-x-1 text-gray-800">
      <button
        title="previous"
        type="button"
        :class="css.arrow"
        @click.left="previousPage"
      >
        <ChevronLeftIcon class="w-4 h-4" />
      </button>
      <button
        type="button"
        :class="css.pageNumber"
        v-for="page in users.totalPages"
        :key="page"
        @click.left="goToPage(page - 1)"
      >
        {{ page }}
      </button>
      <button
        title="next"
        type="button"
        :class="css.arrow"
        @click.left="nextPage"
      >
        <ChevronRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
  <div v-show="users.totalElements === 0">
    <VEmptyList />
  </div>
</template>

<style scoped></style>
