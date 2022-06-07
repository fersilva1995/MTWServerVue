<template>
  <div>
    <h2>{{ element.name }}</h2>

    <b-form class="formClass" inline>
      <div class="specialControl">
        <equipmentObjectSelect :disabled="updateElement" name="equipment" selectedComponent="EquipmentComponent" :dt="translatedElements" :el="element.id"  @change="change"></equipmentObjectSelect>
      </div>

      <div class="control mb-2 mr-2 ml-2">
          <label for="recordPath">{{ $i18n.t('recordPath') }}</label>
          <input id="recordPath" autocomplete="off" v-model.lazy="element.recordPath" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
          <label for="duration">{{ $i18n.t('duration') }}</label>
          <input id="duration" autocomplete="off" v-model.lazy="element.duration" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
          <label for="remoteUser">{{ $i18n.t('remoteUser') }}</label>
          <input id="remoteUser" autocomplete="off" v-model.lazy="element.remoteUser" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="remotePassword">{{ $i18n.t('remotePassword') }}</label>
        <input id="remotePassword" autocomplete="off" v-model.lazy="element.remotePassword" />
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
import ObjectSelect from "../shared/select/ObjectSelect.vue";
import Element from "../../domain/record/Record";
import Service from "../../domain/record/RecordService";
import EquipmentService from "../../domain/equipment/EquipmentService";

export default {
  components: {
    myButton: Button,
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

.control {
    width: 48%;
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