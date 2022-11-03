<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { inject } from "vue";

const emit = defineEmits(["toggle", "update"]);
defineProps({
  user: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
  },
  border: {
    type: String,
    required: true,
  },
});

const LENGTH = inject("length");
const EMAIL_REGEX = inject("emailRegex");

const roles = ["student", "lecturer", "admin"];

const closeModal = () => emit("toggle", true);
const updateUser = (id, field, val) => emit("update", [id, field, val]);
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Edit
              </DialogTitle>
              <div class="mt-2">
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Username</label
                  >
                  <input
                    id="username"
                    :value="user.userName"
                    type="text"
                    :maxlength="LENGTH.username"
                    :class="[
                      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5',
                      border,
                    ]"
                    required
                    @input="
                      updateUser(user.id, 'userName', $event.target.value)
                    "
                  />
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Email</label
                  >
                  <input
                    id="email"
                    :value="user.userEmail"
                    type="email"
                    :maxlength="LENGTH.email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    :pattern="EMAIL_REGEX"
                    required
                    @input="
                      updateUser(user.id, 'userEmail', $event.target.value)
                    "
                  />
                  <label
                    for="role"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Role</label
                  >
                  <select
                    id="role"
                    :value="user.role"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    @input="
                      updateUser(user.id, 'userRole', $event.target.value)
                    "
                  >
                    <option disabled value="">Please select a role</option>
                    <option
                      v-for="(role, index) in roles"
                      :key="index"
                      :value="role"
                    >
                      {{ role }}
                    </option>
                  </select>
                  <dl>
                    <div
                      class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Create on
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                      >
                        {{ user.createdDate + " at " + user.createdTime }}
                      </dd>
                    </div>
                    <div
                      class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt class="text-sm font-medium text-gray-500">
                        Last update
                      </dt>
                      <dd
                        class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"
                      >
                        {{ user.updatedDate + " at " + user.updatedTime }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div class="mt-4 flex flex-row-reverse">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
