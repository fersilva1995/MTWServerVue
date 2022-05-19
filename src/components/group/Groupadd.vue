<template>
  <div>
    <h1>Adicionar Grupo</h1>
    <h2>{{ group.nome }}</h2>

    <form @submit.prevent="save()" class="formAdd">
      <div class="control">
        <label for="name">Nome</label>
        <input id="name" autocomplete="off" v-model.lazy="group.nome" />
      </div>

      <div class="control">
        <label for="time">Tempo</label>
        <input id="time" autocomplete="off" v-model.lazy="group.time" />
      </div>

      <b-form-group label="Equipamentos Disponíveis:" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="equipmentsToAdd"
          :options="equipments"
          value-field="id"
          text-field="nome"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
          stacked
        >
        </b-form-checkbox-group>
        <div>
          Equipamentos: <strong>{{ equipmentsToAdd }}</strong>
        </div>
      </b-form-group>


       <b-form-group label="Equipamentos Adicionados:" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="equipmentsToRemove"
          :options="group.equipments"
          value-field="id"
          text-field="nome"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
          stacked
        >
        </b-form-checkbox-group>
        <div>
          Equipamentos: <strong>{{ equipmentsToRemove }}</strong>
        </div>
      </b-form-group>
      
      <div class="btnArea">
        <myButton type="button" :title="$i18n.t('update')" buttonStyle="primary" @buttonAction="updateGroupEquipments()"></myButton>
        <myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="removeGroup()"/>
        <myButton type="submit" :title="$i18n.t('save')"  buttonStyle="success" />
        <myButton type="button" :title="$i18n.t('return')" buttonStyle="light" pageLink="/group"/>
      </div>
    </form>
    


  </div>
</template>


<script>
import Button from "../shared/button/Button.vue";
import Group from "../../domain/group/Group";
import Equipament from "../../domain/equipment/Equipment";
import GroupService from "../../domain/group/GroupService";
import EquipmentService from "../../domain/equipment/EquipmentService"

export default {
  components: {
    myButton: Button,
  },

  props: {
    id: 0,
  },

  
  data() {
    return {
      group: new Group(),
      equipments: [],
      equipmentsToAdd: [],
      equipmentsToRemove: [],
    };
  },


  methods: {

    save() {
      console.log(JSON.stringify(this.group));
      this.groupService
        .update(this.group)
        .then((group) => {
          console.log(group);
          console.log(this.group);
          this.group = group;
        }, (err) => console.log(err));
        
    },

    updateGroupEquipments() {

      var addEqps = [];
      var rmvEqps = [];

      for(var counter = 0; counter < this.equipmentsToAdd.length; counter++) {

        this.equipments.forEach((equipment => {
          if(equipment.id === this.equipmentsToAdd[0]) {
            this.group.equipments.push(equipment);
            addEqps.push(equipment);
          }
        }))
      }

      this.equipments = this.equipments.filter(equipment => {
        return !addEqps.includes(equipment);
      })

      for(var counter = 0; counter < this.equipmentsToRemove.length; counter++) {

         this.group.equipments.forEach((equipment => {
          if(equipment.id === this.equipmentsToRemove[0]) {
  
            this.equipments.push(equipment);
            rmvEqps.push(equipment);
          }
        }))

      }

      this.group.equipments = this.group.equipments.filter(equipment => {
        return !rmvEqps.includes(equipment);
      })





      console.log(this.equipments);
      console.log(this.group.equipments);

      this.equipmentsToAdd = [];
      this.equipmentsToRemove = [];

    
    },

    removeGroup() {
      console.log(this.group);
      this.groupService
          .erase(this.group)
          .then(() => (this.group = new Group()), (err) => console.log(err));
    }
  },

  created() {

    console.log(this.id);
    this.equipmenteService = new EquipmentService(this.$resource);
    this.groupService = new GroupService(this.$resource);

    if(this.id) {
      this.groupService
        .search(this.id)
        .then(function(group) {
          this.group = group.value;
          console.log(this.group);
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