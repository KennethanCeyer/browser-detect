/*
 * Copyright (c) PIGNOSE 2017-2018 All Rights Reserved.
 * This package is under MIT License
 *
 * @ Author PIGNOSE <kenneth@pigno.se>
 *
 * For more information, Check the follow link
 * https://github.com/KennethanCeyer/browser-detect
 */

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
