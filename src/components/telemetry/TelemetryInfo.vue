<template>
  <div>
    <h2>{{ element.login }}</h2>

    <b-form inline>
      <div class="specialControl">
          <equipmentObjectSelect :disabled="updateElement" name="equipment" selectedComponent="EquipmentComponent" :dt="translatedElements" :el="element.id"  @change="change"></equipmentObjectSelect>
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="serialNumber">{{ $i18n.t('serialNumber') }}</label>
        <input id="serialNumber" autocomplete="off" v-model.lazy="element.serialNumber" />
      </div>
    </b-form>

    <dataTable id="gatewayTable" :items="element.gateways" :fields="fields" selectedComponent="GatewayComponent"></dataTable>

    <b-container  class="btnContainer">
      <b-row align-h="center">
        <b-col cols="2"><myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="remove()"/></b-col>
        <b-col cols="2"><myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="update()"/></b-col>
      </b-row>
    </b-container>

  </div>
</template>


<script>

import Button from "../shared/button/Button.vue";
import ObjectSelect from "../shared/select/ObjectSelect.vue";
import DataTable from "../shared/table/Table.vue";
import Element from "../../domain/telemetry/Telemetry";
import Gateway from "../../domain/gateway/Gateway";
import Service from "../../domain/telemetry/TelemetryService";
import EquipmentService from "../../domain/equipment/EquipmentService";
import { Header } from "../../domain/gateway/GatewayHeader";


export default {

  components: {
    myButton: Button,
    equipmentObjectSelect: ObjectSelect,
    dataTable: DataTable,
  },

  props: {
    id: 0,
    row: '',
    array: [],
  },

  data() {
    return {
      element: new Element(),
      fields: Header,
      updateElement: this.id > 0,
      baseElements: this.array,
      baseEquipments:[],
    };
  },

  computed: {
    translatedElements() {
      
      if(this.baseElements !== undefined && !this.updateElement) {
        return this.baseEquipments.filter((el) => {
          if(!this.baseElements.map(e => e.id).includes(el.id)) {
            return el;
          }
        })
      } else {
        return this.baseEquipments;
      }
     
    }
  },

  methods: {

    change(newValue) {
      var gateways = this.element.gateways;
      this.element = new Element(newValue);
      this.element.gateways = gateways;
    },
    update() {

      console.log("update telemetry");
      console.log(JSON.stringify(this.element));
      var el = this.element;
   
      this.service
      .update(el, this.updateElement)
      .then((element) => {

        if(this.element.id <= 0) {
          this.element = element;
          this.$emit('addAction', { row: this.row, value: this.element, update: false, element: new Element()});
        } else {
          this.$emit('addAction', { row: this.row, value: this.element, update: true, element: new Element()});
        }
  
      }, (err) => console.log(err));  
    },

    remove() {
     
      this.service
        .erase(this.element.id)
        .then(() => {  
          console.log(this.element);
          this.$emit('removeAction', { row: this.row, value: this.element });  
          this.element = new Element()     
        }
        ,(err) => console.log(err));
    }
  },

  created() {
    this.service = new Service(this.$resource);
    this.equipmentService = new EquipmentService(this.$resource);

    this.equipmentService
    .list()
    .then(function(equipments) { 
      this.baseEquipments = equipments;
    },
    (err) => console.log(err));

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {
          this.element = element;
          this.element.gateways.push(new Gateway());
      });
    } else {
      this.element.gateways.push(new Gateway());
    }

    console.log(this.element); 
  },
};
</script>


<style scoped>
.formAdd {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.formProfile {
  width: 65%;
  padding: 10px;
  margin: 0 auto;
  min-height: 50px;
}

.control {
  width: 48%;
  padding: 10px;
  margin: 0 auto;
  min-height: 50px;
}

.specialControl {
    width: 100%;
    margin: 0 auto;
}

.controlProfile {
  width: 30%;
  padding: 10px;
  margin: 0 auto;
  min-height: 50px;
}

.btnContainer {
  font-size: 1.1em;
  margin-top: 50px;
}

.btnArea {
  margin-left: 50%;
  margin: auto 0;
  font-size: 1.1em;
}

.control label {
  font-weight: 500;
  letter-spacing: 1px;
}

.control label + input,
.control textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.btnArea {
  display: flex;
  justify-content: flex-start;
  width: 700px;
}
</style>