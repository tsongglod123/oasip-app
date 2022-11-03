<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { inject, ref } from "vue";

const emit = defineEmits(["toggle", "update"]);
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
  },
});

const LENGTH = inject("length");
const EMAIL_REGEX = inject("emailRegex");
const css = {
  save: "inline-flex justify-center rounded-md border border-transparent bg-green-100 px-2 py-1 text-xs font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
  cancel:
    "inline-flex justify-center rounded-md border border-transparent px-2 py-1 text-xs font-medium text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  input: {
    disabled:
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500",
    enabled:
      "border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500",
  },
};

const roles = ["student", "lecturer", "admin"];
const isPanelOpen = ref({
  username: false,
  email: false,
});
const edit = ref({
  userName: "",
  userEmail: "",
});

const closeModal = () => {
  for (const field in isPanelOpen.value) {
    isPanelOpen.value[field] = false;
  }
  setDefault("userName");
  setDefault("userEmail");
  emit("toggle", true);
};

const updateUser = (id, field, val) => emit("update", [id, field, val]);

const togglePanel = (field) => {
  setDefault("userName");
  setDefault("userEmail");
  isPanelOpen.value[field] = !isPanelOpen.value[field];
};

const setDefault = (field) => (edit.value[field] = props.user[field]);
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
                User Information
              </DialogTitle>
              <div class="mt-2">
                <div>
                  <label
                    for="username"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Username
                    <button
                      type="button"
                      class="text-sm text-blue-500 hover:text-blue-700"
                      @click.left="togglePanel('username')"
                    >
                      edit
                    </button>
                  </label>
                  <input
                    id="username"
                    :value="user.userName"
                    type="text"
                    :maxlength="LENGTH.username"
                    :class="
                      isPanelOpen.username
                        ? css.input.enabled
                        : css.input.disabled
                    "
                    :disabled="!isPanelOpen.username"
                    @input="edit.userName = $event.target.value"
                  />
                  <div
                    v-show="isPanelOpen.username"
                    class="mt-1 flex flex-row-reverse"
                  >
                    <button
                      type="button"
                      :class="css.save"
                      @click.left="
                        updateUser(user.id, 'userName', edit.userName);
                        togglePanel('username');
                      "
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      :class="css.cancel"
                      @click.left="togglePanel('username')"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Email
                    <button
                      type="button"
                      class="text-sm text-blue-500 hover:text-blue-700"
                      @click.left="togglePanel('email')"
                    >
                      edit
                    </button>
                  </label>
                  <input
                    id="email"
                    :value="user.userEmail"
                    type="email"
                    :maxlength="LENGTH.email"
                    :class="
                      isPanelOpen.email ? css.input.enabled : css.input.disabled
                    "
                    :pattern="EMAIL_REGEX"
                    :disabled="!isPanelOpen.email"
                  />
                  <div
                    v-show="isPanelOpen.email"
                    class="mt-1 flex flex-row-reverse"
                  >
                    <button
                      type="button"
                      :class="css.save"
                      @click.left="
                        updateUser(user.id, 'userEmail', edit.userEmail);
                        togglePanel('email');
                      "
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      :class="css.cancel"
                      @click.left="togglePanel('email')"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    for="role"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Role</label
                  >
                  <select
                    id="role"
                    :value="user.role"
                    :class="css.input.enabled"
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
                </div>
                <div>
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
                  @click.left="closeModal"
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
