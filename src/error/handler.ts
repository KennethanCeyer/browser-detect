import {errorType} from './type';

const missingError = 'Please give user-agent.\n' +
                     '> browser(navigator.userAgent or res.headers[\'user-agent\']).';

export class Handler {
    static readonly error: {[key: string]: string} = {
        MISSING: missingError
    };

    public static throw(type: string): void {
        throw this.error[type];
    }
}
