export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length
    let result: string = '';
    const randomBuffer = new Uint32Array(length);
    crypto.getRandomValues(randomBuffer);
    for (let i = 0; i < length; i++) {
        result += characters.charAt(randomBuffer[i] % charactersLength);
    }
    return result;
}