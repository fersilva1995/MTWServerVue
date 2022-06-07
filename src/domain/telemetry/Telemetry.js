
import Equipment from '../equipment/Equipment'

export default class Telemetry extends Equipment{

    constructor(equipment=new Equipment()) {
        super(equipment.id, equipment.name, equipment.ip, equipment.user, equipment.password, 
                equipment.tipo, equipment.primaryRtsp, equipment.secondaryRtsp, equipment.streamingPrimaryRtsp, 
                equipment.streamingSecondaryRtsp, equipment.status, equipment.dateTime);
        this.serialNumber = '';
        this.gateways = [];
    }
}


