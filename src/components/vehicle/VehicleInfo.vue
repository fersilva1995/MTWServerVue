<template>
  <div>
    <h2>{{ element.title }}</h2>
    <b-form inline>
      <div class="control mb-2 mr-2 ml-2">
        <label for="brand">{{ $i18n.t('brand') }}</label>
        <input class="control" id="brand" autocomplete="off" v-model.lazy="element.brand" />
      </div>

      <div class="control mb-2 mr-2 ml-2">
        <label for="title">{{ $i18n.t('title') }}</label>
        <input class="control" id="title" autocomplete="off" v-model.lazy="element.title" />
      </div>
    </b-form>

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
import Element from "../../domain/vehicle/Vehicle";
import Service from "../../domain/vehicle/VehicleService"

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

      console.log("update vehicle");
      var el = this.element;
      console.log(JSON.stringify(el));
   
      this.service
      .update(el)
      .then((element) => {
        console.log(element);
        if(this.element.id <= 0) {
          this.element = element;
          this.$emit('addAction', { row: this.row, value: this.element, update: false, element: new Element(i18n.t('newVehicle'))});
        } else {
          this.$emit('addAction', { row: this.row, value: this.element, update: true, element: new Element(i18n.t('newVehicle'))});
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