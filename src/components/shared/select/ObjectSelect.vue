<template>
    <div  class="specialControl">
        <label class="labelChild" for="vehicle">{{ $i18n.t(name) }}</label>
        <b-form-select :disabled="disabled"  class="formChild mb-2" v-model="element" @change="change" >
            <option v-for="dataValue in data" :value="dataValue.id">
                <label v-if="dataValue.title">{{dataValue.title}}</label>
                <label v-else-if="dataValue.name">{{dataValue.name}}</label>
            </option>  
        </b-form-select>
        <myButton class="controlChild mb-2" type="button" :title="computedShowInfo"  buttonStyle="secondary" @buttonAction="toggleInfo"/>
        <div v-if="showInfo">
            <component class="componentChild" :is="currentComponent" :id="element" @addAction="update" @removeAction="remove"></component>
        </div>
    </div>
</template>


<script>
import {i18n} from '../../../lang/lang';
import Button from "../../shared/button/Button.vue";
import GroupComponent from '../../group/GroupInfo.vue';
import EquipmentComponent from '../../equipment/EquipmentInfo.vue';
import UserComponent from '../../user/UserInfo.vue';
import ProfileComponent from '../../profile/ProfileInfo.vue';
import ServerComponent from '../../server/ServerInfo.vue';
import VisitorComponent from '../../visitor/VisitorInfo.vue'; 
import VehicleComponent from '../../vehicle/VehicleInfo.vue';
import PeriodComponent from '../../period/PeriodInfo.vue';
import ScheduleComponent from '../../schedule/ScheduleInfo.vue';
import PermanentComponent from '../../permanent/PermanentInfo.vue';

export default {

    components: {
        myButton: Button,
        GroupComponent : GroupComponent,
        EquipmentComponent: EquipmentComponent,
        UserComponent: UserComponent,
        ProfileComponent: ProfileComponent,
        ServerComponent: ServerComponent,
        VisitorComponent: VisitorComponent,
        VehicleComponent: VehicleComponent,
        PeriodComponent: PeriodComponent,
        ScheduleComponent: ScheduleComponent,
        PermanentComponent: PermanentComponent,
    },

    props: {
        disabled: false,
        name: '',
        selectedComponent: '',
        dt: [],
        el: {},
    },

    data() {
        return { 
            countDown: 3,
            showInfo: false,
            currentComponent : this.selectedComponent,
            data: this.dt,
            element: this.el,
        }
    },

    computed : {
        computedShowInfo() {
            return this.showInfo ? i18n.t('hide') : i18n.t('show');
        }
    },

    methods: {

        toggleInfo() {
            this.showInfo = !this.showInfo;
        },

        change() {
            var reopen = false

            if(this.showInfo) {
                this.toggleInfo();
                reopen = true;
            }

            console.log(this.element);
            this.data.forEach((el) => {
                if(el.id === this.element) {
                    this.$emit('change', el);
                }
            })

            if(reopen) {
                setTimeout(() => {
                    this.showInfo = !this.showInfo;
                }, 100)
            }

        },

        update(newElement) {
            console.log(newElement);
            if(!newElement.update) {
                console.log("new");
                this.$emit('change', newElement.value);
                this.data[this.data.length-1] = newElement.value;
                this.data.push(newElement.element);
            } else {
                this.data.forEach((element, index, array) => {
                    console.log(element);
                    if(element.id === newElement.value.id) {
                        array[index] = newElement.value;
                    }
                })
            }

            this.element = newElement.value.id;
            this.toggleInfo();
        },

        remove(element) {
            this.toggleInfo();

            this.data = this.data.filter((el) => {
                if(el.id != element.value.id) {
                    return el;
                }
            })

            this.$emit('change', {});

        },

        countDownTimer () {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.data = this.dt,
                    this.element = this.el,
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
    },

    created() {
        this.countDownTimer();
    }

}

</script>


<style scoped>

    .formAdd {
        display: flex;
        flex-direction: column;
        width: 300px;
    }

    .formChild {
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

    .controlChild {
        width: 30%;
        padding: 10px;
        margin: 0 auto;
        min-height: 50px;
    }

    .labelChild {
        margin-right: 35%;
    }

    .componentChild {
        border: 1px solid;
        border-radius: 3px;
        padding: 10px;
        border-color: #6c757d;
    }


</style>