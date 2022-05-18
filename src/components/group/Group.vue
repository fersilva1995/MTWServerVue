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
    <dataTable :items="items" :fields="fields" selectedComponent="Group">
    </dataTable>
    <!-- <<group-table></group-table>-->
    <!-- <modal-add></modal-add> -->

    <div>
    </div>
  </div>
</template>

<script>
import GroupTable from "../shared/table/GroupTable.vue";
import Table from "../shared/table/Table.vue";
import Button from "../shared/button/Button.vue";
import ModalAdd from '../shared/button/ModalAdd.vue';
import Service from '../../domain/group/GroupService';
import Group from '../../domain/group/Group';
import { groupHeader } from "../../domain/group/GroupHeader"

export default {

  components: {
    dataTable: Table,
    groupTable: GroupTable,
    myButton: Button,
    ModalAdd,

  },

  data() {
    return {
          group: new Group(),
          items: [],
          fields: groupHeader,
          message: ''
    }
  },

  created() {
        this.service = new Service(this.$resource);

        this.service
            .list()
            .then(items => this.items = items, err => this.message = err.message)
    },
};
</script>


<style scoped>
</style>