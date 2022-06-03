<template>
  <div>
    <h1>{{ $i18n.t('permanent')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="PermanentComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/permanent/PermanentService';
import Element from '../../domain/permanent/Permanent';
import { Header } from "../../domain/permanent/PermanentHeader"

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