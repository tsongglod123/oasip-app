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
  category: {
    type: Object,
    required: true,
  },
  isOpen: {
    type: Boolean,
  },
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

const isPanelOpen = ref({
  category: false,
  description: false,
  duration: false,
});
const edit = ref({
  categoryName: "",
  categoryDescription: "",
  eventDuration: 1,
});

const closeModal = () => {
  for (const field in isPanelOpen.value) {
    isPanelOpen.value[field] = false;
  }
  for (const key in edit.value) {
    setDefault(key);
  }
  emit("toggle", true);
};

const updateCategory = (id, field, val) => emit("update", [id, field, val]);

const togglePanel = (field) => {
  for (const key in edit.value) {
    setDefault(key);
  }
  isPanelOpen.value[field] = !isPanelOpen.value[field];
};

const setDefault = (field) => (edit.value[field] = props.category[field]);
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
                Category Information
              </DialogTitle>
              <div class="mt-2">
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Category
                    <button
                      type="button"
                      class="text-sm text-blue-500 hover:text-blue-700"
                      @click.left="togglePanel('category')"
                    >
                      edit
                    </button>
                  </label>
                  <input
                    id="category"
                    :value="category.categoryName"
                    type="text"
                    :maxlength="LENGTH.username"
                    :class="
                      isPanelOpen.category
                        ? css.input.enabled
                        : css.input.disabled
                    "
                    :disabled="!isPanelOpen.category"
                    @input="edit.categoryName = $event.target.value"
                  />
                  <div
                    v-show="isPanelOpen.category"
                    class="mt-1 flex flex-row-reverse"
                  >
                    <button
                      type="button"
                      :class="css.save"
                      @click.left="
                        updateCategory(
                          category.id,
                          'categoryName',
                          edit.categoryName
                        );
                        togglePanel('category');
                      "
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      :class="css.cancel"
                      @click.left="togglePanel('category')"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Description
                    <button
                      type="button"
                      class="text-sm text-blue-500 hover:text-blue-700"
                      @click.left="togglePanel('description')"
                    >
                      edit
                    </button>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Enter a description"
                    :value="category.categoryDescription"
                    :maxlength="LENGTH.email"
                    :class="
                      isPanelOpen.description
                        ? css.input.enabled
                        : css.input.disabled
                    "
                    :disabled="!isPanelOpen.description"
                    @input="edit.categoryDescription = $event.target.value"
                  />
                  <div
                    v-show="isPanelOpen.description"
                    class="mt-1 flex flex-row-reverse"
                  >
                    <button
                      type="button"
                      :class="css.save"
                      @click.left="
                        updateCategory(
                          category.id,
                          'categoryDescription',
                          edit.categoryDescription
                        );
                        togglePanel('description');
                      "
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      :class="css.cancel"
                      @click.left="togglePanel('description')"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                <div>
                  <label
                    for="duration"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Duration (minutes)
                    <button
                      type="button"
                      class="text-sm text-blue-500 hover:text-blue-700"
                      @click.left="togglePanel('duration')"
                    >
                      edit
                    </button>
                  </label>
                  <input
                    id="duration"
                    :value="category.eventDuration"
                    type="number"
                    :min="LENGTH.duration.min"
                    :max="LENGTH.duration.max"
                    step="1"
                    :class="
                      isPanelOpen.duration
                        ? css.input.enabled
                        : css.input.disabled
                    "
                    :disabled="!isPanelOpen.duration"
                    @input="edit.eventDuration = $event.target.value"
                  />
                  <div
                    v-show="isPanelOpen.duration"
                    class="mt-1 flex flex-row-reverse"
                  >
                    <button
                      type="button"
                      :class="css.save"
                      @click.left="
                        updateCategory(
                          category.id,
                          'eventDuration',
                          edit.eventDuration
                        );
                        togglePanel('duration');
                      "
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      :class="css.cancel"
                      @click.left="togglePanel('duration')"
                    >
                      Cancel
                    </button>
                  </div>
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
