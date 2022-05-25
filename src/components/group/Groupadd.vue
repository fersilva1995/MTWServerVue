<template>
  <div>
    <h1>Adicionar Grupo</h1>
    <h2>{{ group.nome }}</h2>

    <form class="formAdd">
      <div class="control">
        <label for="name">Nome</label>
        <input id="name" autocomplete="off" v-model.lazy="group.nome" />
      </div>

      <div class="control">
        <label for="time">Tempo</label>
        <input id="time" autocomplete="off" v-model.lazy="group.time" />
      </div>

       <h2 class="title">Cadastro de grupos</h2>
    </form>

    <relationTable :initAvaiableElements="equipments" :initInsertedElements="group.equipments" @updateRelation="(elements) => { this.group.equipments = elements.elements }"></relationTable>
    <div class="btnArea">
        <myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="removeGroup()"/>
        <myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="updateGroup()"/>
        <myButton type="button" :title="$i18n.t('return')" buttonStyle="light" pageLink="/group"/>
    </div>
    


  </div>
</template>


<script>
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
          this.group = group;
        });
    }
    

    this.equipmenteService
      .list()
      .then(function(equipments) { 
          this.equipments = equipments; 
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