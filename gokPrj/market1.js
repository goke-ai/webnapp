const marketApp = {
  data() {
    return {
      title: "My Market App",

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

  methods: {
    quantity(stores) {
      // sum quantity
      // var T = 0;
      // for (const s of stores) {
      //   T += s.quantity;
      // }
      // return T;

      return stores.reduce((T, s) => T + s.quantity, 0);

    },
  },
};

Vue.createApp(marketApp).mount("#app");
