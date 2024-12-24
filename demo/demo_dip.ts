import { INotifier, IMsgStorage } from "./interfaces/index";
import { EmailNotification, MySQLMsgStorage, SMSNotification } from "./repo/index";

class NotificationDIPService  {
    // dependency injection by constructor
    constructor(
        private notifier: INotifier,
        private dbStorage: IMsgStorage) {}

    // dependency injection by setter
    setNotifier(n: INotifier) {
        this.notifier = n;
    }

    sendMessage(msg: string): void {
        this.notifier.send(msg);
        this.dbStorage.save(msg);
    }
}

// setup dependency
const smsNotifier = new SMSNotification();
const msgStorage = new MySQLMsgStorage();
const service = new NotificationDIPService(smsNotifier, msgStorage);
service.setNotifier(new EmailNotification());

// run your business
service.sendMessage("Hello");