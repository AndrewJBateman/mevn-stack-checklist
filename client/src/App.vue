<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Checklist Items:</h1>
    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          v-model="description"
          type="text"
          placeholder="Add an item"
        />
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" :disabled="!description"
          >Add</a
        >
      </div>
    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input
          class="column input"
          v-if="isSelected(item)"
          v-model="editedDescription"
        />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1 }}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ? unselect() : select(item)"
          >
            <i class="material-icons">{{
              isSelected(item) ? "close" : "edit"
            }}</i>
          </span>

          <span
            class="icon has-text-info"
            @click="
              isSelected(item) ? updateItem(item, i) : removeItem(item, i)
            "
          >
            <i class="material-icons">{{
              isSelected(item) ? "save" : "delete"
            }}</i>
          </span>
        </div>
      </div>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view /> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {},
    };
  },
  async mounted() {
    const response = await axios.get("api/checklistItems/");
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post("api/checklistItems/", {
        description: this.description,
      });
      this.items.push(response.data);
      this.description = "";
    },
    async removeItem(item, i) {
      await axios.delete("api/checklistItems/" + item._id);
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      const response = await axios.put("api/checklistItems/" + item._id, {
        description: this.editedDescription
      });
      this.items[i] = response.data;
      this.unselect();
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
