<template>
  <div>
    <h2>{{ element.login }}</h2>

    <b-form class="formClass" inline>
      <div class="specialControl mb-2 mr-2 ml-2">
          <label for="name">{{ $i18n.t('name') }}</label>
          <input class="specialControl" id="name" autocomplete="off" v-model.lazy="element.name" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
          <label for="lprRecord">{{ $i18n.t('lprRecord') }}</label>
          <input type="checkbox" id="lprRecord" autocomplete="off" v-model.lazy="element.lprRecord" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
          <label for="acessRecord">{{ $i18n.t('acessRecord') }}</label>
          <input type="checkbox" id="acessRecord" autocomplete="off" v-model.lazy="element.acessRecord" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessPermanent">{{ $i18n.t('acessPermanent') }}</label>
        <input type="checkbox" id="acessPermanent" autocomplete="off" v-model.lazy="element.acessPermanent" />
      </div>

    
      <div class="control mb-2 mr-2 ml-2">
        <label for="acessVisitor">{{ $i18n.t('acessVisitor') }}</label>
        <input type="checkbox" id="acessVisitor" autocomplete="off" v-model.lazy="element.acessVisitor" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessModel">{{ $i18n.t('acessModel') }}</label>
        <input type="checkbox" id="acessModel" autocomplete="off" v-model.lazy="element.acessModel" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessPeriod">{{ $i18n.t('acessPeriod') }}</label>
        <input type="checkbox" id="acessPeriod" autocomplete="off" v-model.lazy="element.acessPeriod" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessSchedule">{{ $i18n.t('acessSchedule') }}</label>
        <input type="checkbox" id="acessSchedule" autocomplete="off" v-model.lazy="element.acessSchedule" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessOrigin">{{ $i18n.t('acessOrigin') }}</label>
        <input type="checkbox" id="acessOrigin" autocomplete="off" v-model.lazy="element.acessOrigin" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessAction">{{ $i18n.t('acessAction') }}</label>
        <input type="checkbox" id="acessAction" autocomplete="off" v-model.lazy="element.acessAction" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessRestrictedPlate">{{ $i18n.t('acessRestrictedPlate') }}</label>
        <input type="checkbox" id="acessRestrictedPlate" autocomplete="off" v-model.lazy="element.acessRestrictedPlate" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessLpr">{{ $i18n.t('acessLpr') }}</label>
        <input type="checkbox" id="acessLpr" autocomplete="off" v-model.lazy="element.acessLpr" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessAnalyzer">{{ $i18n.t('acessAnalyzer') }}</label>
        <input type="checkbox" id="acessAnalyzer" autocomplete="off" v-model.lazy="element.acessAnalyzer" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessCameraControl">{{ $i18n.t('acessCameraControl') }}</label>
        <input type="checkbox" id="acessCameraControl" autocomplete="off" v-model.lazy="element.acessCameraControl" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessMasterEye">{{ $i18n.t('acessMasterEye') }}</label>
        <input type="checkbox" id="acessMasterEye" autocomplete="off" v-model.lazy="element.acessMasterEye" />
      </div>



      <div class="control mb-2 mr-2 ml-2">
        <label for="acessTelemetry">{{ $i18n.t('acessTelemetry') }}</label>
        <input type="checkbox" id="acessTelemetry" autocomplete="off" v-model.lazy="element.acessTelemetry" />
      </div>


      <div class="control mb-2 mr-2 ml-2">
        <label for="acessAlarm">{{ $i18n.t('acessAlarm') }}</label>
        <input type="checkbox" id="acessAlarm" autocomplete="off" v-model.lazy="element.acessAlarm" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessRecordVideo">{{ $i18n.t('acessRecordVideo') }}</label>
        <input type="checkbox" id="acessRecordVideo" autocomplete="off" v-model.lazy="element.acessRecordVideo" />
      </div>


      <div class="control mb-2 mr-2 ml-2">
        <label for="acessAddEquipament">{{ $i18n.t('acessAddEquipament') }}</label>
        <input type="checkbox" id="acessAddEquipament" autocomplete="off" v-model.lazy="element.acessAddEquipament" />
      </div>


      <div class="control mb-2 mr-2 ml-2">
        <label for="acessRemoveEquipment">{{ $i18n.t('acessRemoveEquipment') }}</label>
        <input type="checkbox" id="acessRemoveEquipment" autocomplete="off" v-model.lazy="element.acessRemoveEquipment" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessEditEquipment">{{ $i18n.t('acessEditEquipment') }}</label>
        <input type="checkbox" id="acessEditEquipment" autocomplete="off" v-model.lazy="element.acessEditEquipment" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessAddGroup">{{ $i18n.t('acessAddGroup') }}</label>
        <input type="checkbox" id="acessAddGroup" autocomplete="off" v-model.lazy="element.acessAddGroup" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessTelemetry">{{ $i18n.t('acessTelemetry') }}</label>
        <input type="checkbox" id="acessTelemetry" autocomplete="off" v-model.lazy="element.acessTelemetry" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessRemoveGroup">{{ $i18n.t('acessRemoveGroup') }}</label>
        <input type="checkbox" id="acessRemoveGroup" autocomplete="off" v-model.lazy="element.acessRemoveGroup" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="acessEditGroup">{{ $i18n.t('acessEditGroup') }}</label>
        <input type="checkbox" id="acessEditGroup" autocomplete="off" v-model.lazy="element.acessEditGroup" />
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
import Button from "../shared/button/Button.vue";
import Element from "../../domain/profile/Profile";
import Service from "../../domain/profile/ProfileService"

export default {
  components: {
    myButton: Button,
  },

  props: {
    id: 0,
    row: '',
  },

  
  data() {
    return {
      element: new Element(),
    };
  },


  methods: {
    
    update() {

      console.log("update groups");
      console.log(JSON.stringify(this.element));

      this.service
      .update(this.element)
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

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {
            console.log(element);
            this.element = element;
        });
    } 
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
    width: 22%;
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