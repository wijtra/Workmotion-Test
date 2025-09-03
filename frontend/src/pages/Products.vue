<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "../store/productStore";
import { useCategoryStore } from "../store/categoryStore";
import ProductForm from "../components/ProductForm.vue";

const store = useProductStore();
const categoryStore = useCategoryStore();
const editingProduct = ref(null);

onMounted(async () => {
  await categoryStore.fetchCategories();
  await store.fetchProducts();
});

function startEdit(product) {
  editingProduct.value = { ...product };
  console.log("product:", product)
}
function cancelEdit() {
  editingProduct.value = null;
}
</script>

<template>
  <div>
    <h2>สินค้า</h2>

    <ProductForm
      v-if="editingProduct"
      :product="editingProduct"
      :categories="categoryStore.categories" 
      @save="async (data) => { await store.updateProduct(editingProduct._id, data); cancelEdit(); }"
      @cancel="cancelEdit"
    />
    <ProductForm
      v-else
      :categories="categoryStore.categories"
      @save="store.addProduct"
    />

    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>ชื่อสินค้า</th>
          <th>หมวดหมู่</th>
          <th>ราคา</th>
          <th>การจัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in store.products" :key="p._id">
          <td>{{ p.name }}</td>
          <td>{{ store.getCategoryName(p.categoryId) }}</td>
          <td>{{ p.price }}</td>
          <td>
            <button @click="startEdit(p)">Edit</button>
            <button @click="store.deleteProduct(p._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
