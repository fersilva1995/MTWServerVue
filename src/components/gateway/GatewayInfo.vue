<template>
  <div>
    <h2>{{ element.gatewayIp }}</h2>

    <b-form class="formClass" inline>
      <div class="control mb-2 mr-2 ml-2">
        <label for="gatewayIp">{{ $i18n.t('gatewayIp') }}</label>
        <input id="gatewayIp" autocomplete="off" v-model.lazy="element.gatewayIp" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="gatewayPort">{{ $i18n.t('gatewayPort') }}</label>
        <input id="gatewayPort" autocomplete="off" v-model.lazy="element.gatewayPort" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="serverRemoto">{{ $i18n.t('serverRemoto') }}</label>
        <input id="serverRemoto" autocomplete="off" v-model.lazy="element.serverRemoto" />
      </div>
    </b-form>

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
import Element from "../../domain/gateway/Gateway";
import Service from "../../domain/gateway/GatewayService"

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
      element: new Element(),
    };
  },


  methods: {
    
    update() {

      console.log("update gateway");
      console.log(JSON.stringify(this.element));

      this.service
      .update(this.element)
      .then((element) => {
        if(this.element.id <= 0) {
          this.element = element.body;
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

    if(this.id) {
      this.service
        .search(this.id)
        .then(function(element) {
            console.log(element);
            this.element = element;
        });
    } 
  },
};
</script>


<style scoped>

.formClass {
  width: 100%;


}
.formAdd {
  display: flex;
  flex-direction: column;
  width: 300px;
}

.specialControl {
    width: 96%;
    padding: 5px;
}
.control {
    width: 33%;
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