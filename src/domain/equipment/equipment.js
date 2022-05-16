export default class Equipment {

    constructor(name='', ip='', user='', password='', type='', primaryRtsp = '', secondaryRtsp = '', streamingPrimaryRtsp = '', streamingSecondaryRtsp = '', status='', dateTime='') {

        this.name = name;
        this.ip = ip;
        this.user = user;
        this.password = password;
        this.type = type;
        this.primaryRtsp = primaryRtsp;
        this.secondaryRtsp = secondaryRtsp;
        this.streamingPrimaryRtsp = mainPrimaryRtsp;
        this.streamingSecondaryRtsp = secondarySecondaryRtsp;
        this.status = status;
        this.dateTime = dateTime;
    }
}