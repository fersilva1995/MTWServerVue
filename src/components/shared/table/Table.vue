<template>
  <div>
    <b-table striped hover :fields="translateFields" :items="items" :dark="dark" borderless responsive="sm">>
      <template #head(details)="data">
          {{ data.label = "" }}
      </template>
      <template #cell(details)="row">
        <b-button pill variant="secondary" size="sm" @click="ShowDetails(row)">
          {{ row.detailsShowing ? $i18n.t('hide') : $i18n.t('show') }}
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-3">
            <component :is="currentComponent" :id="row.item.id" @addAction="AddAction()"></component>

            <!--<b-col sm="2" class="text-sm-left">Equipamentos:</b-col>
            <b-col>{{ row.item.equipments }}</b-col>
            <b-col sm="2" class="text-sm-left">Usuários:</b-col>
            <b-col>{{ row.item.users }}</b-col>
            <b-col sm="2" class="text-sm-left">Servers:</b-col>
            <b-col>{{ row.item.servers }}</b-col>
          </b-row>

            <b-row class="row">
            <b-col class="sm-4">
              <b-button pill variant="info">Editar</b-button>
            </b-col>-->
          </b-row>
        </b-card>
      </template>

    </b-table>
  </div>
</template>

<script>

import {i18n} from '../../../lang/lang';
import Group from '../../group/Groupadd.vue';

export default {


  components: {
    Group : Group,
  },

  data() {
    return {
      currentComponent: 'Group',
      dark: true,
      dt: "Detalhes",
    }
  },

  props: {
      fields: [],
      items: [],
      selectedComponent: ''
  },

  computed: {
    translateFields() {

        var translatedFields = [];
        
        this.fields.forEach((field, index) => {
            field.label = i18n.t(field.key)
            translatedFields.push(field);             
        });

        translatedFields.push("details")

        return translatedFields;
    }
  },

  methods: {
    ShowDetails(row) {
      console.log(this.selectedComponent);
      this.currentComponent = 'Group';
      row.toggleDetails();
    },

    AddAction() {
      this.items.push(new Group());
    }
  }


}
</script>

<style>



</style>