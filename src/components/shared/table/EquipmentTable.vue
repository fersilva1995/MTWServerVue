<template>
  <div>
    <b-table small striped :items="items" :dark="true">
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
          key: "id",
          label: "ID",
        },
        {
          key: "login",
          label: "Login",
        },
        {
          key: "profileType",
          label: "Perfil",
          sortable: true,
        },
      ],
      items: [],
    };
  },

  created() {
    this.$http
      .get("http://172.16.2.133/equipments")
      .then((res) => res.json())
      .then(function(items) { 
          this.items = items; 
          console.log(this.items);
      },
        (err) => console.log(err)
      );
  },
};
</script>