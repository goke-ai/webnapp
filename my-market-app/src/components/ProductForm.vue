<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  product: {},
  showForm: Boolean,
  crudMode: Number,
});

const emit = defineEmits(["added", "edited", "deleted"]);

function onDelete() {
  const model = {
    productId: props.product.productId,
    productName: productName.value.value,
    productDescription: productDescription.value.value,
    productImageUrl: productDescription.value.value,
    productStoreId: props.product.productStoreId,
    productStoreName: productStoreName.value.value,
    productStoreQuantity: productStoreQuantity.value.value,
    productStorePrice: productStorePrice.value.value,
  };

  emit("deleted", model);
}

function onSave() {
  if (props.crudMode == 1) {
    // new product
    const model = {
      productId: 0,
      productName: productName.value.value,
      productDescription: productDescription.value.value,
      productImageUrl: productDescription.value.value,
      productStoreId: 0,
      productStoreName: productStoreName.value.value,
      productStoreQuantity: productStoreQuantity.value.value,
      productStorePrice: productStorePrice.value.value,
    };

    emit("added", model);
  }

  if (props.crudMode == 2) {
    const model = {
      productId: props.product.productId,
      productName: productName.value.value,
      productDescription: productDescription.value.value,
      productImageUrl: productDescription.value.value,
      productStoreId: props.product.productStoreId,
      productStoreName: productStoreName.value.value,
      productStoreQuantity: productStoreQuantity.value.value,
      productStorePrice: productStorePrice.value.value,
    };

    emit("edited", model);
  }
}

var productId = ref(0);
var productName = ref("");
var productDescription = ref("");
var productImageUrl = ref("");
var productStoreId = ref(0);
var productStoreName = ref("");
var productStoreQuantity = ref(0);
var productStorePrice = ref(0);
</script>

<template>
  <form>
    <label for="productName">
      Product Name:
      <input
        type="text"
        ref="productName"
        name="productName"
        title="product name"
        placeholder="Product Name"
        :value="product.productName"
      />
    </label>
    <br />
    <label for="productDescription">
      Product Description:
      <textarea
        ref="productDescription"
        title="product description"
        placeholder="Product Description"
        :value="product.productDescription"
      ></textarea>
    </label>
    <hr />
    <label for="productStore">
      Product Store:
      <input
        ref="productStoreName"
        title="product store"
        placeholder="Product Store"
        :value="product.productStoreName"
      />
    </label>
    <br />
    <label for="productQuantity">
      Product Quantity:
      <input
        ref="productStoreQuantity"
        title="product quantity"
        placeholder="Product Quantity"
        :value="product.productStoreQuantity"
      />
    </label>
    <br />
    <label for="productPrice">
      Product Price:
      <input
        ref="productStorePrice"
        title="product price"
        placeholder="Product Price"
        :value="product.productStorePrice"
      />
    </label>
    <br />
    <div class="tool-bar">
      <img
        id="img-save-product"
        src="../assets/save.svg"
        alt="save product"
        title="save product"
        @click="onSave"
      />
      <img
        id="img-delete-product"
        src="../assets/delete.svg"
        alt="delete product"
        title="delete product"
        @click="onDelete"
      />
    </div>
  </form>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
