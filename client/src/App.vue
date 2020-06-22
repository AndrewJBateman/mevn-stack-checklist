<template>
  <div id="app">
    <!--toolbar-->
    <v-toolbar color="#E8EAF6">
      <v-toolbar-title>Checklist Items</v-toolbar-title>
      <v-spacer></v-spacer>

      <i class="material-icons">add</i>
    </v-toolbar>
    <v-card class="mx-auto" max-width="700">
      <!--Add items-->

      <!--List of items shown in v-cards-->
      <v-container fluid>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input
              class="input"
              v-model="description"
              type="text"
              placeholder="Checklist item description..."
              max-width="650"
            />
          </div>
          <div class="control">
            <a class="button is-info" @click="addItem" :disabled="!description"
              ><i class="material-icons">note_add</i></a
            >
          </div>
        </div>
        <v-col v-for="(item, i) in items" :key="item._id">
          <v-card class="mx-auto">
            <v-card-text>
              <!--list item-->
              <div class="columns">
                <!--column 1-->
                <input
                  class="column input"
                  v-if="isSelected(item)"
                  v-model="editedDescription"
                />
                <p v-else class="column">
                  <!-- <span class="tag is-dark">{{ i + 1 }}</span> -->
                  {{ item.description }}
                </p>
                <!--column 2-->
                <div class="column is-narrow">
                  <span
                    class="icon has-text-link"
                    @click="isSelected(item) ? unselect() : select(item)"
                  >
                    <i class="material-icons">{{
                      isSelected(item) ? "close" : "edit"
                    }}</i>
                  </span>

                  <span
                    class="icon has-text-danger"
                    @click="
                      isSelected(item)
                        ? updateItem(item, i)
                        : removeItem(item, i)
                    "
                  >
                    <i class="material-icons">{{
                      isSelected(item) ? "save" : "delete_forever"
                    }}</i>
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
          <!--end of list item-->
        </v-col>
      </v-container>
    </v-card>
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
      selected: {}
    };
  },
  async mounted() {
    const response = await axios.get("api/checklistItems/");
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await axios.post("api/checklistItems/", {
        description: this.description
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
    }
  }
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
</style>
