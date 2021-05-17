<template>
  <div class="modal " tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-info text-white">
          <h6 class="modal-title">
            <i class="fas fa-plus    "></i> Crear Categoria
          </h6>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for=""></label>
              <input
                type="text"
                class="form-control"
                name="name"
                v-model="category.name"
                aria-describedby="helpId"
                placeholder="Escriba el nombre de la categoría"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-dismiss="modal"
          >
            <i class="fas fa-times    "></i> Cerrar
          </button>
          <button type="button" class="btn btn-success" @click="addNewCategory">
            <i class="fas fa-save    "></i> Guardar
          </button>
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
      category: {}
    };
  },
  mounted() {
    console.log("modal mounted");
  },
  methods: {
    async addNewCategory() {
      await axios
        .post("http://localhost:8080/", this.category)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
      // console.log("click", params);
    }
  }
};
</script>

<style></style>
