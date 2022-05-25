<template>
  <div>
    <h1>Equipamentos</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="EquipmentComponent"/>
  </div>
</template>

<script>
import Table from "../shared/table/Table.vue";
import Service from '../../domain/equipment/EquipmentService';
import Element from '../../domain/equipment/Equipment';
import { Header } from "../../domain/equipment/EquipmentHeader"

export default {

  components: {
    dataTable: Table,
  },

  data() {
    return {
      items: [],
      fields: Header,
    }
  },

  created() {
    this.service = new Service(this.$resource);

    this.service
      .list()
      .then((items) => {
        this.items = items;
        this.items.push(new Element());
      });
  },
};
</script>


<style scoped>
</style>