<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { inject, ref } from "vue";

const emit = defineEmits(["toggle", "create"]);
defineProps({
  isOpen: {
    type: Boolean,
  },
});

const category = ref({
  categoryName: "",
  categoryDescription: "",
  eventDuration: 0,
});
const LENGTH = inject("length");
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

const resetForm = () => {
  category.value = {
    categoryName: "",
    categoryDescription: "",
    eventDuration: 0,
  };
};

const closeModal = () => {
  resetForm();
  emit("toggle", true);
};

const createCategory = (val) => {
  if (isAllowToSubmit(val)) {
    emit("create", val);
    closeModal();
  }
};

const isAllowToSubmit = (category) => {
  const { categoryName, eventDuration } = category;
  return categoryName.length > 0 && eventDuration >= 1 && eventDuration <= 480;
};
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
                New Category
              </DialogTitle>
              <form @submit.prevent>
                <div class="mt-2">
                  <div>
                    <label
                      for="category"
                      class="block mb-2 text-sm font-medium text-gray-900"
                      >Category
                    </label>
                    <input
                      id="category"
                      v-model="category.categoryName"
                      placeholder="Enter a category name"
                      type="text"
                      :maxlength="LENGTH.username"
                      :class="css.input.enabled"
                      required
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      class="block mb-2 text-sm font-medium text-gray-900"
                      >Description
                    </label>
                    <textarea
                      id="description"
                      v-model="category.categoryDescription"
                      placeholder="Enter a description"
                      :maxlength="LENGTH.email"
                      :class="css.input.enabled"
                    />
                  </div>
                  <div>
                    <label
                      for="duration"
                      class="block mb-2 text-sm font-medium text-gray-900"
                      >Duration (minutes)
                    </label>
                    <input
                      id="duration"
                      v-model="category.eventDuration"
                      type="number"
                      :min="LENGTH.duration.min"
                      :max="LENGTH.duration.max"
                      step="1"
                      :class="css.input.enabled"
                      required
                    />
                  </div>
                </div>
                <div class="mt-4 flex flex-row-reverse">
                  <button
                    type="submit"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click.left="createCategory(category)"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    @click.left="closeModal"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
