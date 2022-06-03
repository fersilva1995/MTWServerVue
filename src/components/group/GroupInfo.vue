<template>
  <div>
    <h2>{{ element.name }}</h2>

    <b-form inline>
      <div class="control mb-2 mr-2 ml-2">
        <label for="name">{{ $i18n.t('name') }}</label>
        <input id="name" autocomplete="off" v-model.lazy="element.name" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="time">{{ $i18n.t('time') }}</label>
        <input id="time" autocomplete="off" v-model.lazy="element.time" />
      </div>
    </b-form>

    <relationTable :initAvaiableElements="equipments" :initInsertedElements="element.equipments" @updateRelation="(elements) => { this.element.equipments = elements.elements }"></relationTable>
    <b-container class="btnContainer">
      <b-row align-h="center">
        <b-col cols="2"><myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="removeGroup()"/></b-col>
        <b-col cols="2"><myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="updateGroup()"/></b-col>
      </b-row>
    </b-container>
  

    


  </div>
</template>


<script>
import {i18n} from '../../lang/lang';
import Button from "../shared/button/Button.vue";
import RelationTable from "../shared/table/RelationTable.vue"
import Element from "../../domain/group/Group";
import Service from "../../domain/group/GroupService";
import EquipmentService from "../../domain/equipment/EquipmentService"

export default {
  components: {
    myButton: Button,
    relationTable: RelationTable,
  },

  props: {
    id: 0,
    row: '',
  },

  
  data() {
    return {
      element: new Element(),
      equipments: [],
    };
  },


  methods: {
    
    updateRelation(elements) {
      this.element.equipments = elements.elements;  
    },

    updateGroup() {

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

    removeGroup() {
     
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
    this.equipmenteService = new EquipmentService(this.$resource);
    this.service = new Service(this.$resource);

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {
          console.log(element);
          this.element = element;

          this.equipmenteService
          .list()
          .then(function(equipments) { 

            var idList = this.element.equipments.map(e => e.id);
            equipments.forEach(eqp => {
              var state = true;

              idList.forEach(id => { 
                if(id === eqp.id) { 
                  state = false;
                }
              })

              if(state) { 
                this.element.push(eqp);
              }

            })
          },
          (err) => console.log(err));
        });
    } else {

      this.equipmenteService
      .list()
      .then(function(equipments) { 
        this.equipments = equipments;
      },
      (err) => console.log(err));
    }

  },
};
</script>


<style scoped>
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