<template>
  <div>
    <h1>Grupos</h1>
    <div>
      <myButton type="button"
        title="Adicionar"
        @buttonAction="Add()"
        buttonStyle="success"
        pageLink="groupAdd"
        class="mb-3"
      />
    </div>
    <group-table></group-table>
    <!-- <modal-add></modal-add> -->

    <div>
    </div>
  </div>
</template>

<script>
import GroupTable from "../shared/table/GroupTable.vue";
import Button from "../shared/button/Button.vue";
import ModalAdd from '../shared/button/ModalAdd.vue';

export default {
  components: {
    groupTable: GroupTable,
    myButton: Button,
    ModalAdd,

  },
};
</script>


<style scoped>
</style>