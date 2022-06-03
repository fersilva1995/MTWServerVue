<template>
  <div>
    <h2>{{ element.title }}</h2>

    <b-form class="formClass" inline>
        <div class="specialControl mb-2 mr-2 ml-2">
            <label for="title">{{ $i18n.t('title') }}</label>
            <input class="specialControl" id="title" autocomplete="off" v-model.lazy="element.title" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="mondayStartTime">{{ $i18n.t('mondayStartTime') }}</label>
            <input type="time" id="mondayStartTime" autocomplete="off" v-model.lazy="element.mondayStartTime" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
            <label for="mondayEndTime">{{ $i18n.t('mondayEndTime') }}</label>
            <input type="time" id="mondayEndTime" autocomplete="off" v-model.lazy="element.mondayEndTime" />
        </div>

        <div class="control mb-2 mr-2 ml-2">
          <label for="tuesdayStartTime">{{ $i18n.t('tuesdayStartTime') }}</label>
          <input type="time" id="tuesdayStartTime" autocomplete="off" v-model.lazy="element.tuesdayStartTime" />
        </div>

      
        <div class="control mb-2 mr-2 ml-2">
          <label for="tuesdayEndTime">{{ $i18n.t('tuesdayEndTime') }}</label>
          <input type="time" id="tuesdayEndTime" autocomplete="off" v-model.lazy="element.tuesdayEndTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="wednesdayStartTime">{{ $i18n.t('wednesdayStartTime') }}</label>
          <input type="time" id="wednesdayStartTime" autocomplete="off" v-model.lazy="element.wednesdayStartTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="wednesdayEndTime">{{ $i18n.t('wednesdayEndTime') }}</label>
          <input type="time" id="wednesdayEndTime" autocomplete="off" v-model.lazy="element.wednesdayEndTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="thursdayStartTime">{{ $i18n.t('thursdayStartTime') }}</label>
          <input type="time" id="thursdayStartTime" autocomplete="off" v-model.lazy="element.thursdayStartTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="thursdayEndTime">{{ $i18n.t('thursdayEndTime') }}</label>
          <input type="time" id="thursdayEndTime" autocomplete="off" v-model.lazy="element.thursdayEndTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="fridayStartTime">{{ $i18n.t('fridayStartTime') }}</label>
          <input type="time" id="fridayStartTime" autocomplete="off" v-model.lazy="element.fridayStartTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="fridayEndTime">{{ $i18n.t('fridayEndTime') }}</label>
          <input type="time" id="fridayEndTime" autocomplete="off" v-model.lazy="element.fridayEndTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="saturdayStartTime">{{ $i18n.t('saturdayStartTime') }}</label>
          <input type="time" id="saturdayStartTime" autocomplete="off" v-model.lazy="element.saturdayStartTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="saturdayEndTime">{{ $i18n.t('saturdayEndTime') }}</label>
          <input type="time" id="saturdayEndTime" autocomplete="off" v-model.lazy="element.saturdayEndTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="sundayStartTime">{{ $i18n.t('sundayStartTime') }}</label>
          <input type="time" id="sundayStartTime" autocomplete="off" v-model.lazy="element.sundayStartTime" />
        </div>



        <div class="control mb-2 mr-2 ml-2">
          <label for="sundayEndTime">{{ $i18n.t('sundayEndTime') }}</label>
          <input type="time" id="sundayEndTime" autocomplete="off" v-model.lazy="element.sundayEndTime" />
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
import Element from "../../domain/schedule/Schedule";
import Service from "../../domain/schedule/ScheduleService"

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

      console.log("update schedule");
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
    width: 22%;
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