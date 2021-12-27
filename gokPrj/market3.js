const marketApp = {
  data() {
    return {
      title: "My Market App",
      crudMode: 0,
      productId: 0,
      productName: "",
      productDescription: "",
      productImageUrl: "",
      productStoreId: 0,
      productStoreName: "",
      productStoreQuantity: 0,
      productStorePrice: 0,
      products: [
        {
          id: 1,
          name: "Milo 250",
          description: "Beverage drink",
          imageUrl: "./images/milo.jpg",
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
          imageUrl: "./images/pineapple.jpg",
          stores: [
            { id: 1, name: "Store 1", quantity: 2, price: 10.0 },
            { id: 2, name: "Store 2", quantity: 2.5, price: 10.0 },
          ],
        },
        {
          id: 3,
          name: "Plate",
          description: "Ceramic flat plate for serving food",
          imageUrl: "./images/plate.jpg",
          stores: [
            { id: 1, name: "Store 1", quantity: 1, price: 10.0 },
            { id: 2, name: "Store 2", quantity: 2, price: 10.0 },
            { id: 3, name: "Store 3", quantity: 3, price: 10.0 },
          ],
        },
      ],
    };
  },

  computed: {
    sortedProducts() {
      return this.products.sort(
        (a, b) => this.quantity(b.stores) - this.quantity(a.stores)
      );
    },
    isAdding() {
      return {
        active: this.crudMode == 1,
      };
    },
    isEditing() {
      return {
        active: this.crudMode == 2,
      };
    },
  },

  methods: {
    quantity(stores) {
      return stores.reduce((T, s) => T + s.quantity, 0);
    },

    unitPrice(store) {
      return store.price / store.quantity;
    },

    sortedStores(stores) {
      return stores.sort((a, b) => this.unitPrice(b) - this.unitPrice(a));
    },

    cheapestStores(stores) {
      return this.sortedStores(stores).slice(0, 2);
    },

    onReset() {
      this.productId = 0;
      this.productName = "";
      this.productDescription = "";
      this.productImageUrl = "";
      this.productStoreId = 0;
      this.productStoreName = "";
      this.productStoreQuantity = 0;
      this.productStorePrice = 0;
    },

    onAdd() {
      this.onReset();
      this.crudMode = 1;
    },

    onEdit(product, storeId) {
      this.crudMode = 2;

      this.productId = product.id;
      this.productName = product.name;
      this.productDescription = product.description;
      this.productImageUrl = product.imageUrl;

      store = product.stores.find((f) => f.id == storeId);
      this.productStoreId = store.id;
      this.productStoreName = store.name;
      this.productStoreQuantity = store.quantity;
      this.productStorePrice = store.price;
    },

    onCancel() {
      this.crudMode = 0;
      this.onReset();
    },

    onDelete() {
      this.crudMode = 0;
      this.onReset();
    },

    onSave() {
      this.crudMode = 0;
      this.onReset();
    },
  },
};

Vue.createApp(marketApp).mount("#app");
