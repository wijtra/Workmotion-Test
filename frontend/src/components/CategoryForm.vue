<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  category: Object,
});
const emit = defineEmits(["save", "cancel"]);

const form = ref({ name: "" });

watch(
  () => props.category,
  (val) => {
    if (val) {
      form.value = { ...val };
    } else {
      form.value = { name: "" };
    }
  },
  { immediate: true }
);

function save() {
  if (!form.value.name) {
    alert("กรุณากรอกชื่อหมวดหมู่");
    return;
  }
  emit("save", { ...form.value });
  form.value = { name: "" };
}
</script>

<template>
  <form @submit.prevent="save">
    <input v-model="form.name" placeholder="ชื่อหมวดหมู่" />
    <button type="submit">Save</button>
    <button type="button" v-if="props.category" @click="$emit('cancel')">Cancel</button>
  </form>
</template>
