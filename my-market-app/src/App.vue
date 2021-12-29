<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejproducts[0].stores[0].org/api/sfc-script-setuproducts[0].html#sfc-script-setup

import { ref, computed } from "vue";
import ProductList from "./components/ProductList.vue";
import ProductForm from "./components/ProductForm.vue";

const title = "My Market App";

const productModel = ref({
  productId: 0,
  productName: "",
  productDescription: "",
  productImageUrl: "",
  productStoreId: 0,
  productStoreName: "",
  productStoreQuantity: 0,
  productStorePrice: 0,
});

const showForm = ref(false);
const crudMode = ref(0);

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
  return { active: crudMode.value == 2 };
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

function onEdit(product, storeId, showform) {
  crudMode.value = 2;

  showForm.value = showform;

  const store = product.stores.find((f) => f.id == storeId);

  productModel.value = {
    productId: product.id,
    productName: product.name,
    productDescription: product.description,
    productImageUrl: product.imageUrl,

    productStoreId: store.id,
    productStoreName: store.name,
    productStoreQuantity: store.quantity,
    productStorePrice: store.price,
  };
}

const onReset = () => {
  crudMode.value = 0;

  productModel.value = {
    productId: 0,
    productName: "",
    productDescription: "",
    productImageUrl: "",

    productStoreId: 0,
    productStoreName: "",
    productStoreQuantity: 0,
    productStorePrice: 0.0,
  };
};

function onAdd() {
  onReset();
  showForm.value = true;
  crudMode.value = 1;
}

function onCancel() {
  onReset();
  showForm.value = false;
}

function onEdited(formModel) {
  showForm.value = false;
  crudMode.value = 0;
  var p = products.value.find((f) => f.id == formModel.productId);
  p.name = formModel.productName;
  p.description = formModel.productDescription;

  const s = p.stores.find((f) => f.id == formModel.productStoreId);
  s.id = formModel.productStoreId;
  s.name = formModel.productStoreName;
  s.quantity = parseInt(formModel.productStoreQuantity);
  s.price = parseFloat(formModel.productStorePrice);
}

function onAdded(formModel) {
  showForm.value = false;
  crudMode.value = 0;

  const product = {
    id: 0,
    name: formModel.productName,
    description: formModel.productDescription,
    imageUrl:
      "./src/assets/" +
      formModel.productName.replace(" ", "_").toLowerCase() +
      ".jpg",
    stores: [
      {
        id: 0,
        name: formModel.productStoreName,
        quantity: parseInt(formModel.productStoreQuantity),
        price: parseFloat(formModel.productStorePrice),
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
  const s = allStores.find((f) => f.name == formModel.productStoreName);
  if (s !== undefined) {
    product.stores[0].id = s.id;
  } else {
    product.stores[0].id = allStores.length + 1;
  }

  // fix product id
  // product exist
  const p = products.value.find((f) => f.name === formModel.productName);
  if (p === undefined) {
    product.id = products.value.length + 1;
    products.value.push(product);
  } else {
    product.id = p.id;
    p.stores.push(product.stores[0]);
  }
}

function onDeleted(formModel) {
  //
  const product = products.value.find((f) => f.id == formModel.productId);

  const store = product.stores.find((f) => f.id == formModel.productStoreId);
  var idx = product.stores.indexOf(store);

  product.stores.splice(idx, 1);

  onReset();
  showForm.value = false;
}

function onOverlayOff() {
  showForm.value = false;
  console.log("onOverlayOff");
  onReset();
}
</script>

<template>
  <h1 style="text-align: center">{{ title }}</h1>
  <ProductList
    v-for="p in sortedProducts"
    :key="p.id"
    :product="p"
    :quantity="quantity(p.stores)"
    @edit="onEdit"
    @increment="onIncrement"
    @decrement="onDecrement"
  ></ProductList>

  <div>
    <div class="tool-bar">
      <img
        id="img-add-product"
        src="./assets/plus.svg"
        alt="add product"
        title="add product"
        @click="onAdd"
        :class="isAdding"
      />
      <img
        id="img-edit-product"
        src="./assets/edit.svg"
        alt="edit product"
        title="edit product"
        :class="isEditing"
      />
      <img
        id="img-cancel-product"
        src="./assets/cancel.svg"
        alt="cancel product"
        title="cancel product"
        @click="onCancel"
      />
    </div>

    <div
      class="overlay"
      :class="{ 'overlay-on': showForm }"
      @click.self="onOverlayOff"
    >
      <div class="overlay-content">
        <ProductForm
          :showForm="showForm"
          :crud-mode="crudMode"
          :model="productModel"
          :products="products"
          @edited="onEdited"
          @added="onAdded"
          @deleted="onDeleted"
        ></ProductForm>
      </div>
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

.overlay {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.overlay-on {
  display: block; /* Hidden by default */
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
