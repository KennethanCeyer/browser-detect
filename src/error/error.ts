class DetectorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DetectorError';
        this.stack = (<any> new Error()).stack;
        (<any>Object).setPrototypeOf(this, DetectorError.prototype);
    }
}
