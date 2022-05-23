export default class EquipmentService {

    constructor(resource) {
        this._resource = resource('equipments{/id}');

    }

    list() {

        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error(err.message);
            });
    }

    update(equipment) {
        
        if(equipment.id) {
            return this._resource.update( {equipment: equipment.id}, equipment);
        } else {
            return this._resource.save(equipment);
        }

    }


    erase(id) {

        return this._resource
            .delete( { id } )
            .then(null, err => {
                console.log(err);
                throw new Error(err.message);
            });
        
    }

    search(id) {

        return this._resource
            .get({id})
            .then(res => res.json());
    }


}