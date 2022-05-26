<template>
    <b-col lg="6" class="my-1">
    <b-form-group
        label="Filter"
        label-for="filter-input"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        class="mb-0"
    >
        <b-input-group size="sm">
        <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Type to Search"
        ></b-form-input>

        <b-input-group-append>
            <b-button @click="filter=''">Clear</b-button>
        </b-input-group-append>
        </b-input-group>
    </b-form-group>
    </b-col>
</template>

<script>

export default {

    data() {
        return {
            filter: '',
        }
    },

    computed: {
        filterData() {
            console.log(this.filter);
            this.$emit('filterData', this.filter)
        }
    },

}

</script>