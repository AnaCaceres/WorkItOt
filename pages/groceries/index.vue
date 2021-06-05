<template>
  <div class="groceries">
    <h2>Groceries List</h2>
    <ul class="list">
      <li class="d-none d-md-flex input-group mb-3">
        <input
          id="newItemDesktop"
          v-model="newItem"
          type="text"
          class="form-control"
          placeholder="New item"
          aria-label="NewItem"
        />
        <input
          id="newItemQuantityDesktop"
          v-model="newItemQuantity"
          type="text"
          class="form-control"
          placeholder="Quantity"
          aria-label="newItemQuantity"
        />
        <button
          id="button-addon"
          class="btn btn-outline-info"
          type="button"
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
        />
        <input
          id="newItemQuantity"
          v-model="newItemQuantity"
          type="text"
          class="form-control mb-2"
          placeholder="Quantity"
          aria-label="newItemQuantity"
        />
        <button
          id="button-addon"
          class="btn btn-outline-info"
          type="button"
          @click="addItem"
        >
          Add
        </button>
      </li>
      <li class="d-flex justify-content-end">
        <button
          id="button-addon"
          class="btn btn-info text-white"
          type="button"
          @click="deleteItems"
        >
          <font-awesome-icon :icon="['fas', 'trash-alt']" class="trash me-2" />
          Delete checked items
        </button>
      </li>
      <li>
        <h4 class="text-decoration-underline">List</h4>
      </li>
      <li v-for="(item, i) in list" :key="i" class="items">
        <input
          :id="'flexCheckDefault' + i"
          class="form-check-input me-2"
          type="checkbox"
          value=""
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
      const newItem = {
        userID: this.$fire.auth.currentUser.uid,
        item: this.newItem,
        quantity: this.newItemQuantity,
        bought: false,
      }
      this.$fire.firestore.collection('groceries').add(newItem)
      this.newItemQuantity = ''
      this.newItem = ''
      this.list.unshift(newItem)
    },
    deleteItems() {
      const currentList = [...this.list]
      currentList.forEach((item) => {
        if (item.bought === true) this.list.splice(this.list.indexOf(item), 1)
      })
      this.$fire.firestore
        .collection('groceries')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .where('bought', '==', true)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.$fire.firestore.collection('groceries').doc(doc.id).delete()
          })
        })
    },
    updateItem(item) {
      let isBought = null
      this.list[this.list.indexOf(item)].bought === true
        ? (isBought = false)
        : (isBought = true)
      this.list[this.list.indexOf(item)].bought = isBought
      const updatedItem = {
        ...item,
        bought: isBought,
      }
      this.$fire.firestore
        .collection('groceries')
        .doc(item.docId)
        .set(updatedItem)
    },
    update() {
      this.list = []
      this.$fire.firestore
        .collection('groceries')
        .where('userID', '==', this.$fire.auth.currentUser.uid)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            this.list.unshift({
              docId: doc.id,
              ...doc.data(),
            })
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
      &.items {
        display: flex;
      }
      .btn-info {
        background-color: #006e80 !important;
      }
      .btn-outline-info {
        border-color: #006e80 !important;
        color: #006e80 !important;
        &:hover {
          background-color: #006e80 !important;
          color: white !important;
        }
      }
      .trash {
        color: white;
      }
      .line-through {
        text-decoration: line-through;
      }
      .form-check-input {
        flex-shrink: 0;
      }
      .form-check-label {
        width: 90%;
        display: inline;
        word-wrap: break-word;
      }
    }
  }
}
</style>
