<template>
  <div class="groceries">
    <h2>Goceries List</h2>
    <ul class="list">
      <li class="d-none d-md-flex input-group mb-3">
        <input
          id="newItemDesktop"
          v-model="newItem"
          type="text"
          class="form-control"
          placeholder="New item"
          aria-label="NewItem"
          aria-describedby="button-addon"
        />
        <input
          id="newItemQuantityDesktop"
          v-model="newItemQuantity"
          type="text"
          class="form-control"
          placeholder="Quantity"
          aria-label="newItemQuantity"
          aria-describedby="button-addon"
        />
        <button
          class="btn btn-outline-info"
          type="button"
          id="button-addon"
          @click="addItem"
        >
          Add
        </button>
      </li>
      <li class="d-md-none mb-3">
        <input
          id="newItem"
          v-model="newItem"
          type="text"
          class="form-control mb-2"
          placeholder="New item"
          aria-label="NewItem"
          aria-describedby="button-addon"
        />
        <input
          id="newItemQuantity"
          v-model="newItemQuantity"
          type="text"
          class="form-control mb-2"
          placeholder="Quantity"
          aria-label="newItemQuantity"
          aria-describedby="button-addon"
        />
        <button
          class="btn btn-outline-info"
          type="button"
          id="button-addon"
          @click="addItem"
        >
          Add
        </button>
      </li>
      <li v-for="(item, i) in list" :key="i">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          :id="'flexCheckDefault' + i"
          :checked="item.bought"
          @click="updateItem(item)"
        />
        <label
          class="form-check-label"
          for="flexCheckDefault"
          :class="{ 'line-through': item.bought }"
        >
          {{ item.item }} - {{ item.quantity }}
        </label>
        <font-awesome-icon
          :icon="['fas', 'trash-alt']"
          class="trash mx-2"
          @click="deleteItem(item)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data: () => ({
    list: [],
    newItem: '',
    newItemQuantity: '',
  }),
  created() {
    this.update()
  },
  methods: {
    addItem() {
      this.$fire.firestore.collection('groceries').add({
        userID: this.$fire.auth.currentUser.uid,
        item: this.newItem,
        quantity: this.newItemQuantity,
        bought: false,
      })
      this.newItemQuantity = ''
      this.newItem = ''
      this.update()
    },
    deleteItem(item) {
      this.$fire.firestore
        .collection('groceries')
        .where('userID', '==', item.userID)
        .where('item', '==', item.item)
        .where('quantity', '==', item.quantity)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.$fire.firestore
              .collection('groceries')
              .doc(doc.id)
              .delete()
              .then(this.update())
          })
        })
    },
    updateItem(item) {
      this.$fire.firestore
        .collection('groceries')
        .where('userID', '==', item.userID)
        .where('item', '==', item.item)
        .where('quantity', '==', item.quantity)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.$fire.firestore
              .collection('groceries')
              .doc(doc.id)
              .set(
                {
                  bought: !doc.data().bought,
                },
                { merge: true }
              )
              .then(this.update())
          })
        })
    },
    update() {
      this.list = []
      this.$fire.firestore
        .collection('groceries')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.list.push(doc.data())
          })
        })
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200&family=Nunito+Sans:wght@300&family=Staatliches&family=Teko:wght@300&display=swap');

.groceries {
  font-family: 'Karla', sans-serif;
  overflow-y: auto;
  width: 100%;
  padding: 24px;
  .list {
    padding: 0;
    li {
      padding: 4px 0;
      list-style-type: none;
      .btn-outline-info {
        border-color: #17a2b8 !important;
        color: #17a2b8 !important;
        &:hover {
          background-color: #17a2b8 !important;
          color: white !important;
        }
      }
      .trash {
        cursor: pointer;
        color: #17a2b8 !important;
      }
      .line-through {
        text-decoration: line-through;
      }
    }
  }
}
</style>
