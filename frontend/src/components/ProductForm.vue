<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  product: Object,
  categories: Array,
});
const emit = defineEmits(["save", "cancel"]);

const form = ref({ name: "", price: "", categoryId: "" });

watch(
  () => props.product,
  (val) => {
    if (val) {
      form.value = {
        name: val.name || "",
        price: val.price || 0,
        // ถ้า categoryId เป็น object -> ดึง _id
        categoryId: val.categoryId?._id || val.categoryId || "",
      };
    } else {
      form.value = { name: "", price: "", categoryId: "" };
    }
  },
  { immediate: true }
);

function save() {
  if (!form.value.name || !form.value.price || !form.value.categoryId) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  emit("save", { ...form.value });
  form.value = { name: "", price: 0, categoryId: "" };
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model="form.name" placeholder="ชื่อสินค้า" />
    <input v-model="form.price" type="number" placeholder="ราคา" />

    <select v-model="form.categoryId">
      <option value="">เลือกหมวดหมู่</option>
      <option v-for="c in categories" :key="c._id" :value="c._id">
        {{ c.name }}
      </option>
    </select>

    <button type="submit">Save</button>
    <button type="button" v-if="props.product" @click="$emit('cancel')">
      Cancel
    </button>
  </form>
</template>
