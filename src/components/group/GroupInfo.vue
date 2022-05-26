<template>
  <div>
    <h2>{{ group.name }}</h2>

    <b-form inline>
      <div class="control mb-2 mr-2 ml-2">
        <label for="name">{{ $i18n.t('name') }}</label>
        <input id="name" autocomplete="off" v-model.lazy="group.name" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="time">{{ $i18n.t('time') }}</label>
        <input id="time" autocomplete="off" v-model.lazy="group.time" />
      </div>
    </b-form>

    <relationTable :initAvaiableElements="equipments" :initInsertedElements="group.equipments" @updateRelation="(elements) => { this.group.equipments = elements.elements }"></relationTable>
    <b-content class="btnContainer">
      <b-row align-h="center">
        <b-col cols="2"><myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="removeGroup()"/></b-col>
        <b-col cols="2"><myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="updateGroup()"/></b-col>
      </b-row>
    </b-content>
  

    


  </div>
</template>


<script>
import {i18n} from '../../lang/lang';
import Button from "../shared/button/Button.vue";
import RelationTable from "../shared/table/RelationTable.vue"
import Group from "../../domain/group/Group";
import GroupService from "../../domain/group/GroupService";
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
      group: new Group(),
      equipments: [],
    };
  },


  methods: {
    
    updateRelation(elements) {
      this.group.equipments = elements.elements;  
    },

    updateGroup() {

      console.log("update groups");
      console.log(JSON.stringify(this.group));

      this.groupService
      .update(this.group)
      .then((group) => {
        if(this.group.id <= 0) {
          this.group = group;
          this.$emit('addAction', { row: this.row, value: this.group, update: false, element: new Group()});
        } else {
          this.$emit('addAction', { row: this.row, value: this.group, update: true, element: new Group()});
        }
  
      }, (err) => console.log(err));  
    },

    removeGroup() {
     
      this.groupService
          .erase(this.group.id)
          .then(() => {  
            console.log(this.group);
            this.$emit('removeAction', { row: this.row, value: this.group });  
            this.group = new Group()     
          }
          ,(err) => console.log(err));
    }
  },

  created() {
    this.equipmenteService = new EquipmentService(this.$resource);
    this.groupService = new GroupService(this.$resource);

    if(this.id) {
      this.groupService
        .search(this.id)
        .then(function(group) {
          console.log(group);
          this.group = group;

          this.equipmenteService
          .list()
          .then(function(equipments) { 

            var idList = this.group.equipments.map(e => e.id);

            console.log(idList);

            equipments.forEach(eqp => {
              var state = true;

              idList.forEach(id => { 
                if(id === eqp.id) { 
                  state = false;
                }
              })

              if(state) { 
                this.equipments.push(eqp);
              }

            })
          },
          (err) => console.log(err));
        });
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