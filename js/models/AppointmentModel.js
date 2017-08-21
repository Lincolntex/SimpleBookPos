class AppointmentModel {
    constructor() {
        this.Title = String;
        this.CreationTime = Date;
        this.ScheduledTime = Date;
        this.Completed = Boolean;
        this.Estimate = Number;
        this.FinalCost = Number;
    }

    CreateAppointment(title, creation, scheduled, isComplete, estimate, total) {
        this.Title = title;
        this.CreationTime = creation;
        this.ScheduledTime = scheduled;
        this.Completed = isComplete;
        this.Estimate = estimate;
        this.FinalCost = total;
    }

    ToModel() {
        return {
            'Title' : this.Title,
            'CreationTime' : this.CreationTime,
            'ScheduledTime' : this.ScheduledTime,
            'IsComplete' : this.Completed,
            'Estimate' : this.Estimate,
            'FinalCost' : this.FinalCost
        }
    }

    _TestModel() {
        let rnd = Math.random() * (1000 - 1) + 1;

        return {
            'Title' : 'Title_' + rnd,
            'CreationTime' : Date.now(),
            'ScheduledTime' : Date.now(),
            'IsComplete' : (rnd % 2 == 0) ? true : false,
            'Estimate' : rnd,
            'FinalCost' : rnd + 100
        }
    }
}

module.exports.AppointmentModel = AppointmentModel;