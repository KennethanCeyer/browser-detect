import { BrowserDetect } from './browser-detect.interface';
import { Parser } from './parser/parser';
import Process = NodeJS.Process;

export class Detector {
    private readonly parser: Parser;
    public constructor(
        private readonly userAgent: string,
        private navigator?: Navigator,
        private process?: Process
    ) {
        this.parser = new Parser(process);
        this.userAgent = userAgent
            ? userAgent
            : this.navigator ? (navigator.userAgent || navigator.vendor) : '';
    }

    public detect(): BrowserDetect {
        return this.parser.parse(this.userAgent);
    }
}
