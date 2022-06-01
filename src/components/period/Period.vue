<template>
  <div>
    <h1>{{ $i18n.t('period')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="PeriodComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/period/PeriodService';
import Element from '../../domain/period/Period';
import { Header } from "../../domain/period/PeriodHeader"

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