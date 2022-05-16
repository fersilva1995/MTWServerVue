export default class Group {

    constructor(nome='', time='', equipments=[], users=[], servers=[]) {
        this.id = 0;
        this.nome = nome;
        this.time = time;
        this.equipments = [];
        this.users = [];
        this.servers = [];
    }
}