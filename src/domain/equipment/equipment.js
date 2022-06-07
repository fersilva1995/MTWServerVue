export default class Equipment {

    constructor(id=0, name='', ip='', user='', password='', type=0, primaryRtsp = '', secondaryRtsp = '', streamingPrimaryRtsp = '', streamingSecondaryRtsp = '', status=true, dateTime = new Date()) {

        this.id = id;
        this.name = name;
        this.ip = ip;
        this.user = user;
        this.password = password;
        this.tipo = type;
        this.primaryRtsp = primaryRtsp;
        this.sencondaryRtsp = secondaryRtsp;
        this.primaryStreamingRtsp = streamingPrimaryRtsp;
        this.sencondaryStreamingRtsp = streamingSecondaryRtsp;
        this.status = status;
        this.dateTime = dateTime;
        this.groups = [];
    }
}