<template>
  <div>
    <h2>{{ element.login }}</h2>

    <b-form inline>
      <div class="control mb-2 mr-2 ml-2">
        <label for="login">{{ $i18n.t('login') }}</label>
        <input id="login" autocomplete="off" v-model.lazy="element.login" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="password">{{ $i18n.t('password') }}</label>
        <input type="password" id="password" autocomplete="off" v-model.lazy="element.password" />
      </div>


      <div class="control mb-2 mr-2 ml-2">
        <label for="profile">{{ $i18n.t('profile') }}</label>
        <input type="profile" id="profile" autocomplete="off" v-model.lazy="element.profile.name" />
      </div>
    </b-form>

    <relationTable :initAvaiableElements="equipments" :initInsertedElements="element.equipments" @updateRelation="(elements) => { this.element.equipments = elements.elements }"></relationTable>
    <relationTable :initAvaiableElements="groups" :initInsertedElements="element.groups" @updateRelation="(elements) => { this.element.groups = elements.elements }"></relationTable>
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
import Element from "../../domain/group/Group";
import Service from "../../domain/user/UserService"
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
      element: new Element(),
      equipments: [],
      groups: [],
    };
  },


  methods: {
    
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
    this.service = new Service(this.$resource);
    this.equipmenteService = new EquipmentService(this.$resource);
    this.groupService = new GroupService(this.$resource);

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
                        this.equipments.push(eqp);
                    }
                })
            },
            (err) => console.log(err));

            this.groupService
                .list()
                .then(function(groups) { 

                    var idList = this.element.groups.map(e => e.id);
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