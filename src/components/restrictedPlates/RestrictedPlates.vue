<template>
  <div>
    <h1>{{ $i18n.t('restrictedPlates')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="RestrictedPlatesComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/restrictedPlates/RestrictedPlatesService';
import Element from '../../domain/restrictedPlates/RestrictedPlates';
import { Header } from "../../domain/restrictedPlates/RestrictedPlatesHeader"

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