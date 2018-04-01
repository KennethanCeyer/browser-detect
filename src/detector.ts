import { BrowserDetectInfo, OsDefinition, OsDefinitionInterface } from './browser-detect.interface';
import { browsers, os, osVersions } from './definitions';
import { mobilePrefixRegExp, mobileRegExp } from './regexp';
import Process = NodeJS.Process;

export class Detector {
    private userAgent: string;

    public constructor(
        userAgent: string,
        private navigator?: Navigator,
        private process?: Process
    ) {
        this.userAgent = userAgent
            ? userAgent
            : this.navigator ? (navigator.userAgent || navigator.vendor) : '';
    }

    public detect(): BrowserDetectInfo {
        if (this.process && !this.userAgent) {
            const version = this.process.version.slice(1) .split('.').slice(0, 3);
            const versionTail = Array.prototype.slice.call(version, 1).join('') || '0';

            return {
                name: 'node',
                version: version.join('.'),
                versionNumber: parseFloat(`${version[0]}.${versionTail}`),
                mobile: false,
                os: this.process.platform
            };
        }

        if (!this.userAgent)
            this.handleMissingError();

        return {
            ...this.checkBrowser(),
            ...this.checkMobile(),
            ...this.checkOs()
        };
    }

    private checkBrowser(): BrowserDetectInfo {
        return browsers
            .filter(definition => (<RegExp>definition[1]).test(this.userAgent))
            .map(definition => {
                const match = (<RegExp>definition[1]).exec(this.userAgent);
                const version = match && match[1].split(/[._]/).slice(0, 3);
                const versionTails = Array.prototype.slice.call(version, 1).join('') || '0';

                if (version && version.length < 3)
                    Array.prototype.push.apply(version, version.length === 1 ? [0, 0] : [0]);

                return {
                    name: String(definition[0]),
                    version: version.join('.'),
                    versionNumber: Number(`${version[0]}.${versionTails}`)
                };
            })
            .shift();
    }

    private checkMobile(): BrowserDetectInfo {
        const agentPrefix = this.userAgent.substr(0, 4);
        const mobile = mobileRegExp.test(this.userAgent) || mobilePrefixRegExp.test(agentPrefix);
        return { mobile };
    }

    private checkOs(): BrowserDetectInfo {
        return os
            .map(definition => {
                const name = (<OsDefinitionInterface>definition).name || <string>definition;
                const pattern = this.getOsPattern(definition);

                return {
                    name,
                    pattern,
                    value: RegExp(
                        `\\b${
                            pattern.replace(/([ -])(?!$)/g, '$1?')
                            }(?:x?[\\d._]+|[ \\w.]*)`,
                        'i'
                    ).exec(this.userAgent)
                };
            })
            .filter(definition => definition.value)
            .map(definition => {
                let os = definition.value[0] || '';
                let osSuffix: string;

                if (
                    definition.pattern &&
                    definition.name &&
                    /^Win/i.test(os) &&
                    !/^Windows Phone /i.test(os) &&
                    (osSuffix = osVersions[os.replace(/[^\d.]/g, '')])
                )
                    os = `Windows ${osSuffix}`;

                if (definition.pattern && definition.name)
                    os = os.replace(RegExp(definition.pattern, 'i'), definition.name);

                os = os
                    .replace(/ ce$/i, ' CE')
                    .replace(/\bhpw/i, 'web')
                    .replace(/\bMacintosh\b/, 'Mac OS')
                    .replace(/_PowerPC\b/i, ' OS')
                    .replace(/\b(OS X) [^ \d]+/i, '$1')
                    .replace(/\bMac (OS X)\b/, '$1')
                    .replace(/\/(\d)/, ' $1')
                    .replace(/_/g, '.')
                    .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                    .replace(/\bx86\.64\b/gi, 'x86_64')
                    .replace(/\b(Windows Phone) OS\b/, '$1')
                    .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                    .split(' on ')[0]
                    .trim();

                os = /^(?:webOS|i(?:OS|P))/.test(os)
                    ? os
                    : (os.charAt(0).toUpperCase() + os.slice(1));

                return { os };
            })
            .shift();
    }

    private getOsPattern(definition: OsDefinition): string {
        const definitionInterface = <OsDefinitionInterface>definition;
        return (
            typeof definition === 'string'
                ? <string>definition
                : undefined
        ) ||
        definitionInterface.pattern ||
        definitionInterface.name;
    }

    private handleMissingError() {
        throw new Error('Please give user-agent.\n> browser(navigator.userAgent or res.headers[\'user-agent\']).');
    }
}
