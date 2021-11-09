/*
 * Copyright (c) PIGNOSE 2017-2018 All Rights Reserved.
 * This package is under MIT License
 *
 * @ Author PIGNOSE <kenneth@pigno.se>
 *
 * For more information, Check the follow link
 * https://github.com/KennethanCeyer/browser-detect
 */

import { BrowserDetect } from '../browser-detect.interface';
import { Handler } from '../error/handler';
import { errorType } from '../error/type';
import Process = NodeJS.Process;

export class Parser {
    constructor(private process?: Process) {
    }

    public parse(userAgent: string): BrowserDetect {
        if (!userAgent && !this.process)
            Handler.throw(errorType.MISSING);

        return this.process
            ? this.parseNode()
            : this.parseUserAgent(userAgent);
    }

    private parseNode(): BrowserDetect {
        const version = this.process.version.slice(1).split('.').slice(0, 3);
        const versionTail = Array.prototype.slice.call(version, 1).join('') || '0';

        return {
            name: 'node',
            version: version.join('.'),
            versionNumber: parseFloat(`${version[0]}.${versionTail}`),
            mobile: false,
            os: this.process.platform
        };
    }

    private parseUserAgent(userAgent: string): BrowserDetect {

        // TODO: Do some magick here
        return {};
    }
}
