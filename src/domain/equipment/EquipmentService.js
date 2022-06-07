export default class Service {

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

    update(element) {
        
        if(element.id) {
            return this._resource.update( {id: element.id}, element);
        } else {
            return this._resource.save(element);
        }

    }


    erase(id) {

        return this._resource
            .delete( { id , userId: 1} )
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