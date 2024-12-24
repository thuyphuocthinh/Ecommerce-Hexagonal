class NotificationService {
    private dbStorage: MsgStorage = new MsgStorage();

    constructor(readonly type: 'sms' | 'email') {}

    sendMessage(msg: string): void {
        if(this.type === "sms") {
        // complex code here for sending sms
            console.log("Send with SMS: ", msg);
        } else {
            // complex code here for sending email
            console.log("Send with Email: ", msg);
        }
        this.dbStorage.save(msg);
    }
}

class MsgStorage {
    save(msg: string): string {
        return "ok";
    }
}