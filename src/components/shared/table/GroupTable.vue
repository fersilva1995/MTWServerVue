<template>
  <div>
    <b-table :items="items" :fields="fields" dark 
    borderless striped small responsive="sm">
      <template #cell(equipamentos)="row">
        <b-button pill variant="secondary" size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? "Esconder" : "Mostrar" }}
        </b-button>
        <b-button pill variant="danger" size="sm">
          Remover
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-3">
            <b-col sm="2" class="text-sm-left">Equipamentos:</b-col>
            <b-col>{{ row.item.equipments }}</b-col>
            <b-col sm="2" class="text-sm-left">Usuários:</b-col>
            <b-col>{{ row.item.users }}</b-col>
            <b-col sm="2" class="text-sm-left">Servers:</b-col>
            <b-col>{{ row.item.servers }}</b-col>
          </b-row>

          <b-row class="row">
            <b-col class="sm-4">
              <b-button pill variant="info">Editar</b-button>
            </b-col>
          </b-row>
        </b-card>
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
          key: "nome",
          label: "Nome",
        },
        {
          key: "time",
          label: "Tempo",
        },        
        {
          key: "equipamentos",
          label: "Equipamentos"
        },
      ],
        items: [
          // { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
           { equipments: [], users: [], servers: [] }, 
        ]
      }
    },
  }
</script>