
import Equipment from '../equipment/Equipment'

export default class Server extends Equipment{

    constructor(equipment=new Equipment()) {
        super(equipment.id, equipment.name, equipment.ip, equipment.user, equipment.password, 
                equipment.tipo, equipment.primaryRtsp, equipment.secondaryRtsp, equipment.streamingPrimaryRtsp, 
                equipment.streamingSecondaryRtsp, equipment.status, equipment.dateTime);
        this.id = equipment.id;
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


