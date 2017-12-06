import browser = require('./browser-detect');
import { expect } from 'chai';
import 'mocha';
import { BrowserDetectInfo } from './interface';

describe('Browser dection', () => {
    describe('browserDetect', () => {
        it('detects Chrome on Windows 10', () => {
            const userAgent: string = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                'Chrome/62.0.3202.94 Safari/537.36';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('chrome');
            expect(browserResult.os).to.equal('Windows 10');
            expect(browserResult.version).to.equal('62.0.3202');
            expect(browserResult.versionNumber).to.equal(62.03202);
        });

        it('detects Edge on Windows 10', () => {
            const userAgent: string = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                'Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('edge');
            expect(browserResult.os).to.equal('Windows 10');
            expect(browserResult.version).to.equal('13.10586.0');
            expect(browserResult.versionNumber).to.equal(13.10586);
        });

        it('detects Internet Explorer 11.0 on Windows 10', () => {
            const userAgent: string = '5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; ' +
                '.NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; ' +
                'Tablet PC 2.0; printmade=3.0.0.7; rv:11.0) like Gecko';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('ie');
            expect(browserResult.os).to.equal('Windows 10');
            expect(browserResult.version).to.equal('11.0.0');
            expect(browserResult.versionNumber).to.equal(11);
        });

        it('detects Firefox on Windows 10', () => {
            const userAgent: string = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('firefox');
            expect(browserResult.os).to.equal('Windows 10');
            expect(browserResult.version).to.equal('56.0.0');
            expect(browserResult.versionNumber).to.equal(56);
        });

        it('detects Opera on Windows 10', () => {
            const userAgent: string = '5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)' +
                ' Chrome/62.0.3202.89 Safari/537.36 OPR/49.0.2725.47';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('opera');
            expect(browserResult.os).to.equal('Windows 10');
            expect(browserResult.version).to.equal('49.0.2725');
            expect(browserResult.versionNumber).to.equal(49.02725);
        });

        it('detects Whale on Windows 10', () => {
            const userAgent: string = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
                'Chrome/60.0.3112.113 Whale/1.0.37.16 Safari/537.36';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('chrome');
            expect(browserResult.os).to.equal('Windows 10');
            expect(browserResult.version).to.equal('60.0.3112');
            expect(browserResult.versionNumber).to.equal(60.03112);
        });

        it('detects Chrome on MacOS', () => {
            const userAgent: string =
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) ' +
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3205.0 Safari/537.36';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('chrome');
            expect(browserResult.os).to.equal('OS X 10.11.6');
            expect(browserResult.version).to.equal('63.0.3205');
            expect(browserResult.versionNumber).to.equal(63.03205);
        });

        it('detects Chrome on ChromeOS', () => {
            const userAgent: string = 'Mozilla/5.0 (X11; CrOS x86_64 9765.73.0) ' +
            'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.110 Safari/537.36';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.false;
            expect(browserResult.name).to.equal('chrome');
            expect(browserResult.os).to.equal('Chrome OS x86_64');
            expect(browserResult.version).to.equal('61.0.3163');
            expect(browserResult.versionNumber).to.equal(61.03163);
        });

        it('detects Safari on iPhone 6 (Mobile)', () => {
            const userAgent: string = '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 ' +
                '(KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.true;
            expect(browserResult.name).to.equal('safari');
            expect(browserResult.os).to.equal('OS X');
            expect(browserResult.version).to.equal('9.0.0');
            expect(browserResult.versionNumber).to.equal(9);
        });

        it('detects Chrome on Galaxy S5 (Mobile)', () => {
            const userAgent: string = '5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) ' +
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36';
            const browserResult: BrowserDetectInfo = browser(userAgent);

            expect(browserResult.mobile).to.true;
            expect(browserResult.name).to.equal('chrome');
            expect(browserResult.os).to.equal('Android 5.0');
            expect(browserResult.version).to.equal('62.0.3202');
            expect(browserResult.versionNumber).to.equal(62.03202);
        });
    });
});
