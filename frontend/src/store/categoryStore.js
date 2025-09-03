import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async fetchCategories() {
      try {
        const res = await axios.get(`${API_URL}/categories`);
        this.categories = res.data.data; 
      } catch (err) {
        console.error(err);
      }
    },
    async addCategory(category) {
      try {
        const res = await axios.post(`${API_URL}/categories`, category);
        this.categories.push(res.data); 
      } catch (err) {
        console.error(err);
      }
    },
    async updateCategory(id, category) {
      try {
        const res = await axios.put(`${API_URL}/categories/${id}`, category);
        const index = this.categories.findIndex(c => c._id === id);
        if (index !== -1) this.categories[index] = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteCategory(id) {
      try {
        await axios.delete(`${API_URL}/categories/${id}`);
        this.categories = this.categories.filter(c => c._id !== id);
      } catch (err) {
        console.error(err);
      }
    },
    getCategoryName(category) {
    const categoryStore = useCategoryStore();
    const categoryId = category && typeof category === "object" ? category._id : category;
    const cat = categoryStore.categories.find(c => c._id === categoryId);
    return cat ? cat.name : "-";
}
  },
});
