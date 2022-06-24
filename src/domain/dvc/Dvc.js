import Equipment from '../equipment/Equipment'

export default class Server extends Equipment {

    constructor(equipment=new Equipment()) {
        super(equipment.id, equipment.name, equipment.ip, equipment.user, equipment.password, 
            equipment.tipo, equipment.primaryRtsp, equipment.secondaryRtsp, equipment.streamingPrimaryRtsp, 
            equipment.streamingSecondaryRtsp, equipment.status, equipment.dateTime);
        this.serialNumber = '';
        this.function = '';
        this.user = '';
        this.operationalSystem = '';
        this.videoEnable = false;
        this.audioEnable = true;
        this.permanentStream = false;
        this.statusDateTime = new Date();
        this.telemetry = {};
        this.server = {};
    }
}