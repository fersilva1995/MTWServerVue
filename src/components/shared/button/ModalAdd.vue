<template>
  <div>
    <b-button variant="success" pill @click="$bvModal.show('modal-scoped')">Adicionar</b-button>

    <b-modal id="modal-scoped">
        <template #modal-title="{}">
        <h5>Adicionar Grupo</h5>
        </template>
        
        <template>
            <form>
                <div class="col-2 mb-2">
                    <label for="name">Nome</label>
                    <input type="text"></div>
                <div class="col-2 mb-2">
                    <label for="time">Tempo</label>
                    <input type="text"></div>
            </form>
        </template>

        <template #modal-footer="{ save, cancel }">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" pill variant="success" @submit="save()">Salvar</b-button>
        <b-button size="sm" pill variant="light" @click="cancel()">Voltar</b-button>
        </template>
    </b-modal>
  </div>
</template>

<script>
import Group from '../../../domain/group/Group'

export default {
    data() {
        return {
            group: new Group()
        }
    },

    methods: {
      save() {
          console.log(this.group);
          this.$http
            .post('http://172.16.2.170:83/api/Groups', this.group)
            .then(() => this.group = new Group(), err => console.log(err));
      }
    },
};
</script>

<style scoped>

</style>