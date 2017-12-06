// Start polyfills
import 'core-js/fn/array/filter';
import 'core-js/fn/array/map';
import 'core-js/fn/string/trim';
// End polyfills

import { BrowserDefinition, BrowserDetectInfo, OsDefinitionImpl, OsDefinition } from './interface';
import { browsers, os, osVersions } from './pattern';

const navigatorImpl = (typeof window !== 'undefined')
    ? window.navigator
    : null;

function browserDetector(userAgent: string): BrowserDetectInfo {
    let passUserAgent: string = userAgent;
    if (!userAgent)
        passUserAgent = !navigatorImpl
            ? ''
            : (navigatorImpl.userAgent || navigatorImpl.vendor);
    return runDetect(passUserAgent);
}

export = browserDetector;

if (typeof window === 'object')
    window['browser'] = browserDetector;

function runDetect(userAgent: string): BrowserDetectInfo {
    if (typeof process !== 'undefined' && !userAgent) {
        const version: string[] = process
            .version
            .slice(1)
            .split('.')
            .slice(0, 3);
        const versionTails: string = Array.prototype.slice.call(version, 1).join('') || '0';

        return {
            name: 'node',
            version: version.join('.'),
            versionNumber: parseFloat(version[0] + '.' + versionTails),
            mobile: false,
            os: process.platform,
        };
    }

    if (!userAgent) {
        throw 'Please give user-agent.\n' +
              '> browser(navigator.userAgent or res.headers[\'user-agent\']).';
    }

    return {
        ...checkBrowser(userAgent),
        ...checkMobile(userAgent),
        ...checkOs(userAgent),
    };
}

function checkBrowser(userAgent: string): BrowserDetectInfo {
    // * Referenced DamonOehlman/detect-browser
    return browsers
        .filter((element: BrowserDefinition) => {
            return (element[1] as RegExp).test(userAgent);
        })
        .map((element: BrowserDefinition) => {
            const match: RegExpExecArray = (element[1] as RegExp).exec (userAgent);
            const version: string[] = match && match[1].split(/[._]/).slice(0, 3);
            const versionTails: string = Array.prototype.slice.call(version, 1).join('') || '0';

            if (version && version.length < 3) {
                Array.prototype.push.apply(version, (version.length === 1) ? [0, 0] : [0]);
            }

            return {
                name: element[0] as string,
                version: version.join('.'),
                versionNumber: parseFloat(version[0] + '.' + versionTails),
            };
        })
        .shift();
}

function checkMobile(userAgent: string): BrowserDetectInfo {
    // * Referenced Mktg-Dept/detectmobilebrowsers
    /* tslint:disable:align */
    return {
        mobile: (
            new RegExp(
                '(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|' +
                'compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|' +
                'midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)' +
                '\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|' +
                'wap|windows ce|xda|xiino',
                'i')
                    .test(userAgent) ||
            new RegExp(
                '1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\\-)|' +
                'ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\\-m|r |s )|' +
                'avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\\-(n|u)|c55\\/|capi|ccwa|cdm\\-|' +
                'cell|chtm|cldc|cmd\\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\\-s|devi|dica|dmob|do(c|p)o|' +
                'ds(12|\\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\\-|_)|' +
                'g1 u|g560|gene|gf\\-5|g\\-mo|go(\\.w|od)|gr(ad|un)|haie|hcit|hd\\-(m|p|t)|hei\\-|' +
                'hi(pt|ta)|hp( i|ip)|hs\\-c|ht(c(\\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\\-(20|go|ma)|' +
                'i230|iac( |\\-|\\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|' +
                'kddi|keji|kgt( |\\/)|klon|kpt |kwc\\-|kyo(c|k)|le(no|xi)|lg( g|\\/(k|l|u)|50|54|\\-[a-w])|' +
                'libw|lynx|m1\\-w|m3ga|m50\\/|ma(te|ui|xo)|mc(01|21|ca)|m\\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|' +
                'mo(01|02|bi|de|do|t(\\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|' +
                'n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|' +
                'owg1|p800|pan(a|d|t)|pdxg|pg(13|\\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\\-2|po(ck|rt|se)|prox|' +
                'psio|pt\\-g|qa\\-a|qc(07|12|21|32|60|\\-[2-7]|i\\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\\/|' +
                'sa(ge|ma|mm|ms|ny|va)|sc(01|h\\-|oo|p\\-)|sdk\\/|se(c(\\-|0|1)|47|mc|nd|ri)|sgh\\-|shar|sie(\\-|m)|' +
                'k\\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\\-|v\\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|' +
                'ta(gt|lk)|tcl\\-|tdg\\-|tel(i|m)|tim\\-|t\\-mo|to(pl|sh)|ts(70|m\\-|m3|m5)|tx\\-9|up(\\.b|g1|si)|' +
                'utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|' +
                'w3c(\\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\\-|your|zeto|zte\\-'
                , 'i')
                    .test(userAgent.substr(0, 4))
        ),
    };
    /* tslint:enable:align */
}

function checkOs(userAgent: string): BrowserDetectInfo {
    // * Referenced bestiejs/platform.js
    return os
        .map((element: OsDefinition) => {
            const name: string = (element as OsDefinitionImpl).name || element as string;
            const pattern: string = (
                (
                    typeof element === 'string'
                        ? element as string
                        : null
                ) ||
                (element as OsDefinitionImpl).pattern ||
                name
            );
            return {
                name,
                pattern,
                value: RegExp(`\\b${
                    pattern.replace(/([ -])(?!$)/g, '$1?')
                }(?:x?[\\d._]+|[ \\w.]*)`,
                              'i').exec(userAgent),
            } as OsDefinitionImpl;
        })
        .filter((element: OsDefinitionImpl) => {
            return element.value;
        })
        .map((element: OsDefinitionImpl) => {
            let os: string = element.value[0] || '';
            let osSuffix: string;

            if (
                element.pattern &&
                element.name &&
                /^Win/i.test(os) &&
                !/^Windows Phone /i.test(os) &&
                (osSuffix = osVersions[os.replace(/[^\d.]/g, '')])
            ) {
                os = `Windows ${osSuffix}`;
            }

            if (element.pattern && element.name) {
                os = os.replace(RegExp(element.pattern, 'i'), element.name);
            }

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

            return {
                os,
            };
        })
        .shift();
}
