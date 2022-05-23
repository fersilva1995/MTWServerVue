export default class Equipment {

    constructor(name='', ip='', user='', password='', type='', primaryRtsp = '', secondaryRtsp = '', streamingPrimaryRtsp = '', streamingSecondaryRtsp = '', status='', dateTime='') {

        this.nome = name;
        this.ip = ip;
        this.usuario = user;
        this.senha = password;
        this.tipo = type;
        this.primaryRtsp = primaryRtsp;
        this.sencondRtsp = secondaryRtsp;
        this.primaryStreamRtsp = streamingPrimaryRtsp;
        this.sencondRtsp = streamingSecondaryRtsp;
        this.status = status;
        this.dateTime = dateTime;
    }
}