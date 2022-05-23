<template>
  <div>
    <b-table striped hover :fields="translateFields" :items="translateItens" :dark="dark" borderless responsive="sm">>
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
            <component :row=row :is="currentComponent" :id="row.item.id" @addAction="AddAction" @removeAction="RemoveAction"></component>
          </b-row>
        </b-card>
      </template>

    </b-table>
  </div>
</template>

<script>

import {i18n} from '../../../lang/lang';
import GroupComponent from '../../group/Groupadd.vue';
import EquipmentComponent from '../../equipment/EquipmentAdd.vue'
import Group from '../../../domain/group/Group'

export default {


  components: {
    GroupComponent : GroupComponent,
    EquipmentComponent: EquipmentComponent,
  },

  props: {
      fields: [],
      items: [],
      selectedComponent: '',
  },

  data() {
    return {
      countDown: 3,
      currentComponent: this.selectedComponent,
      dark: true,
      dt: "Detalhes",
      translatedFields: [],
      translatedItens: [],
    }
  },



  computed: {
    translateFields() {
      this.translatedFields = [];
      this.fields.forEach((field) => {
          field.label = i18n.t(field.key)
          this.translatedFields.push(field);             
      });

      this.translatedFields.push("details")
      return this.translatedFields;
    },

    translateItens() {
      return this.translatedItens;
    }
  },

  methods: {
    ShowDetails(row) {
      this.currentComponent = this.selectedComponent;
      row.toggleDetails();
    },

    AddAction(newElement) {
    
      console.log(newElement);
      this.translatedItens[this.translatedItens.length - 1] = newElement.value;
      console.log(this.translatedItens);
      console.log(this.translatedItens[this.translatedItens.length - 1]);

      if(!newElement.update) {
        this.translatedItens.push(new Group());
      }

      newElement.row.toggleDetails();
    },

    RemoveAction(element) {
      this.translatedItens = this.translatedItens.filter(el => {
        if(el.id != element.value.id) {
          return el;
        }
      });
      element.row.toggleDetails();
    },

    countDownTimer () {
      if (this.countDown > 0) {
          setTimeout(() => {
              console.log(this.items);
              this.translatedItens = this.items;
              this.countDown -= 1
              this.countDownTimer()
          }, 1000)
      }
    }
  },

  created() {
    console.log("ITENS");
    console.log(this.items);
    this.translatedItens = this.items;
    this.currentComponent = this.selectedComponent;
    this.countDownTimer();
  }


}
</script>

<style>



</style>