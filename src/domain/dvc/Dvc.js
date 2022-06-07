import Equipment from '../equipment/Equipment'

export default class Server extends Equipment {

    constructor() {
        super();
        this.id = 0;
        this.serialNumber = '';
        this.function = '';
        this.user = '';
        this.operationalSystem = '';
        this.videoEnable = false;
        this.audioEnable = true;
        this.permanentStream = false;
        this.statusDateTime = new Date();
    }
}