<template>
  <div>
    <h1>Adicionar Grupo</h1>
    <h2>{{ group.nome }}</h2>

    <form @submit="save()" class="formAdd">
      <div class="control">
        <label for="name">Nome</label>
        <input id="name" autocomplete="off" v-model.lazy="group.nome" />
      </div>

      <div class="control">
        <label for="time">Tempo</label>
        <input id="time" autocomplete="off" v-model.lazy="group.time" />
      </div>

      <b-form-group
        label="Equipamentos Disponíveis:"
        v-slot="{ ariaDescribedby }"
      >
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
          stacked
        >
        </b-form-checkbox-group>
        <div>
          Equipamentos: <strong>{{ selected }}</strong>
        </div>
      </b-form-group>
    </form>

    <div class="btnArea">
      <myButton type="submit" title="Salvar" buttonStyle="success" />
      <myButton
        type="button"
        title="Voltar"
        buttonStyle="light"
        pageLink="/group"
      />
    </div>
  </div>
</template>


<script>
import Button from "../shared/button/Button.vue";
import Group from "../../domain/group/Group";

export default {
  components: {
    myButton: Button,
  },

  data() {
    return {
      group: new Group(),
      selected: [],
      options: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
        { text: "4", value: "4" },
      ],
    };
  },

  methods: {
    save() {
      console.log(this.group);
      this.$http
        .post("http://172.16.2.170:83/api/Groups", this.group)
        .then(() => (this.group = new Group()), (err) => console.log(err));
    }
  }
};
</script>


<style scoped>
.formAdd {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.control,
.btnArea {
  font-size: 1.1em;
  margin-bottom: 20px;
}

.control label {
  font-weight: 500;
  letter-spacing: 1px;
}

.control label + input,
.control textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.btnArea {
  display: flex;
  justify-content: flex-start;
  width: 700px;
}
</style>