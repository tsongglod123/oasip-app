<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const pageNumber =
  "inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md bg-gray-50 border-gray-100";
const arrow =
  "inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md bg-gray-50 border-gray-100";
</script>

<template>
  <div id="user-list">
    <div class="container p-2 mx-auto sm:p-4 text-gray-800">
      <h2 class="mb-4 text-2xl font-semibold leading-tight">Users</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col class="w-24" />
          </colgroup>
          <thead class="bg-gray-300">
            <tr class="text-left">
              <th class="p-3">#</th>
              <th class="p-3">Client</th>
              <th class="p-3">Issued</th>
              <th class="p-3">Due</th>
              <th class="p-3 text-right">Amount</th>
              <th class="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-opacity-20 border-gray-300 bg-gray-50">
              <td class="p-3">
                <p>97412378923</p>
              </td>
              <td class="p-3">
                <p>Microsoft Corporation</p>
              </td>
              <td class="p-3">
                <p>14 Jan 2022</p>
                <p class="text-gray-600">Friday</p>
              </td>
              <td class="p-3">
                <p>01 Feb 2022</p>
                <p class="text-gray-600">Tuesday</p>
              </td>
              <td class="p-3 text-right">
                <p>$15,792</p>
              </td>
              <td class="p-3 text-right">
                <span
                  class="px-3 py-1 font-semibold rounded-md bg-rose-600 text-gray-50"
                >
                  <span>Pending</span>
                </span>
              </td>
            </tr>
            <tr class="border-b border-opacity-20 border-gray-300 bg-gray-50">
              <td class="p-3">
                <p>97412378923</p>
              </td>
              <td class="p-3">
                <p>Tesla Inc.</p>
              </td>
              <td class="p-3">
                <p>14 Jan 2022</p>
                <p class="text-gray-600">Friday</p>
              </td>
              <td class="p-3">
                <p>01 Feb 2022</p>
                <p class="text-gray-600">Tuesday</p>
              </td>
              <td class="p-3 text-right">
                <p>$275</p>
              </td>
              <td class="p-3 text-right">
                <span
                  class="px-3 py-1 font-semibold rounded-md bg-rose-600 text-gray-50"
                >
                  <span>Pending</span>
                </span>
              </td>
            </tr>
            <tr class="border-b border-opacity-20 border-gray-300 bg-gray-50">
              <td class="p-3">
                <p>97412378923</p>
              </td>
              <td class="p-3">
                <p>Coca Cola co.</p>
              </td>
              <td class="p-3">
                <p>14 Jan 2022</p>
                <p class="text-gray-600">Friday</p>
              </td>
              <td class="p-3">
                <p>01 Feb 2022</p>
                <p class="text-gray-600">Tuesday</p>
              </td>
              <td class="p-3 text-right">
                <p>$8,950,500</p>
              </td>
              <td class="p-3 text-right">
                <span
                  class="px-3 py-1 font-semibold rounded-md bg-rose-600 text-gray-50"
                >
                  <span>Pending</span>
                </span>
              </td>
            </tr>
            <tr class="border-b border-opacity-20 border-gray-300 bg-gray-50">
              <td class="p-3">
                <p>97412378923</p>
              </td>
              <td class="p-3">
                <p>Nvidia Corporation</p>
              </td>
              <td class="p-3">
                <p>14 Jan 2022</p>
                <p class="text-gray-600">Friday</p>
              </td>
              <td class="p-3">
                <p>01 Feb 2022</p>
                <p class="text-gray-600">Tuesday</p>
              </td>
              <td class="p-3 text-right">
                <p>$98,218</p>
              </td>
              <td class="p-3 text-right">
                <span
                  class="px-3 py-1 font-semibold rounded-md bg-rose-600 text-gray-50"
                >
                  <span>Pending</span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center space-x-1 text-gray-800">
      <button title="previous" type="button" :class="arrow">
        <ChevronLeftIcon class="w-4 h-4" />
      </button>
      <button
        type="button"
        class="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md bg-gray-50 text-rose-600 border-rose-600"
      >
        1
      </button>
      <button type="button" :class="pageNumber">2</button>
      <button type="button" :class="pageNumber">3</button>
      <button title="next" type="button" :class="arrow">
        <ChevronRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
