
import Equipment from '../equipment/Equipment'

export default class Server extends Equipment{

    constructor() {
        super();
        this.id = 0;
        this.telemetryServer = '';
        this.lprServer = '';
        this.masterEyeServer = '';
        this.digifortServer = '';
        this.recordServer = '';
        this.sessionServer = '';
        this.rtspServer = '';
        this.serverGroups = [];
        this.serverEquipments = [];
    }
}


