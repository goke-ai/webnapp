<script setup>
import { ref, computed } from "vue";

const file = ref(null)

        // const handleFileUpload = async() => {
           // debugger;
           // console.log("selected file",file.value.files)
            //Upload to server
        // }

// for the <input> tags
const productId = ref(0);
const productName = ref("");
const productDescription = ref("");
const productImageUrl = ref("");
const productStoreId = ref(0);
const productStoreName = ref("");
const productStoreQuantity = ref(0);
const productStorePrice = ref(0);

const props = defineProps({
  model: {},
  showForm: {
    type: Boolean,
    default: false,
  },
  crudMode: Number,
});

const emit = defineEmits(["added", "edited", "deleted"]);

function onDelete() {
  const formModel = {
    productId: props.model.productId,
    productName: productName.value.value,
    productDescription: productDescription.value.value,
    productImageUrl: productDescription.value.value,
    productStoreId: props.model.productStoreId,
    productStoreName: productStoreName.value.value,
    productStoreQuantity: productStoreQuantity.value.value,
    productStorePrice: productStorePrice.value.value,
  };

  emit("deleted", formModel);
}

function onSave() {
  if (props.crudMode == 1) {
    // new product
    const formModel = {
      productId: 0,
      productName: productName.value.value,
      productDescription: productDescription.value.value,
      productImageUrl: productDescription.value.value,
      productStoreId: 0,
      productStoreName: productStoreName.value.value,
      productStoreQuantity: productStoreQuantity.value.value,
      productStorePrice: productStorePrice.value.value,
    };

    emit("added", formModel);
  }

  if (props.crudMode == 2) {
    const formModel = {
      productId: props.model.productId,
      productName: productName.value.value,
      productDescription: productDescription.value.value,
      productImageUrl: productDescription.value.value,
      productStoreId: props.model.productStoreId,
      productStoreName: productStoreName.value.value,
      productStoreQuantity: productStoreQuantity.value.value,
      productStorePrice: productStorePrice.value.value,
    };

    emit("edited", formModel);
  }
}
</script>

<template>
  <form>
    <div>
      <label>File
        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"/>
      </label>
        <!-- <button v-on:click="submitForm()">Upload</button> -->
    </div>
    <br />
    <label for="productName">
      Product Name:
      <input
        type="text"
        ref="productName"
        name="productName"
        title="product name"
        placeholder="Product Name"
        :value="model.productName"
      />
    </label>
    <br />
    <label for="productDescription">
      Product Description:
      <textarea
        ref="productDescription"
        title="product description"
        placeholder="Product Description"
        :value="model.productDescription"
      ></textarea>
    </label>
    <hr />
    <label for="productStore">
      Product Store:
      <input
        ref="productStoreName"
        title="product store"
        placeholder="Product Store"
        :value="model.productStoreName"
      />
    </label>
    <br />
    <label for="productQuantity">
      Product Quantity:
      <input
        ref="productStoreQuantity"
        title="product quantity"
        placeholder="Product Quantity"
        :value="model.productStoreQuantity"
      />
    </label>
    <br />
    <label for="productPrice">
      Product Price:
      <input
        ref="productStorePrice"
        title="product price"
        placeholder="Product Price"
        :value="model.productStorePrice"
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

form {
  border: solid 1px rgba(0, 0, 0, 0.8);
  padding: 0.5em;
  color: white;
  background-color: rgba(150, 150, 150, 0.7);
}

form img {
  background-color: violet;
}

form img:hover {
  background-color: lime;
}
</style>
