<template>
  <div>
    <b-table small striped :items="items" :fields="fields" :dark="true">
      <template #cell(profileType)="data">
        {{ data.item.profile.name }}
      </template>
    </b-table>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        fields: [
          {
            key: 'id',
            label: 'ID',
            sortable: true
          },
          {
            key: 'login',
            label: 'Login'
          },
          {
            key: 'profileType',
            label: 'Perfil',
            sortable: true
          }
        ],
        items: [
        ]
      }
    },

    created() {
      this.$http.get('http://172.16.2.170:83/api/Users')
        .then(res => res.json())
        .then(items => this.items = items, err => console.log(err));
    }
  }
</script>
