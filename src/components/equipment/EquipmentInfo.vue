<template>
  <div>
    <h2 class="title">{{ element.name }}</h2>

    <b-form inline>
        <div class="control mb-2 mr-2 ml-2">
            <label for="name">{{$i18n.t('name')}}</label>
            <input id="name" autocomplete="off" v-model.lazy="element.name" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="ip">{{$i18n.t('ip')}}</label>
            <input id="ip" autocomplete="off" v-model.lazy="element.ip" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="user">{{$i18n.t('user')}}</label>
            <input id="user" autocomplete="off" v-model.lazy="element.user" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="password">{{$i18n.t('password')}}</label>
            <input id="password" autocomplete="off" v-model.lazy="element.password" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="type">{{$i18n.t('type')}}</label>
            <b-form-select class="selectControl" v-model="element.tipo" :options="options"></b-form-select>
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="primaryRtsp">{{$i18n.t('primaryRtsp')}}</label>
            <input id="primaryRtsp" autocomplete="off" v-model.lazy="element.primaryRtsp" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="secondaryRtsp">{{$i18n.t('secondaryRtsp')}}</label>
            <input id="secondaryRtsp" autocomplete="off" v-model.lazy="element.sencondaryRtsp" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="streamingPrimaryRtsp">{{$i18n.t('streamingPrimaryRtsp')}}</label>
            <input id="streamingPrimaryRtsp" autocomplete="off" v-model.lazy="element.primaryStreamingRtsp" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="streamingSecondaryRtsp">{{$i18n.t('streamingSecondaryRtsp')}}</label>
            <input id="streamingSecondaryRtsp" autocomplete="off" v-model.lazy="element.sencondaryStreamingRtsp" />
        </div>
    </b-form>

    <relationTable :initAvaiableElements="groups" :initInsertedElements="element.groups" @updateRelation="(elements) => { this.element.groups = elements.elements }"></relationTable>
    
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
import Element from "../../domain/equipment/Equipment";
import GroupService from "../../domain/group/GroupService";
import Service from "../../domain/equipment/EquipmentService"

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
      groups: [],
      options: [
        "Vazio",
        "Camera",
        "Switch",
        "Computador",
        "Modem",
        "Roteador",
        "Servidor",
        "Telefone",
        "Telemetria",
        "GateWay",
        "Radio",
        "Medidor",
        "NVR",
        "DVR",
        "HD",
        "Terminal",
        "DVC",
        "Micro-Computador",
        "Outro"
      ],
    };
  },


  methods: {
    
    updateRelation(elements) {
      console.log(elements.elements);
      this.element.groups = elements.elements;
    },

    update() {

      console.log("update equipments");
      this.element.tipo = this.options.indexOf(this.element.tipo);
      this.element.status = true;
      this.element.dateTime = new Date();

      this.element.groups.forEach((el => {
        el.equipments = [];
      }));

      console.log(JSON.stringify(this.element));
    
      this.service
        .update(this.element)
        .then((equipment) => {
          if(this.element.id <= 0) {
            this.element = equipment;
            this.$emit('addAction', { row: this.row, value: this.element, update: false, element: new Element()});
          } else {
            this.$emit('addAction', { row: this.row, value: this.element, update: true, element: new Element()});
          }
        }, (err) => console.log(err));  
    },

    remove() {
     
      this.service
        .erase(this.id)
        .then(() => {  
          this.$emit('removeAction', { row: this.row, value: this.element });  
          this.element = new Element()     
        }
        ,(err) => console.log(err));
    }
  },

  created() {

    this.service = new Service(this.$resource, this.$session);
    this.groupService = new GroupService(this.$resource, this.$session);

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {

          console.log(element);
          console.log(this.options);
          this.element = element;
          this.element.tipo = this.options[this.element.tipo];

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

.selectControl {
  width: 100%;
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