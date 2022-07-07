export default class Group {

    constructor(name='', time=0, type = '') {
        this.id = 0;
        this.name = name;
        this.time = time;
        this.type = type;
        this.equipments = [];
        this.users = [];
        this.servers = [];
        this.subgroups = [];
    }
}