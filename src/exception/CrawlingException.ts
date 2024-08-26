
export default class CrawlingExeption extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CrawlingExeption';
        Object.setPrototypeOf(this, CrawlingExeption.prototype);
    }
}