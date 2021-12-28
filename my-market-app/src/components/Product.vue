<script setup>
import { ref } from "vue";

defineProps({
  product: {},
  quantity: Number,
});

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
  emit("increment", product);
}

function onDecrement(product) {
  emit("decrement", product);
}

function onEdit(product, storeId) {
  emit("edit", product, storeId, true);
}

const emit = defineEmits(["edit", "delete", "increment", "decrement"]);
</script>

<template>
  <div class="card">
    <div class="product-image">
      <img
        v-bind:src="product.imageUrl"
        alt="product image"
        title="product image: click to add new purchase"
      />
    </div>
    <div class="product-text">
      <div title="product name: click to add new purchase">
        {{ product.name }}
      </div>
      <div title="product description: click to add new purchase">
        {{ product.description }}
      </div>
    </div>
    <div class="product-quantity">
      <div title="increment product quantity">
        <img @click="onIncrement(product)" src="../assets/plus.svg" alt="increment" />
      </div>
      <div title="product quantity">{{ quantity }}</div>
      <div title="decrement product quantity">
        <img
          @click="onDecrement(product)"
          src="../assets/minus.svg"
          alt="decrement"
        />
      </div>
    </div>
    <div class="product-store" title="product stores">
      <ul>
        <li
          v-for="s in cheapestStores(product.stores)"
          :key="s.id"
          @click="onEdit(product, s.id)"
          title="store name | quantity | price: click to edit purchase"
        >
          {{ s.name }} | {{ s.quantity }} | {{ s.price }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

.card {
  display: flex;
  gap: 0.5em;
  align-items: center;
  border: solid 2px blueviolet;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 10px;
  background-color: darkviolet;
  color: white;
}

.card img {
  width: 100px;
  height: 100px;
}

.card > div:nth-child(2) {
  flex-basis: 250px;
}

.card > div:nth-child(2) > :first-child {
  font-size: 1.1em;
}

.card > div:nth-child(2) > div:nth-child(2) {
  border-top: solid 1px wheat;
  margin-top: 0.5em;
  font-size: 0.8em;
  font-style: italic;
  color: rgb(197, 197, 43);
}

.card > div:nth-child(3) {
  text-align: center;
  flex-basis: 100px;
}

.card > div:nth-child(3) img {
  width: 2em;
  height: 2em;
}

.card ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.card > div:nth-child(4) ul li {
  cursor: pointer;
  padding: 0.2em 0;
}

.card > div:nth-child(4) ul li:hover {
  background-color: yellow;
  color: blueviolet;
}

@media screen and (min-width: 600px) {
  .container {
    width: 720px;
  }
}

@media screen and (max-width: 600px) {
  .card {
    flex-direction: column;
  }
  .card > div:nth-child(2),
  .card > div:nth-child(3) {
    flex-basis: 0px;
    text-align: center;
  }
}
</style>
