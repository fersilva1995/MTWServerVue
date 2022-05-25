<template>
  <div>
    <h1>Adicionar Equipamento</h1>
    <h2 class="title">{{ equipment.nome }}</h2>

    <b-form inline>
        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="name">Name</label>
            <input id="name" autocomplete="off" v-model.lazy="equipment.name" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="ip">IP</label>
            <input id="ip" autocomplete="off" v-model.lazy="equipment.ip" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="user">User</label>
            <input id="user" autocomplete="off" v-model.lazy="equipment.user" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="password">Password</label>
            <input id="password" autocomplete="off" v-model.lazy="equipment.password" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="type">Type</label>
            <input id="type" autocomplete="off" v-model.lazy="equipment.tipo" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="primaryRtsp">Primary RTSP</label>
            <input id="primaryRtsp" autocomplete="off" v-model.lazy="equipment.primaryRtsp" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="secondaryRtsp">Second RTSP</label>
            <input id="secondaryRtsp" autocomplete="off" v-model.lazy="equipment.sencondaryRtsp" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="streamingPrimaryRtsp">Streaming Primary RTSP</label>
            <input id="streamingPrimaryRtsp" autocomplete="off" v-model.lazy="equipment.primaryStreamingRtsp" />
        </div>

        <div class="control mb-2 mr-sm-2 mb-sm-0">
            <label for="streamingSecondaryRtsp">Streaming Sencodary RTSP</label>
            <input id="streamingSecondaryRtsp" autocomplete="off" v-model.lazy="equipment.sencondaryStreamingRtsp" />
        </div>
    </b-form>

    <h2 class="title">Cadastro de grupos</h2>
    <relationTable :initAvaiableElements="groups" :initInsertedElements="equipment.groups" @updateRelation="(elements) => { this.equipment.groups = elements.elements }"></relationTable>
    
    <div class="btnArea">
      <myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="remove()"/>
      <myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="update()"/>
      <myButton type="button" :title="$i18n.t('return')" buttonStyle="light" pageLink="/group"/>
    </div>

    


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
        });
    }
    

    this.groupService
      .list()
      .then(function(groups) { 
          this.groups = groups; 
        },
        (err) => console.log(err));
    },
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

.control,
.btnArea {
  font-size: 1.1em;
  margin-bottom: 20px;
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