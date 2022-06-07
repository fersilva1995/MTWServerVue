<template>
  <div>
    <h1>{{ $i18n.t('record')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="RecordComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/record/RecordService';
import Element from '../../domain/record/Record';
import { Header } from "../../domain/record/RecordHeader"

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