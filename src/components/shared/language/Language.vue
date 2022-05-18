<template>
    <select v-model="$i18n.locale" @change="changeLanguage">
        <option value="en">English</option>
        <option value="br">Portuguese</option>
    </select>
</template>

<script>
export default {
    methods:{
        changeLanguage(obj){
            localStorage.setItem('language',obj.target.value)
        }
    }
}
</script>


<style>

</style>