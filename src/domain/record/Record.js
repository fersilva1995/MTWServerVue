
import Equipment from '../equipment/Equipment'

export default class Record extends Equipment{

    constructor() {
        super();
        this.id = 0;
        this.recordPath = '';
        this.duration = 5;
        this.remoteUser = '';
        this.remotePassword = '';

    }
}





