<template>
  <div>
    <h1>{{ $i18n.t('server')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="ServerComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/server/ServerService';
import Element from '../../domain/server/Server';
import { Header } from "../../domain/server/ServerHeader"

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
        console.log(items);
        this.items = items;
        this.items.push(new Element());
      });
  },
};
</script>


<style scoped>
</style>