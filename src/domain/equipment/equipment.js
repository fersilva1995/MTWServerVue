export default class Equipment {

    constructor(name='', ip='', user='', password='', type='', primaryRtsp = '', secondaryRtsp = '', streamingPrimaryRtsp = '', streamingSecondaryRtsp = '', status='', dateTime='') {

        this.id = 0;
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