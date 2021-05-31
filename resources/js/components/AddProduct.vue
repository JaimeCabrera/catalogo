<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card shadow">
          <div class="card-header">
            <h6 v-if="editMode" class="m-0 font-weight-bold text-primary">
              Editando producto:
              {{ product.name }}
            </h6>
            <h6 v-else class="m-0 font-weight-bold text-primary">
              Agregando producto
            </h6>
          </div>
          <div class="card-body p-4">
            <form>
              <div class="row">
                <div class="col">
                  <div class="form-group ">
                    <label for="inputState">Seleciona la Categoria</label>
                    <select
                      v-if="editMode"
                      id="inputState"
                      v-model="selected"
                      class="form-control"
                    >
                      <option selected disabled>categoria...</option>

                      <option
                        :value="category.id"
                        v-for="(category, index) in categories"
                        :key="index"
                      >
                        {{ category.name }}</option
                      >
                    </select>
                    <select
                      v-else
                      id="inputState"
                      v-model="selected"
                      class="form-control"
                    >
                      <option selected disabled>categoria...</option>
                      <option
                        :value="category.id"
                        v-for="(category, index) in categories"
                        :key="index"
                      >
                        {{ category.name }}</option
                      >
                    </select>
                  </div>
                </div>
                <div class="col">
                  <label>Nombre del producto</label>
                  <input
                    type="text"
                    v-model="product.name"
                    class="form-control"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group">
                    <label for="">Descripcion corta</label>
                    <textarea
                      class="form-control"
                      name=""
                      v-model="product.short_description"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group">
                    <label for="">Descripcion</label>
                    <textarea
                      class="form-control"
                      name=""
                      v-model="product.description"
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col d-flex justify-content-end mt-3">
                  <router-link
                    class="btn btn-outline-danger mx-2"
                    v-bind:to="{ name: 'products' }"
                    >Cancelar</router-link
                  >
                  <button
                    v-if="editMode"
                    class="btn btn-success"
                    @click.prevent="editProduct"
                  >
                    <i class="fas fa-save    "></i> Actualizar informacion
                  </button>
                  <button
                    v-else
                    class="btn btn-success"
                    @click.prevent="addNewProduct"
                  >
                    <i class="fas fa-save    "></i> Guardar producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      product: {},
      categories: [],
      selected: "",
      editMode: null,
      productId: ""
    };
  },
  mounted() {
    if (this.$route.params.product) {
      this.editMode = true;
      this.product = this.$route.params.product;
      this.productId = this.product.id;
      console.log("editando el prod", this.productId);
      this.selected = this.product.category_id;
    } else {
      if (this.$route.name === "products-edit") {
        this.$router.push({ name: "products" });
      }
    }
    //  this.editMode = this.$route.params.product;
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios
        .get("/categories")
        .then(res => {
          this.categories = res.data.categories;
        })
        .catch(e => {
          console.log(e);
        });
    },
    addNewProduct() {
      const params = { ...this.product, category_id: this.selected };
      axios
        .post("/products", params)
        .then(res => {
          if (res.data.ok) {
            this.product = {};
            this.$router.push({ name: "products" });
            this.editMode = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    editProduct() {
      const params = { ...this.product, category_id: this.selected };
      axios
        .put(`/products/${this.productId}`, params)
        .then(res => {
          if (res.data.ok) {
            this.product = {};
            this.$router.push({ name: "products" });
            this.editMode = false;
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style></style>
