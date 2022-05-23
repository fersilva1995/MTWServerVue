<template>
  <div>
    <h1>Grupos</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="GroupComponent"/>
  </div>
</template>

<script>
import Table from "../shared/table/Table.vue";
import Service from '../../domain/group/GroupService';
import Element from '../../domain/group/Group';
import { Header } from "../../domain/group/GroupHeader"

export default {

  components: {
    dataTable: Table,
  },

  data() {
    return {
      items: [],
      fields: Header
    }
  },

  computed: {
    getItens() {
      return this.items;
    },

    getFields() {
      return this.fields;
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