<template>
  <div>
    <h2>{{ element.login }}</h2>

    <b-form inline>
        <div class="control mb-2 mr-2 ml-2">
            <label for="lprRecord">{{ $i18n.t('lprRecord') }}</label>
            <input type="checkbox" id="lprRecord" autocomplete="off" v-model.lazy="element.telemetryServer" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="acessRecord">{{ $i18n.t('acessRecord') }}</label>
            <input type="checkbox" id="acessRecord" autocomplete="off" v-model.lazy="element.lprServer" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
          <label for="acessPermanent">{{ $i18n.t('acessPermanent') }}</label>
          <input type="checkbox" id="acessPermanent" autocomplete="off" v-model.lazy="element.masterEyeServer" />
        </div>
      
        <div class="control mb-2 mr-2 ml-2">
          <label for="acessVisitor">{{ $i18n.t('acessVisitor') }}</label>
          <input type="checkbox" id="acessVisitor" autocomplete="off" v-model.lazy="element.digifortServer" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
          <label for="acessModel">{{ $i18n.t('acessModel') }}</label>
          <input type="checkbox" id="acessModel" autocomplete="off" v-model.lazy="element.recordServer" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
          <label for="acessPeriod">{{ $i18n.t('acessPeriod') }}</label>
          <input type="checkbox" id="acessPeriod" autocomplete="off" v-model.lazy="element.sessionServer" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
          <label for="acessSchedule">{{ $i18n.t('acessSchedule') }}</label>
          <input type="checkbox" id="acessSchedule" autocomplete="off" v-model.lazy="element.rtspServer" />
        </div>


    </b-form>

    <relationTable :initAvaiableElements="equipments" :initInsertedElements="element.serverEquipments" @updateRelation="(elements) => { this.element.serverEquipments = elements.elements }"></relationTable>
    <relationTable :initAvaiableElements="groups" :initInsertedElements="element.serverGroups" @updateRelation="(elements) => { this.element.serverGroups = elements.elements }"></relationTable>
    
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
import RelationTable from "../shared/table/RelationTable.vue";
import Element from "../../domain/server/Server";
import Service from "../../domain/server/ServerService"
import GroupService from "../../domain/group/GroupService";
import EquipmentService from "../../domain/equipment/EquipmentService";

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
      profiles:  [],
      equipments: [],
      groups: [],
      showProfileInfo: false,
    };
  },

  methods: {

    update() {

      console.log("update server");
      console.log(JSON.stringify(this.element));
      var el = this.element;
   
      this.service
      .update(el)
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
    this.groupService = new GroupService(this.$resource);

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {

          console.log(element);
          2
          this.element = element;
          this.equipmentService
            .list()
            .then(function(equipments) { 
                
              var idList = this.element.serverEquipments.map(e => e.id);
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

          this.groupService
            .list()
            .then(function(groups) { 

              var idList = this.element.serverGroups.map(e => e.id);
              groups.forEach(grp => {
                var state = true;
                idList.forEach(id => { 
                  if(id === grp.id) { 
                      state = false;
                  }
                })

                if(state) { 
                    this.groups.push(grp);
                }
              })
            },
            (err) => console.log(err));

      });
    } else { 

      this.equipmentService
        .list()
        .then(function(equipments) { 
          this.equipments = equipments;

          this.equipments.forEach(el => {
            el.groups = [];
          })

          console.log(this.equipments);
        },
        (err) => console.log(err));

      this.groupService
        .list()
        .then(function(groups) {          
          this.groups = groups;
          
          this.groups.forEach(el => {
            el.equipments = [];
          })
          console.log(this.groups);
        },
        (err) => console.log(err));
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