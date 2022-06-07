<template>
  <div>
    <h1>{{ $i18n.t('DVC')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="DVCComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/dvc/DVCService';
import Element from '../../domain/dvc/DVC';
import { Header } from "../../domain/dvc/DVCHeader"

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