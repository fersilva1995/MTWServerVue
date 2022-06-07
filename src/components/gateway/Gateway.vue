<template>
  <div>
    <h1>{{ $i18n.t('gateway')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="GatewayComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/gateway/GatewayService';
import Element from '../../domain/gateway/Gateway';
import { Header } from "../../domain/gateway/GatewayHeader"

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