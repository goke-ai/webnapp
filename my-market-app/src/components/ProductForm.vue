<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
  productId: Number,
  productName: String,
  productDescription: String,
  productImageUrl: String,
  productStoreId: Number,
  productStoreName: String,
  productStoreQuantity: Number,
  productStorePrice: Number,
});

// const productId = ref(0);
// // const productName = ref("");
// const productDescription = ref("");
// const productImageUrl = ref("");
// const productStoreId = ref(0);
// const productStoreName = ref("");
// const productStoreQuantity = ref(0);
// const productStorePrice = ref(0);
</script>

<template>
  <div>
    <div class="tool-bar">
      <img
        id="img-add-product"
        src="../assets/plus.svg"
        alt="add product"
        title="add product"
        @click="onAdd"
        :class="isAdding"
      />
      <img
        id="img-edit-product"
        src="../assets/edit.svg"
        alt="edit product"
        title="edit product"
        :class="isEditing"
      />
      <img
        id="img-cancel-product"
        src="../assets/cancel.svg"
        alt="cancel product"
        title="cancel product"
        @click="onCancel"
      />
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

<style scoped>
a {
  color: #42b983;
}
</style>
