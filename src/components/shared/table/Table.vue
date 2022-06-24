<template>
  <div>

    <div class="filterDiv">
      <b-form inline class="filter">
          <b-form-input class="filterButton"  v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
      </b-form>
    </div>
 
    <b-table :filter="filter" :filter-included-fields="filterOn" id="my-table" ref="table" striped hover :fields="translateFields" :items="translateItens" :dark="dark" borderless responsive="sm">
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
            <component :row=row :is="currentComponent" :id="row.item.id" :array="translateItens" @addAction="AddAction" @removeAction="RemoveAction"></component>
          </b-row>
        </b-card>
      </template>

    </b-table>
  </div>
</template>

<script>

import {i18n} from '../../../lang/lang';
import GroupComponent from '../../group/GroupInfo.vue';
import EquipmentComponent from '../../equipment/EquipmentInfo.vue';
import UserComponent from '../../user/UserInfo.vue';
import ProfileComponent from '../../profile/ProfileInfo.vue';
import ServerComponent from '../../server/ServerInfo.vue';
import VisitorComponent from '../../visitor/VisitorInfo.vue'; 
import VehicleComponent from '../../vehicle/VehicleInfo.vue';
import PeriodComponent from '../../period/PeriodInfo.vue';
import ScheduleComponent from '../../schedule/ScheduleInfo.vue';
import PermanentComponent from '../../permanent/PermanentInfo.vue';
import RestrictedPlatesComponent from '../../restrictedPlates/RestrictedPlatesInfo.vue';
import RecordComponent from '../../record/RecordInfo.vue';
import TelemetryComponent from '../../telemetry/TelemetryInfo.vue';
import GatewayComponent from '../../gateway/GatewayInfo.vue';
import DVCComponent from '../../dvc/DVCInfo.vue';

export default {


  components: {
    GroupComponent : GroupComponent,
    EquipmentComponent: EquipmentComponent,
    UserComponent: UserComponent,
    ProfileComponent: ProfileComponent,
    ServerComponent: ServerComponent,
    VisitorComponent: VisitorComponent,
    VehicleComponent: VehicleComponent,
    PeriodComponent: PeriodComponent,
    ScheduleComponent: ScheduleComponent,
    PermanentComponent: PermanentComponent,
    RestrictedPlatesComponent: RestrictedPlatesComponent,
    RecordComponent: RecordComponent,
    TelemetryComponent: TelemetryComponent,
    GatewayComponent: GatewayComponent,
    DVCComponent: DVCComponent,
  },

  props: {
      fields: [],
      items: [],
      selectedComponent: '',
  },

  data() {
    return {
      refresh: true,
      countDown: 3,
      currentComponent: this.selectedComponent,
      dark: true,
      translatedFields: [],
      translatedItens: [],

      filter: '',
      filterOn: [],
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
      this.refresh;
      return this.translatedItens;
    }
  },

  methods: {
    ShowDetails(row) {
      this.currentComponent = this.selectedComponent;
      row.toggleDetails();
    },

    AddAction(newElement) {

      console.log("newElement");
      console.log(newElement);
      
      if(!newElement.update) {
        this.translatedItens[this.translatedItens.length-1] = newElement.value;
        this.translatedItens.push(newElement.element);
       
      } else {
        this.translatedItens.forEach((element, index, array) => {
          if(element.id === newElement.value.id) {
            array[index] = newElement.value;
          }
        })
      }

      this.$emit('update', { value: newElement.value, update: newElement.update, element: newElement.element});

      newElement.row.toggleDetails();
      this.refresh = !this.refresh;
      this.$root.$emit('bv::refresh::table', 'my-table');
      this.$refs.table.refresh();
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
          this.translatedItens = this.items;
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  },

  created() {
    this.translatedItens = this.items;
    this.currentComponent = this.selectedComponent;
    this.countDownTimer();
  }
}
</script>

<style>

.filterDiv {
  float: right;
  padding: 10px;
}

.filterButton {
    max-width: 170px;
    padding: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
    float: right;
}



</style>