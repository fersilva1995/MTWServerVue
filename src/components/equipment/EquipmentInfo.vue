<template>
  <div>
    <h2 class="title">{{ equipment.name }}</h2>

    <b-form inline>
        <div class="control mb-2 mr-2 ml-2">
            <label for="name">{{$i18n.t('name')}}</label>
            <input id="name" autocomplete="off" v-model.lazy="equipment.name" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="ip">{{$i18n.t('ip')}}</label>
            <input id="ip" autocomplete="off" v-model.lazy="equipment.ip" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="user">{{$i18n.t('user')}}</label>
            <input id="user" autocomplete="off" v-model.lazy="equipment.user" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="password">{{$i18n.t('password')}}</label>
            <input id="password" autocomplete="off" v-model.lazy="equipment.password" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="type">{{$i18n.t('type')}}</label>
            <input id="type" autocomplete="off" v-model.lazy="equipment.tipo" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="primaryRtsp">{{$i18n.t('primaryRtsp')}}</label>
            <input id="primaryRtsp" autocomplete="off" v-model.lazy="equipment.primaryRtsp" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="secondaryRtsp">{{$i18n.t('secondaryRtsp')}}</label>
            <input id="secondaryRtsp" autocomplete="off" v-model.lazy="equipment.sencondaryRtsp" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="streamingPrimaryRtsp">{{$i18n.t('streamingPrimaryRtsp')}}</label>
            <input id="streamingPrimaryRtsp" autocomplete="off" v-model.lazy="equipment.primaryStreamingRtsp" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="streamingSecondaryRtsp">{{$i18n.t('streamingSecondaryRtsp')}}</label>
            <input id="streamingSecondaryRtsp" autocomplete="off" v-model.lazy="equipment.sencondaryStreamingRtsp" />
        </div>
    </b-form>

    <relationTable :initAvaiableElements="groups" :initInsertedElements="equipment.groups" @updateRelation="(elements) => { this.equipment.groups = elements.elements }"></relationTable>
    
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
import RelationTable from "../shared/table/RelationTable.vue"
import Equipment from "../../domain/equipment/Equipment";
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
      equipment: new Equipment(),
      groups: [],
      dark: true,
      groupFields: [
        {
          key: "id", 
          label:"Id"
        }, 
        {
          key: "nome", 
          label:"Nome"
        },
        {
          key: "details", 
          label: "Details"
        }
      ],
      stickyHeader: true,
      noCollapse: false,

    };
  },


  methods: {
    
    updateRelation(elements) {
      console.log(elements.elements);
      this.equipment.groups = elements.elements;
    },

    update() {

      console.log("update equipments");
      this.equipment.tipo = 10;
      this.equipment.status = true;
      this.equipment.dateTime = new Date();

      this.equipment.groups.forEach((el => {
        el.equipments = [];
      }));

      console.log(JSON.stringify(this.equipment));
    

      this.equipmenteService
        .update(this.equipment)
        .then((equipment) => {
          if(this.equipment.id <= 0) {
            this.equipment = equipment;
            this.$emit('addAction', { row: this.row, value: this.equipment, update: false, element: new Equipment()});
          } else {
            this.$emit('addAction', { row: this.row, value: this.equipment, update: true, element: new Equipment()});
          }
        }, (err) => console.log(err));  


    },

    remove() {
     
      this.equipmenteService
          .erase(this.id)
          .then(() => {  
            this.$emit('removeAction', { row: this.row, value: this.equipment });  
            this.equipment = new Equipment()     
          }
          ,(err) => console.log(err));
    }
  },

  created() {

    this.equipmenteService = new EquipmentService(this.$resource);
    this.groupService = new GroupService(this.$resource);

    if(this.id) {
      this.equipmenteService
        .search(this.id)
        .then(function(equipment) {

          console.log(equipment);
          this.equipment = equipment;

          this.groupService
            .list()
            .then(function(groups) { 

              var idList = this.equipment.groups.map(e => e.id);
              console.log(idList);

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
      this.groupService
      .list()
      .then(function(groups) { 
        this.groups = groups;
      },
      (err) => console.log(err));
    }
      
  }
    

  
};
</script>


<style scoped>

.title {
  margin: 5px;
  padding: 10px;
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
.btnArea {
  font-size: 1.1em;
  margin-bottom: 20px;
}

.btnContainer {
  font-size: 1.1em;
  margin-top: 50px;
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