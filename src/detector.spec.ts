import { expect } from 'chai';
import { Detector } from './detector';
import * as _ from 'lodash';
import Process = NodeJS.Process;

describe('test method: browser()', () => {
    it('should return node result with empty agent', () => {
        const fakeProcess = _.cloneDeep<Process>(process);
        fakeProcess.version = 'v1.0.0';
        fakeProcess.platform = 'openbsd';

        const detector = new Detector(undefined, undefined, fakeProcess);
        const result = detector.detect();

        expect(result.mobile).to.false;
        expect(result.name).to.equal('node');
        expect(result.os).to.equal('openbsd');
        expect(result.version).to.equal('1.0.0');
        expect(result.versionNumber).to.equal(1);
    });

    it('should throw an error with empty agent, navigator, process', () => {
        const detector = new Detector(undefined, undefined, undefined);
        expect(() => detector.detect())
            .to.throw('Please give user-agent.\n> browser(navigator.userAgent or res.headers[\'user-agent\']).');
    });
});
