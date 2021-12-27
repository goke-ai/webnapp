const marketApp = {
  data() {
    return {
      title: "My Market App",
      showForm: false,
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
      currentStore: { productId: 0, id: -1, name: "", quantity: 0, price: 0 },
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
      // sum
      return stores.reduce((T, q) => T + q.quantity, 0.0);
    },

    unitPrice(store) {
      return store.price / store.quantity;
    },

    sortedStores(stores) {
      return stores.sort((a, b) => this.unitPrice(a) - this.unitPrice(b));
    },

    cheapestStores(stores) {
      return this.sortedStores(stores); //.slice(0, 2);
    },

    onIncrement(product) {
      store = this.cheapestStores(product.stores)[0];
      store.quantity++;
    },

    onDecrement(product) {
      store = this.cheapestStores(product.stores)[0];
      store.quantity--;
    },

    onReset() {
      this.crudMode = 0;

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
      this.showForm = true;
    },

    onEdit(product, storeId) {
      this.crudMode = 2;
      this.showForm = true;

      this.productId = product.id;
      this.productName = product.name;
      this.productDescription = product.description;
      this.productImageUrl = product.imageUrl;

      const store = product.stores.find((f) => f.id == storeId);
      this.productStoreId = store.id;
      this.productStoreName = store.name;
      this.productStoreQuantity = store.quantity;
      this.productStorePrice = store.price;
    },

    onCancel() {
      this.onReset();
      this.showForm = false;
    },

    onDelete() {
      this.crudMode = 3;

      // 
      const product = this.products.find(f => f.id == this.productId);

      const store = product.stores.find((f) => f.id == this.productStoreId);
      var idx = product.stores.indexOf(store);

      product.stores.splice(idx, 1);     


      this.onReset();
      this.showForm = false;
    },

    onSave() {
      if (this.crudMode == 1) {
        // new product
        const product = {
          id: 0,
          name: this.productName,
          description: this.productDescription,
          imageUrl:
            "./images/" +
            this.productName.replace(" ", "_").toLowerCase() +
            ".jpg",
          stores: [
            {
              id: 0,
              name: this.productStoreName,
              quantity: parseInt(this.productStoreQuantity),
              price: parseFloat(this.productStorePrice),
            },
          ],
        };

        // get all stores
        const allStores = [];
        for (const p of this.products) {
          for (const s of p.stores) {
            if (allStores.some((x) => x.name === s.name)) {
              continue;
            }
            allStores.push(s);
          }
        }

        // fix store id
        const s = allStores.find((f) => f.name == this.productStoreName);
        if (s !== undefined) {
          product.stores[0].id = s.id;
        } else {
          product.stores[0].id = allStores.length + 1;
        }

        // fix product id
        // product exist
        const p = this.products.find((f) => f.name === this.productName);
        if (p === undefined) {
          product.id = this.products.length + 1;
          this.products.push(product);
        } else {
          product.id = p.id;
          p.stores.push(product.stores[0]);
        }
      }

      if (this.crudMode == 2) {
        var p = this.products.find((f) => f.id == this.productId);
        p.name = this.productName;
        p.description = this.productDescription;

        const s = p.stores.find((f) => f.id == this.productStoreId);
        s.id = this.productStoreId;
        s.name = this.productStoreName;
        s.quantity = parseInt(this.productStoreQuantity);
        s.price = parseFloat(this.productStorePrice);
      }

      this.onReset();
      this.showForm = false;
    },
  },
};

Vue.createApp(marketApp).mount("#app");
