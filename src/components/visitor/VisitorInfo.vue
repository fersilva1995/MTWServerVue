<template>
  <div>
    <h2>{{ element.title }}</h2>

    <b-form inline>
        <div class="control mb-2 mr-2 ml-2">
            <label for="plate">{{ $i18n.t('plate') }}</label>
            <input class="control" id="plate" autocomplete="off" v-model.lazy="element.plate" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="title">{{ $i18n.t('title') }}</label>
            <input class="control"  id="title" autocomplete="off" v-model.lazy="element.title" />
        </div>

        <div class="control mb-2 mr-2 ml-2">    
            <label for="authorization">{{ $i18n.t('authorization') }}</label>
            <input class="control" type="datetime-local" id="authorization" autocomplete="off" v-model.lazy="element.authorization" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="name">{{ $i18n.t('name') }}</label>
            <input class="control" id="name" autocomplete="off" v-model="element.name" />
        </div>

        <div class="specialControl">
            <objectSelect name="vehicle" selectedComponent="VehicleComponent" :dt="vehicleData" :el="element.vehicle.id" @change="(newValue) => { this.element.vehicle = newValue;}"></objectSelect>
        </div>

        <div class="specialControl">
            <objectSelect name="period" selectedComponent="PeriodComponent" :dt="periods" :el="element.period.id"  @change="(newValue) => { this.element.period = newValue;}"></objectSelect>
        </div>
    </b-form>
    {{element.vehicle}}
    {{element.period}}    
    <b-container  class="btnContainer">
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
import ObjectSelect from "../shared/select/ObjectSelect";
import Element from "../../domain/visitor/Visitor";
import Period from "../../domain/period/Period"
import Vehicle from "../../domain/vehicle/Vehicle"
import Service from "../../domain/visitor/VisitorService"
import PeriodService from "../../domain/period/PeriodService";
import VehicleService from "../../domain/vehicle/VehicleService";
import PeriodInfo from "../period/PeriodInfo.vue";
import VehicleInfo from "../vehicle/VehicleInfo.vue";

export default {
    components: {
        myButton: Button,
        objectSelect: ObjectSelect,
        periodInfo: PeriodInfo,
        vehicleInfo: VehicleInfo,
    },

    props: {
        id: 0,
        row: '',
    },

  
    data() {
        return {
        element: new Element(),
        periods:  [],
        vehicles: [],
        showPeriodInfo: false,
        showVehicleInfo: false,
        refresh: false,
        };
    },

  computed: {

        vehicleData() {
            this.refresh;
            console.log(this.vehicles);
            return this.vehicles;
        }

    },


    methods: {
        update() {

            console.log("update visitor");
            var el = this.element;
            console.log(el);
            console.log(JSON.stringify(el));
        
            this.service
            .update(el)
            .then((element) => {
                if(this.element.id <= 0) {
                    this.element = element;
                    this.$emit('addAction', { row: this.row, value: this.element, update: false, element: new Element(i18n.t('newVisitor'))});
                } else {
                    this.$emit('addAction', { row: this.row, value: this.element, update: true, element: new Element(i18n.t('newVisitor'))});
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
        this.periodService = new PeriodService(this.$resource)
        this.vehicleService = new VehicleService(this.$resource);

        if(this.id) {
        this.service
            .search(this.id)
            .then(function(element) {

                console.log(element);
                this.element = element;  
            });
        }
    
        this.periodService
            .list()
            .then(function(periods) { 
                this.periods = periods;
                this.periods.push(new Period(i18n.t('newPeriod')));
            },
            (err) => console.log(err));

        this.vehicleService
            .list()
            .then(function(vehicles) { 
                this.vehicles = vehicles;
                this.vehicles.push(new Vehicle(i18n.t('newVehicle')));
            },
            (err) => console.log(err));
    },
};
</script>


<style scoped>
.formAdd {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.formChild {
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

.controlChild {
  width: 30%;
  padding: 10px;
  margin: 0 auto;
  min-height: 50px;
}

.labelChild {
    margin-right: 35%;
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