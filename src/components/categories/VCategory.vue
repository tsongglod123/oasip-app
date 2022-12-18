<script setup>
import { PencilSquareIcon, XCircleIcon } from "@heroicons/vue/20/solid";
import TokenService from "@/services/token";
import VEmptyList from "@/components/VEmptyList.vue";
import VModal from "@/components/categories/VModal.vue";
import { inject, onBeforeMount, ref } from "vue";
import VFormModal from "@/components/categories/VFormModal.vue";

const CATEGORY_URL = import.meta.env.VITE_BASE_URL + "/v2/categories";

const categories = ref([]);
const category = ref({});
const json = inject("json");
const isAuth = ref(false);
const showModal = ref(false);
const showFormModal = ref(false);

const toggleModal = (open) => (showModal.value = !open);
const toggleFormModal = (open) => (showFormModal.value = !open);

// GET [get categories]
const getCategories = async () => {
  const options = {
    method: "GET",
  };
  const res = await fetch(CATEGORY_URL, options);
  if (res.status === 200) {
    categories.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// GET [get category by id]
const getCategory = async (id) => {
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
  const res = await fetch(CATEGORY_URL + "/" + id, options);
  if (res.status === 200) {
    category.value = await res.json();
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// DELETE [delete category by id]
const deleteCategory = async (id) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const text = "Are you sure you want to delete this category?";
  if (confirm(text)) {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: TokenService.getAccessToken(),
      },
    };
    const res = await fetch(CATEGORY_URL + "/" + id, options);
    if (res.status === 204) {
      categories.value = categories.value.filter((c) => c.id !== id);
    } else {
      const body = await res.json();
      alert(body.message);
    }
  }
};

// POST [create category]
const createCategory = async (data) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": json,
      Authorization: TokenService.getAccessToken(),
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(CATEGORY_URL, options);
  if (res.status === 201) {
    const newCategory = await res.json();
    alert("Add a new category successfully!");
    categories.value.push(newCategory);
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

// PATCH [update category by id]
const updateCategory = async ([id, field, value]) => {
  if (TokenService.isTokenExpired(TokenService.getRefreshToken())) {
    TokenService.clearTokens();
    location.replace("/kp3/login");
  } else if (TokenService.isTokenExpired(TokenService.getAccessToken())) {
    await TokenService.refreshToken();
  }
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": json,
      Authorization: TokenService.getAccessToken(),
    },
    body:
      field === "eventDuration"
        ? JSON.stringify({
            [field]: parseInt(value),
          })
        : JSON.stringify({
            [field]: value.trim(),
          }),
  };
  const res = await fetch(CATEGORY_URL + "/" + id, options);
  if (res.status === 200) {
    category.value = await res.json();
    categories.value = categories.value.map((c) =>
      c.id === category.value.id ? category.value : c
    );
  } else {
    const body = await res.json();
    alert(body.message);
  }
};

onBeforeMount(async () => {
  isAuth.value = TokenService.checkLocalStorage() ? true : false;
  await getCategories();
});
</script>

<template>
  <div v-if="categories.length > 0" id="category-list">
    <div class="container p-2 mx-auto sm:p-4 text-gray-800">
      <h2 class="mb-4 text-2xl font-semibold leading-tight">
        Categories
        <button
          v-show="isAuth && TokenService.getRole() === 'admin'"
          class="float-right px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          @click.left="toggleFormModal(showFormModal)"
        >
          Add Category
        </button>
      </h2>
      <VFormModal
        :is-open="showFormModal"
        @toggle="toggleFormModal"
        @create="createCategory"
      />
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
              <th class="p-3">Category</th>
              <th class="p-3">Description</th>
              <th class="p-3">Duration (minutes)</th>
              <th class="p-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="content in categories"
              :key="content.id"
              class="border-b border-opacity-20 border-gray-300 bg-gray-50"
            >
              <td class="p-3">
                <p>{{ content.id }}</p>
              </td>
              <td class="p-3">
                <p>{{ content.categoryName }}</p>
              </td>
              <td class="p-3">
                <p>
                  {{
                    content.categoryDescription === null
                      ? "No description"
                      : content.categoryDescription
                  }}
                </p>
              </td>
              <td class="p-3">
                <p>{{ content.eventDuration }}</p>
              </td>
              <td class="p-2 text-right">
                <button
                  v-show="isAuth && TokenService.getRole() === 'admin'"
                  type="button"
                  class="mr-2"
                >
                  <PencilSquareIcon
                    class="w-5 h-5"
                    @click.left="
                      getCategory(content.id);
                      toggleModal(showModal);
                    "
                  />
                </button>
                <button
                  v-show="isAuth && TokenService.getRole() === 'admin'"
                  type="button"
                >
                  <XCircleIcon
                    class="w-5 h-5 text-red-600"
                    @click.left="deleteCategory(content.id)"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <VModal
          :category="category"
          :is-open="showModal"
          @toggle="toggleModal"
          @update="updateCategory"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <VEmptyList />
  </div>
</template>

<style scoped></style>
