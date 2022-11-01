<script setup>
import { ref, inject } from "vue";
import HttpMethod from "@/services/http-method";

const LENGTH = inject("length");
const EMAIL_REGEX = inject("emailRegex");
const AUTH_URL = import.meta.env.VITE_BASE_URL + "/v2/auth";

const json = inject("json");
const roles = ["Student", "Lecturer"];
const confirmPwd = ref("");
const user = ref({
  userName: "",
  userPassword: "",
  userEmail: "",
  userRole: "",
});

const isEmailValid = inject("isEmailValid");

const goTo = inject("router");

// return true if the password and confirm password are the same
const isPwdMatch = (pwd, confirmPwd) => {
  if (
    pwd.length >= LENGTH.password.min &&
    confirmPwd.length >= LENGTH.password.min
  ) {
    if (!(pwd === confirmPwd)) {
      alert("Password and confirm password are not the same");
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const isAllowToSubmit = (user) => {
  const { userName, userPassword, userEmail, userRole } = user;
  return (
    userName.length > 0 &&
    isEmailValid(userEmail, EMAIL_REGEX) &&
    userRole.length > 0 &&
    isPwdMatch(userPassword, confirmPwd.value)
  );
};

const clearForm = () => {
  for (const key in user.value) user.value[key] = "";
  confirmPwd.value = "";
};

// POST
const register = async (data) => {
  if (isAllowToSubmit(data)) {
    const options = {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": json,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(AUTH_URL + "/register", options);
    if (res.status === 201) {
      alert("Register successfully!");
      goTo("login");
    } else {
      const body = await res.json();
      let text = "";
      body.errors.forEach((err) => {
        text = text.concat(err.field + ": " + err.message);
        text = text.concat("\n");
      });
      alert(text);
      clearForm();
    }
  }
};
</script>

<template>
  <div
    id="register-form"
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
          Create an account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent>
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              type="text"
              v-model="user.userName"
              :maxlength="LENGTH.username"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              v-model="user.userEmail"
              :maxlength="LENGTH.email"
              class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
              :pattern="EMAIL_REGEX"
              required
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              type="password"
              v-model="user.userPassword"
              :minlength="LENGTH.password.min"
              :maxlength="LENGTH.password.max"
              class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <label for="confirm-password" class="sr-only">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              v-model="confirmPwd"
              :minlength="LENGTH.password.min"
              :maxlength="LENGTH.password.max"
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Confirm password"
              required
            />
          </div>
          <div>
            <label for="role" class="sr-only">Role</label>
            <select
              id="role"
              v-model="user.userRole"
              class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option disabled value="">Who are you?</option>
              <option
                v-for="(role, index) in roles"
                :key="index"
                :value="role.toLowerCase()"
              >
                {{ role }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            @click.left="register(user)"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign up
          </button>
        </div>
      </form>
      <div class="flex justify-center">
        <div class="text-sm">
          Already have an account?
          <a
            @click.left="goTo('login')"
            class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
