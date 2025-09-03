import { defineStore } from "pinia";
import axios from "axios";
import { useCategoryStore } from "./categoryStore";

const API_URL = "http://localhost:3000/api";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const res = await axios.get(`${API_URL}/products`);
        this.products = res.data.data;
      } catch (err) {
        console.error(err);
      }
    },
    async addProduct(product) {
      try {
        const res = await axios.post(`${API_URL}/product`, product);
        this.products.push(res.data);
      } catch (err) {
        console.error(err);
      }
    },
    async updateProduct(id, product) {
      try {
        const res = await axios.put(`${API_URL}/product/${id}`, product);
        const index = this.products.findIndex(p => p._id === id);
        if (index !== -1) this.products[index] = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`${API_URL}/product/${id}`);
        this.products = this.products.filter(p => p._id !== id);
      } catch (err) {
        console.error(err);
      }
    },
    getCategoryName(id) {
      const categoryStore = useCategoryStore();
      console.log("id :",id)
      console.log("ทดสอบ :",categoryStore.getCategoryName(id))
      return categoryStore.getCategoryName(id);
    },
  },
});
