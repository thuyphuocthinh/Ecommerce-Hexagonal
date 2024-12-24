export interface IMsgStorage {
    save(msg: string): string;
}

export interface INotifier {
    send(msg: string): void;
}