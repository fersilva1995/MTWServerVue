<template>
  <div>
    <h1>Adicionar Equipamento</h1>
    <h2>{{ equipment.nome }}</h2>

    <form class="formAdd">
        <div class="control">
            <label for="name">Name</label>
            <input id="name" autocomplete="off" v-model.lazy="equipment.nome" />
        </div>

        <div class="control">
            <label for="ip">IP</label>
            <input id="ip" autocomplete="off" v-model.lazy="equipment.ip" />
        </div>

        <div class="control">
            <label for="user">User`</label>
            <input id="user" autocomplete="off" v-model.lazy="equipment.usuario" />
        </div>

        <div class="control">
            <label for="password">Password</label>
            <input id="password" autocomplete="off" v-model.lazy="equipment.senha" />
        </div>

        <div class="control">
            <label for="type">Type</label>
            <input id="type" autocomplete="off" v-model.lazy="equipment.tipo" />
        </div>

        <div class="control">
            <label for="primaryRtsp">Primary RTSP</label>
            <input id="primaryRtsp" autocomplete="off" v-model.lazy="equipment.primaryRtsp" />
        </div>

        <div class="control">
            <label for="secondaryRtsp">Second RTSP</label>
            <input id="secondaryRtsp" autocomplete="off" v-model.lazy="equipment.sencondRtsp" />
        </div>

        <div class="control">
            <label for="streamingPrimaryRtsp">Streaming RTSP</label>
            <input id="streamingPrimaryRtsp" autocomplete="off" v-model.lazy="equipment.primaryStreamRtsp" />
        </div>

        <div class="control">
            <label for="streamingSecondaryRtsp">Streaming RTSP</label>
            <input id="streamingSecondaryRtsp" autocomplete="off" v-model.lazy="equipment.secondStreamRtsp" />
        </div>

        <div class="control">
            <label for="name">Status</label>
            <input id="name" autocomplete="off" v-model.lazy="equipment.status" />
        </div>

        <div class="control">
            <label for="name">Date Time</label>
            <input id="name" autocomplete="off" v-model.lazy="equipment.dateTime" />
        </div>

        <b-form-group label="Grupos Disponíveis:" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="groupsToAdd"
            :options="groups"
            value-field="id"
            text-field="nome"
            :aria-describedby="ariaDescribedby"
            name="flavour-1"
            stacked
            >
            </b-form-checkbox-group>
            <div>
                Grupos: <strong>{{ groupsToAdd }}</strong>
            </div>
        </b-form-group>


       <b-form-group label="Equipamentos Adicionados:" v-slot="{ ariaDescribedby }">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="groupsToRemove"
          :options="equipment.groups"
          value-field="id"
          text-field="nome"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
          stacked
        >
        </b-form-checkbox-group>
        <div>
            Grupos: <strong>{{ groupsToRemove }}</strong>
        </div>
      </b-form-group>
      
      <div class="btnArea">
        <myButton type="button" :title="$i18n.t('update')" buttonStyle="primary" @buttonAction="updateRelations()"></myButton>
        <myButton type="button" :title="$i18n.t('remove')" buttonStyle="danger" @buttonAction="remove()"/>
        <myButton type="button" :title="$i18n.t('save')"  buttonStyle="success" @buttonAction="update()"/>
        <myButton type="button" :title="$i18n.t('return')" buttonStyle="light" pageLink="/group"/>
      </div>
    </form>
    


  </div>
</template>


<script>
import Button from "../shared/button/Button.vue";
import Equipment from "../../domain/equipment/Equipment";
import GroupService from "../../domain/group/GroupService";
import EquipmentService from "../../domain/equipment/EquipmentService"

export default {
  components: {
    myButton: Button,
  },

  props: {
    id: 0,
    row: '',
  },

  
  data() {
    return {
      equipment: new Equipment(),
      groups: [],
      groupsToAdd: [],
      groupsToRemove: [],
    };
  },


  methods: {

    update() {

      console.log(JSON.stringify(this.group));

      this.equipmenteService
        .update(this.equipment)
        .then((equipment) => {
          this.equipment = equipment;
          this.$emit('addAction', { row: this.row, equipment: this.equipment });
        }, (err) => console.log(err));  


    },

    updateRelations() {

      var addGroups = [];
      var rmvGroups = [];

      for(var counter = 0; counter < this.groupsToAdd.length; counter++) {

        this.group.equipments.forEach((group => {
          if(group.id === this.groupsToAdd[0]) {
            this.equipment.groups.push(group);
            addGroups.push(group);
          }
        }))
      }

      this.groups = this.groups.filter(group => {
        return !addGroups.includes(group);
      })

      for(var counter = 0; counter < this.groupsToRemove.length; counter++) {

        this.group.equipments.forEach((group => {
          if(group.id === this.groupsToRemove[0]) {
  
            this.groups.push(group);
            rmvGroups.push(group);
          }
        }))

      }

      this.group.equipments = this.group.equipments.filter(group => {
        return !rmvGroups.includes(group);
      })

      this.groupsToAdd = [];
      this.groupsToRemove = [];
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