<template>
  <div>
    <h1>{{ $i18n.t('vehicle')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="VehicleComponent"/>
  </div>
</template>

<script>

import Table from "../shared/table/Table.vue";
import Service from '../../domain/vehicle/VehicleService';
import Element from '../../domain/vehicle/Vehicle';
import { Header } from "../../domain/vehicle/VehicleHeader"

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