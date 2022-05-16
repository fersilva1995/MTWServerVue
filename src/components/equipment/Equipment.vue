<template>
  <div>
    <h1>Equipamentos</h1>
    <addButton
      type="button"
      title="Adicionar"
      @buttonAction="Add()"
      buttonStyle="primary"
      pageLink="equipmentAdd"
    />
    <equipment-table></equipment-table>
  </div>
</template>

<script>
import EquipmentTable from "../shared/table/EquipmentTable.vue";
import Button from "../shared/button/Button.vue";

export default {
  components: {
    equipmentTable: EquipmentTable,
    addButton: Button,
  },
};
</script>

<style>
</style>