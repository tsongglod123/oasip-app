<script setup>
import { ref, inject } from "vue";

const LENGTH = inject("length");
const EMAIL_REGEX = inject("emailRegex");
const AUTH_URL = import.meta.env.VITE_BASE_URL + "/v2/auth";

const json = inject("json");
const user = ref({
  userEmail: "",
  userPassword: "",
});

const isEmailValid = inject("isEmailValid");

const isAllowToSubmit = (user) => {
  const { userEmail, userPassword } = user;
  return (
    isEmailValid(userEmail, EMAIL_REGEX) &&
    userPassword.length >= LENGTH.password.min
  );
};

// POST
const login = async (data) => {
  if (isAllowToSubmit(data)) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": json,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(AUTH_URL + "/login", options);
    if (res.status === 200) {
      const token = await res.json();
      for (const key in token) localStorage.setItem(key, token[key]);
      alert("Login successfully!");
      location.replace("/");
    } else {
      const body = await res.json();
      alert(body.message);
    }
  }
};

const goTo = inject("router");
</script>

<template>
  <div
    id="login-form"
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <h1 class="mt-6 text-center text-5xl tracking-tight text-gray-900">
          O A S I P
        </h1>
        <h2
          class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent>
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="user.userEmail"
              type="email"
              :maxlength="LENGTH.email"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              :pattern="EMAIL_REGEX"
              required
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="user.userPassword"
              type="password"
              :minlength="LENGTH.password.min"
              :maxlength="LENGTH.password.max"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            @click.left="login(user)"
          >
            Sign in
          </button>
        </div>
      </form>
      <div class="flex justify-center">
        <div class="text-sm">
          New to OASIP?
          <a
            class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            @click.left="goTo('register')"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
