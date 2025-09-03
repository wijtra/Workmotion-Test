<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "../store/categoryStore";
import CategoryForm from "../components/CategoryForm.vue";

const store = useCategoryStore();
const editingCategory = ref(null);

onMounted(async () => {
  await store.fetchCategories();
});

function startEdit(cat) {
  editingCategory.value = { ...cat };
}

function cancelEdit() {
  editingCategory.value = null;
}
</script>

<template>
  <div>
    <h2>หมวดหมู่</h2>
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ชื่อหมวดหมู่</th>
          <th>การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in store.categories" :key="c._id">
          <td>{{ c.name }}</td>
          <td>
            <button @click="startEdit(c)">Edit</button>
            <button @click="store.deleteCategory(c._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

     <h3>เพิ่ม/แก้ไขหมวดหมู่</h3>
    <CategoryForm
      v-if="editingCategory"
      :category="editingCategory"
      @save="async (data) => { await store.updateCategory(editingCategory._id, data); cancelEdit(); }"
      @cancel="cancelEdit"
    />
    <CategoryForm
      v-else
      @save="store.addCategory"
    />
  </div>
</template>
