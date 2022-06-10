<template>
  <div>
    <h2>{{ element.login }}</h2>

    <b-form inline>
      <div class="control mb-2 mr-2 ml-2">
        <label for="login">{{ $i18n.t('login') }}</label>
        <input class="control" id="login" autocomplete="off" v-model.lazy="element.login" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="password">{{ $i18n.t('password') }}</label>
        <input class="control" type="password" id="password" autocomplete="off" v-model.lazy="element.password" />
      </div>

      <div class="specialControl">
        <objectSelect name="profile" selectedComponent="ProfileComponent" :dt="profiles" :el="element.profile.id" @change="(newValue) => { this.element.profile = newValue;}"></objectSelect>
      </div>
    </b-form>
    {{ element.profile }}
    <relationTable :initAvaiableElements="equipments" :initInsertedElements="element.equipments" @updateRelation="(elements) => { this.element.equipments = elements.elements }"></relationTable>
    <relationTable :initAvaiableElements="groups" :initInsertedElements="element.groups" @updateRelation="(elements) => { this.element.groups = elements.elements }"></relationTable>
    
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
import RelationTable from "../shared/table/RelationTable.vue";
import ObjectSelect from "../shared/select/ObjectSelect.vue";
import Element from "../../domain/user/user";
import Profile from "../../domain/profile/Profile"
import Service from "../../domain/user/UserService"
import GroupService from "../../domain/group/GroupService";
import EquipmentService from "../../domain/equipment/EquipmentService";
import ProfileService from "../../domain/profile/ProfileService";
import ProfileInfo from "../profile/ProfileInfo.vue";

export default {
  components: {
    myButton: Button,
    relationTable: RelationTable,
    objectSelect: ObjectSelect,
    profileInfo: ProfileInfo,
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

    toggleProfileInfo() {
      this.showProfileInfo = !this.showProfileInfo;
      console.log(this.showProfileInfo);
    },
    
    update() {

      console.log("update users");
      var el = this.element;
      console.log(JSON.stringify(el));
   
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
    this.equipmenteService = new EquipmentService(this.$resource, this.$session);;
    this.groupService = new GroupService(this.$resource, this.$session);;
    this.profileService = new ProfileService(this.$resource);

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
    else
    {
      this.equipmenteService
        .list()
        .then(function(equipments) { 
          this.equipments = equipments;          
        },
        (err) => console.log(err));

      this.groupService
        .list()
        .then(function(groups) { 
          this.groups = groups; 
        },
        (err) => console.log(err));
    }

    this.profileService
      .list()
      .then((profiles) => {
        this.profiles = profiles;
        this.profiles.push(new Profile(i18n.t('newProfile')));
      });
    
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