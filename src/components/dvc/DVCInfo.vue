<template>
  <div>
    <h2>{{ element.login }}</h2>

    <b-form class="formClass" inline>
          <div class="specialControl">
          <equipmentObjectSelect :disabled="updateElement" name="equipment" selectedComponent="EquipmentComponent" :dt="translatedElements" :el="element.id"  @change="change"></equipmentObjectSelect>
      </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="serialNumber">{{ $i18n.t('serialNumber') }}</label>
            <input id="serialNumber" autocomplete="off" v-model.lazy="element.serialNumber" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="function">{{ $i18n.t('function') }}</label>
            <input id="function" autocomplete="off" v-model.lazy="element.function" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
          <label for="operationalSystem">{{ $i18n.t('operationalSystem') }}</label>
          <input id="operationalSystem" autocomplete="off" v-model.lazy="element.operationalSystem" />
        </div>

      
        <div class="control mb-2 mr-2 ml-2">
          <label for="videoEnable">{{ $i18n.t('videoEnable') }}</label>
          <input type="checkbox" id="videoEnable" autocomplete="off" v-model.lazy="element.videoEnable" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="audioEnable">{{ $i18n.t('audioEnable') }}</label>
          <input type="checkbox" id="audioEnable" autocomplete="off" v-model.lazy="element.audioEnable" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="permanentStream">{{ $i18n.t('permanentStream') }}</label>
          <input type="checkbox" id="permanentStream" autocomplete="off" v-model.lazy="element.permanentStream" />
        </div>


        <div class="specialControl">
            <objectSelect name="server" type="datetime-local" selectedComponent="ServerComponent" :dt="servers" :el="element.server.id" @change="(newValue) => { this.element.server = newValue;}"></objectSelect>
        </div>

        <div class="specialControl">
            <objectSelect name="telemetry" type="datetime-local" selectedComponent="TelemetryComponent" :dt="telemetries" :el="element.telemetry.id"  @change="(newValue) => { this.element.telemetry = newValue;}"></objectSelect>
        </div>
    </b-form>

    <b-container class="btnContainer">
      <b-row align-h="center">
        <b-col cols="2"><myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="remove()"/></b-col>
        <b-col cols="2"><myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="update()"/></b-col>
      </b-row>
    </b-container>
  

    


  </div>
</template>


<script>
import {i18n} from '../../lang/lang';
import Button from "../shared/button/Button.vue";
import ObjectSelect from "../shared/select/ObjectSelect.vue";
import Element from "../../domain/dvc/DVC";
import Schedule from "../../domain/schedule/Schedule";
import Vehicle from "../../domain/vehicle/Vehicle";
import Service from "../../domain/dvc/DVCService";
import ServerService from "../../domain/server/ServerService";
import TelemetryService from "../../domain/telemetry/TelemetryService";
import EquipmentService from "../../domain/equipment/EquipmentService";

export default {
  components: {
    myButton: Button,
    objectSelect: ObjectSelect,
    equipmentObjectSelect: ObjectSelect,
  },

  props: {
    id: 0,
    row: '',
  },

  
  data() {
    return {
      element: new Element(),
      updateElement: this.id > 0,
      baseElements: this.array,
      baseEquipments:[],
      servers:  [],
      telemetries: [],
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
      this.element = new Element(newValue);
    },
    
    update() {

      console.log("update dvc");
      console.log(JSON.stringify(this.element));

      this.service
      .update(this.element, this.updateElement)
      .then((element) => {
        if(this.element.id <= 0) {
          this.element = element;

          this.$emit('addAction', { row: this.row, value: this.element, update: this.updateElement, element: new Element()});
        } else {
          this.$emit('addAction', { row: this.row, value: this.element, update: this.updateElement, element: new Element()});
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
    this.serverService = new ServerService(this.$resource);
    this.telemetryService = new TelemetryService(this.$resource);
    this.equipmentService = new EquipmentService(this.$resource, this.$session);
    this.equipmentService
      .list()
      .then(function(equipments) { 
        this.baseEquipments = equipments;
      },
      (err) => console.log("erro:" + err));

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {
            console.log(element);
            this.element = element;
        });
    } 

    this.serverService
      .list()
      .then(function(server) { 
          this.servers = server;
          this.servers.push(new Schedule(i18n.t('newServer')));
      },
      (err) => console.log(err));

    this.telemetryService
      .list()
      .then(function(telemetry) { 
          this.telemetries = telemetry;
          this.telemetries.push(new Vehicle(i18n.t('newTelemetry')));
      },
      (err) => console.log(err));

  },
};
</script>


<style scoped>

.formClass {
  width: 100%;


}
.formAdd {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.specialControl {
    width: 96%;
    padding: 5px;
}
.control {
    width: 30%;
    padding: 10px;
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