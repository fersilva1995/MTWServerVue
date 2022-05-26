<template>
    <b-container fluid>
        <b-row>
            <b-col cols="6">
                <h5 class="title">{{ $i18n.t('availableEquipments')}}</h5>
                <b-form-input  v-model="filterAvailableData" type="search" placeholder="Type to Search"></b-form-input>
                <filterInput @filterData="(filterData) => {this.filterAvailableData = filterData}"></filterInput>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="5">
                <b-table :filter="filterAvailableData" :filter-included-fields="filterOn" ref="tableAvailable"  class="mb-2 mr-sm-2 mb-sm-0" :sticky-header="stickyHeader" :no-border-collapse="noCollapse" :items="avaiableElements" :fields="fields" :dark="dark" table-variant="secondary">
                    <template #head(details)="data">
                        <b-form-checkbox v-model="allAvailableStatus" @change="changeAllAvaiable"></b-form-checkbox>
                    </template>
                    <template #cell(details)="row">
                        <b-form-checkbox v-model="elementsToAdd[row.index]" :value="row.item.id" unchecked-value=null></b-form-checkbox>
                    </template>         
                </b-table>
            </b-col>
            <b-col align-self="center" cols="2">
                <myButton type="button" :title="$i18n.t('update')" buttonStyle="primary" @buttonAction="update()"></myButton>
            </b-col>
            <b-col cols="5">
                <b-table ref="tableInserted" class="table mb-2 mr-sm-2 mb-sm-0" :sticky-header="stickyHeader" :no-border-collapse="noCollapse" :items="insertedElements" :fields="fields" :dark="dark" table-variant="secondary">
                    <template #head(details)="data">
                        <b-form-checkbox v-model="allInsertedStatus" @change="changeAllInsert"></b-form-checkbox>
                    </template>
                    <template #cell(details)="row">
                        <b-form-checkbox v-model="elementsToRemove[row.index]" :value="row.item.id" unchecked-value=null></b-form-checkbox>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>


<script>
import Button from "../../shared/button/Button.vue";
import FilterInput from "../input/filterInput.vue";

export default {
    components: {
        myButton: Button,
        filterInput: FilterInput,
    },

    props: {
        initAvaiableElements: [],
        initInsertedElements: [],
    },

    data() {


        return {

            insertedElements: this.initAvaiableElements,
            avaiableElements: this.initInsertedElements,
            elementsToAdd: [],
            elementsToRemove: [],
            allAvailableStatus: false,
            allInsertedStatus: false,
            filterAvailableData: '',
            filterOn: ["id", "name"],
            dark: true,
            fields: [
                {
                    key: "id", 
                    label:"Id"
                }, 
                {
                    key: "name", 
                    label:"Nome"
                },
                {
                    key: "details", 
                    label: "Details"
                }
            ],
            stickyHeader: true,
            noCollapse: false,
            countDown: 3,

        };
    },

    methods: {

        changeAllAvaiable(checked) {
            console.log(checked);

            for(var counter = 0; counter < this.avaiableElements.length; counter++) {
                if(checked) {
                    this.elementsToAdd[counter] = this.avaiableElements[counter].id;                  
                } else {
                    this.elementsToAdd[counter] = null;    
                }
            }

            console.log(this.elementsToAdd);
            this.$refs.tableAvailable.refresh();
        },

        changeAllInsert(checked) {
            console.log(checked);

            for(var counter = 0; counter < this.insertedElements.length; counter++) {
                if(checked) {
                    this.elementsToRemove[counter] = this.insertedElements[counter].id;                  
                } else {
                    this.elementsToRemove[counter] = null;    
                }
            }

            console.log(this.elementsToRemove);
            this.$refs.tableInserted.refresh();
        },


        update() {
            var add = [];
            var rmv = [];

            for(var counter = 0; counter < this.elementsToAdd.length; counter++) {

                this.avaiableElements.forEach((el => {
                    if(el.id === this.elementsToAdd[counter]) {
                        this.insertedElements.push(el);
                        add.push(el);
                    }
                }))
            }

            this.avaiableElements = this.avaiableElements.filter(el => {
                return !add.includes(el);
            })

            for(var counter = 0; counter < this.elementsToRemove.length; counter++) {

                this.insertedElements.forEach((el => {
                    if(el.id === this.elementsToRemove[counter]) {
                        this.avaiableElements.push(el);
                        rmv.push(el);
                    }
                }))

            }

            this.insertedElements = this.insertedElements.filter(el => {
                return !rmv.includes(el);
            })

            this.elementsToAdd = [];
            this.elementsToRemove = [];
            this.allAvailableStatus = false;
            this.allInsertedStatus = false;

            this.$emit('updateRelation', { elements: this.insertedElements});
        },

        countDownTimer () {
            if (this.countDown > 0) {
                setTimeout(() => {
                    this.insertedElements = this.initInsertedElements,
                    this.avaiableElements = this.initAvaiableElements,
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        }

    },


    created() {
        this.countDownTimer(); 
    }
}

</script>

<style scoped>

.title {
    padding: 10px;
}
.table {
    height: 100%;
}

</style>