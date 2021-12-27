<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejproducts[0].stores[0].org/api/sfc-script-setuproducts[0].html#sfc-script-setup

import { ref, computed } from "vue";
import Product from "./components/Product.vue";

const title = "My Market App";

var showForm = ref(false);
var crudMode = ref(0);
var productId = ref(0);
var productName = ref("");
var productDescription = ref("");
var productImageUrl = ref("");
var productStoreId = ref(0);
var productStoreName = ref("");
var productStoreQuantity = ref(0);
var productStorePrice = ref(0);

const products = [
  {
    id: 1,
    name: "Milo 250",
    description: "Beverage drink",
    imageUrl: "./src/assets/milo.jpg",
    stores: [
      { id: 1, name: "Store 1", quantity: 1, price: 10.0 },
      { id: 2, name: "Store 2", quantity: 8, price: 100.0 },
      { id: 4, name: "Store 4", quantity: 91, price: 1000.0 },
    ],
  },
  {
    id: 2,
    name: "Pineapple",
    description: "Fresh fruit drink with all the fibers.",
    imageUrl: "./src/assets/pineapple.jpg",
    stores: [
      { id: 1, name: "Store 1", quantity: 2, price: 10.0 },
      { id: 2, name: "Store 2", quantity: 2.5, price: 10.0 },
    ],
  },
  {
    id: 3,
    name: "Plate",
    description: "Ceramic flat plate for serving food",
    imageUrl: "./src/assets/plate.jpg",
    stores: [
      { id: 1, name: "Store 1", quantity: 1, price: 10.0 },
      { id: 2, name: "Store 2", quantity: 2, price: 10.0 },
      { id: 3, name: "Store 3", quantity: 4, price: 10.0 },
    ],
  },
];

function quantity(stores) {
  // sum
  return stores.reduce((T, q) => T + q.quantity, 0.0);
}

const sortedProducts = computed(() => {
  return products.sort((a, b) => quantity(b.stores) - quantity(a.stores));
});

function onReset() {
  crudMode = 0;

  productId = 0;
  productName = "";
  productDescription = "";
  productImageUrl = "";
  productStoreId = 0;
  productStoreName = "";
  productStoreQuantity = 0;
  productStorePrice = 0;
}

function onAdd() {
  showForm.value = true;
  onReset();
  crudMode = 1;
}

function onEdit(val) {
  showForm.value = val;
}

function onCancel() {
  onReset();
  showForm = false;
}
</script>

<template>
  <h1 style="text-align: center">{{ title }}</h1>
  <Product
    v-for="p in sortedProducts"
    :key="p.id"
    :product="p"
    :quantity="quantity(p.stores)"
    @edit="onEdit"
  ></Product>

  <div>
    <div class="tool-bar">
      <img
        id="img-add-product"
        src="./assets/plus.svg"
        alt="add product"
        title="add product"
        @click="onAdd"
      />
      <img
        id="img-edit-product"
        src="./assets/edit.svg"
        alt="edit product"
        title="edit product"
      />
      <img
        id="img-cancel-product"
        src="./assets/cancel.svg"
        alt="cancel product"
        title="cancel product"
        @click="onCancel"
      />
      <img
        id="img-save-product"
        src="./assets/save.svg"
        alt="save product"
        title="save product"
        @click="onSave"
      />
      <img
        id="img-delete-product"
        src="./assets/delete.svg"
        alt="delete product"
        title="delete product"
        @click="onDelete"
      />
    </div>
    <div v-if="showForm">
      <form>
        <label for="productName">
          Product Name:
          <input
            name="productName"
            title="product name"
            placeholder="Product Name"
            v-model="productName"
          />
        </label>
        <br />
        <label for="productDescription">
          Product Description:
          <textarea
            name="productDescription"
            title="product description"
            placeholder="Product Description"
            v-model="productDescription"
          ></textarea>
        </label>
        <hr />
        <label for="productStore">
          Product Store:
          <input
            name="productStore"
            title="product store"
            placeholder="Product Store"
            v-model="productStoreName"
          />
        </label>
        <br />
        <label for="productQuantity">
          Product Quantity:
          <input
            name="productQuantity"
            title="product quantity"
            placeholder="Product Quantity"
            v-model="productStoreQuantity"
          />
        </label>
        <br />
        <label for="productPrice">
          Product Price:
          <input
            name="productPrice"
            title="product price"
            placeholder="Product Price"
            v-model="productStorePrice"
          />
        </label>
        <br />
      </form>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

form {
  border: solid 1px gray;
  padding: 00.5em;
}

.container {
  margin: 2em auto;
}

.tool-bar {
  display: flex;
  justify-content: space-around;
  height: 50px;
  padding: 1em;
}

.tool-bar img {
  cursor: pointer;
}

.tool-bar img:hover {
  background-color: gray;
}

.tool-bar img.active {
  background-color: yellow;
}
</style>
