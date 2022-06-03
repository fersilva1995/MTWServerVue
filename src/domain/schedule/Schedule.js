export default class Schedule {

    constructor(title='') {
        this.id = 0;
        this.title = title;
        this.mondayStartTime = "00:00";
        this.mondayEndTime = "00:00";
        this.tuesdayStartTime = "00:00";
        this.tuesdayEndTime = "00:00";
        this.wednesdayStartTime = "00:00";
        this.wednesdayEndTime = "00:00";
        this.thursdayStartTime = "00:00";
        this.thursdayEndTime = "00:00";
        this.fridayStartTime = "00:00";
        this.fridayEndTime = "00:00";
        this.saturdayStartTime = "00:00";
        this.saturdayEndTime = "00:00";
        this.sundayStartTime = "00:00";
        this.sundayEndTime = "00:00";
    }
}