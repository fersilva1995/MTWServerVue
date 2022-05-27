export default class GroupService {

    constructor(resource) {
        this._resource = resource('Users{/id}');

    }

    list() {

        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error(err.message);
            });
    }

    update(group) {
        
        if(group.id) {
            return this._resource.update( {id: group.id}, group);
        } else {
            return this._resource.save(group).then(res => res.json(), err => {
                console.log(err);
                throw new Error(err.message);
            });;
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