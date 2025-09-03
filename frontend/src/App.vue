<template>
  <div>
    <h1>ระบบจัดการสินค้า & หมวดหมู่</h1>
    <nav>
      <router-link to="/products">สินค้า</router-link> |
      <router-link to="/categories">หมวดหมู่</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  margin-bottom: 20px;
}
</style>
