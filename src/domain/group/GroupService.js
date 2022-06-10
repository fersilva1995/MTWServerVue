export default class Service {

    constructor(resource, session) {
        this._resource = resource('Groups{/id}{/userId}');
        this._session = session;

    }

    list() {

        return this._resource
                .query({userId: this._session.get('loggedId')})
                .then(res => res.json(), err => {
                    console.log(err);
                    throw new Error(err.message);
                });
    }

    update(element) {
        
        if(element.id) {
            return this._resource.update( {id: element.id, userId: this._session.get('loggedId')}, element);
        } else {
            return this._resource.save(element).then(res => res.json(), err => {
                console.log(err);
                throw new Error(err.message);
            });;
        }

    }


    erase(id) {

        return this._resource
            .delete( { id , userId: this._session.get('loggedId')} )
            .then(null, err => {
                console.log(err);
                throw new Error(err.message);
            });
        
    }

    search(id) {
        console.log(session);
        return this._resource
            .get({id, userId: this._session.get('loggedId')})
            .then(res => res.json());
    }


}