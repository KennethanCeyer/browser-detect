/*
 * Copyright (c) PIGNOSE 2017-2018 All Rights Reserved.
 * This package is under MIT License
 *
 * @ Author PIGNOSE <kenneth@pigno.se>
 *
 * For more information, Check the follow link
 * https://github.com/KennethanCeyer/browser-detect
 */

class DetectorError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DetectorError';
        this.stack = (<any> new Error()).stack;
        (<any>Object).setPrototypeOf(this, DetectorError.prototype);
    }
}
