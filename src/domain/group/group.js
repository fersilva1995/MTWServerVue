export default class Group {

    constructor(name='', time='', equipments=[], users=[], servers=[]) {
        this.id = 0;
        this.name = name;
        this.time = time;
        this.equipments = [];
        this.users = [];
        this.servers = [];
    }
}