<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejproducts[0].stores[0].org/api/sfc-script-setuproducts[0].html#sfc-script-setup

import { ref, computed } from "vue";
import Product from "./components/Product.vue";
import ProductForm from "./components/ProductForm.vue";

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

const products = ref([
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
]);

const sortedProducts = computed(() => {
  return products.value.sort((a, b) => quantity(b.stores) - quantity(a.stores));
});

const isAdding = computed(() => {
  return { active: crudMode.value == 1 };
});

const isEditing = computed(() => {
  return {
    active: crudMode.value == 2,
  };
});

function quantity(stores) {
  // sum
  return stores.reduce((T, q) => T + q.quantity, 0.0);
}

function unitPrice(store) {
  return store.price / store.quantity;
}

function sortedStores(stores) {
  return stores.sort((a, b) => unitPrice(a) - unitPrice(b));
}

function cheapestStores(stores) {
  return sortedStores(stores); //.slice(0, 2);
}

function onIncrement(product) {
  const store = cheapestStores(product.stores)[0];
  store.quantity++;
}

function onDecrement(product) {
  const store = cheapestStores(product.stores)[0];
  store.quantity--;
}

function onReset() {
  crudMode.value = 0;

  productId.value = 0;
  productName.value = "";
  productDescription.value = "";
  productImageUrl.value = "";
  productStoreId.value = 0;
  productStoreName.value = "";
  productStoreQuantity.value = 0;
  productStorePrice.value = 0;
}

function onAdd() {
  showForm.value = true;
  onReset();
  crudMode.value = 1;
}

function onEdit(product, storeId, showform) {
  crudMode.value = 2;

  showForm.value = showform;

  productId.value = product.id;
  productName.value = product.name;
  productDescription.value = product.description;
  productImageUrl.value = product.imageUrl;

  const store = product.stores.find((f) => f.id == storeId);
  productStoreId.value = store.id;
  productStoreName.value = store.name;
  productStoreQuantity.value = store.quantity;
  productStorePrice.value = store.price;
}

function onCancel() {
  onReset();
  showForm.value = false;
}

function onDelete() {
  crudMode.value = 3;

  //
  const product = products.value.find((f) => f.id == productId.value);

  const store = product.stores.find((f) => f.id == productStoreId.value);
  var idx = product.stores.indexOf(store);

  product.stores.splice(idx, 1);

  onReset();
  showForm = false;
}

function onSave() {
  if (crudMode.value == 1) {
    // new product
    const product = {
      id: 0,
      name: productName.value,
      description: productDescription.value,
      imageUrl:
        "./src/assets/" +
        productName.value.replace(" ", "_").toLowerCase() +
        ".jpg",
      stores: [
        {
          id: 0,
          name: productStoreName.value,
          quantity: parseInt(productStoreQuantity.value),
          price: parseFloat(productStorePrice.value),
        },
      ],
    };

    // get all stores
    const allStores = [];
    for (const p of products.value) {
      for (const s of p.stores) {
        if (allStores.some((x) => x.name === s.name)) {
          continue;
        }
        allStores.push(s);
      }
    }

    // fix store id
    const s = allStores.find((f) => f.name == productStoreName.value);
    if (s !== undefined) {
      product.stores[0].id = s.id;
    } else {
      product.stores[0].id = allStores.length + 1;
    }

    // fix product id
    // product exist
    const p = products.value.find((f) => f.name === productName.value);
    if (p === undefined) {
      product.id = products.value.length + 1;
      products.value.push(product);
    } else {
      product.id = p.id;
      p.stores.push(product.stores[0]);
    }
  }

  if (crudMode.value == 2) {
    var p = products.value.find((f) => f.id == productId.value);
    p.name = productName.value;
    p.description = productDescription.value;

    const s = p.stores.find((f) => f.id == productStoreId.value);
    s.id = productStoreId.value;
    s.name = productStoreName.value;
    s.quantity = parseInt(productStoreQuantity.value);
    s.price = parseFloat(productStorePrice.value);
  }

  onReset();
  showForm.value = false;
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
    @increment="onIncrement"
    @decrement="onDecrement"
  ></Product>

  <ProductForm
    :productId="productId"
    :productName="productName"
    :productDescription="productDescription"
    :productImageUrl="productImageUrl"
    :productStoreId="productStoreId"
    :productStoreName="productStoreName"
    :productStoreQuantity="productStoreQuantity"
    :productStorePrice="productStorePrice"
  ></ProductForm>
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
