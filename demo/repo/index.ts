import { IMsgStorage, INotifier } from "../interfaces/index";

export class SMSNotification implements INotifier{
    send(msg: string): void {
        // complex code for sending SMS
        // import SMS gateway libs
        console.log("Send with SMS: ", msg);
    }
}

export class EmailNotification implements INotifier {
    send(msg: string): void {
        // complex code for sending Email
        // import Email gateway libs
        console.log("Send with Email: ", msg);
    }
}

export class MySQLMsgStorage implements IMsgStorage {
    save(msg: string): string {
        console.log("Save message: ", msg);
        return "ok";
    }
}