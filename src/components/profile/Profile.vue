<template>
  <div>
    <h1>{{ $i18n.t('profile')}}</h1>
    <dataTable :items="items" :fields="fields" selectedComponent="ProfileComponent"/>
  </div>
</template>

<script>
import Table from "../shared/table/Table.vue";
import Service from '../../domain/profile/ProfileService';
import Element from '../../domain/profile/Profile';
import { Header } from "../../domain/profile/ProfileHeader"

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