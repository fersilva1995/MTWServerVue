<template>
  <div>
    <h1>{{ $i18n.t('schedule')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="ScheduleComponent"/>
  </div>
</template>

<script>
import Table from "../shared/table/Table.vue";
import Service from '../../domain/schedule/ScheduleService';
import Element from '../../domain/schedule/Schedule';
import { Header } from "../../domain/schedule/ScheduleHeader"

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