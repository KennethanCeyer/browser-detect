import { BrowserDefinition, OsDefinition, OsVersion } from './browser-detect.interface';

export const browsers: BrowserDefinition[] = [
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
    ['edge', /Edge\/([0-9\._]+)/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/]
];

export const os: OsDefinition[] = [
    'Windows Phone',
    'Android',
    'CentOS',
    { name: 'Chrome OS', pattern: 'CrOS' },
    'Debian',
    'Fedora',
    'FreeBSD',
    'Gentoo',
    'Haiku',
    'Kubuntu',
    'Linux Mint',
    'OpenBSD',
    'Red Hat',
    'SuSE',
    'Ubuntu',
    'Xubuntu',
    'Cygwin',
    'Symbian OS',
    'hpwOS',
    'webOS ',
    'webOS',
    'Tablet OS',
    'Tizen',
    'Linux',
    'Mac OS X',
    'Macintosh',
    'Mac',
    'Windows 98;',
    'Windows '
];

export const osVersions: OsVersion = {
    '10.0': '10',
    '6.4': '10 Technical Preview',
    '6.3': '8.1',
    '6.2': '8',
    '6.1': 'Server 2008 R2 / 7',
    '6.0': 'Server 2008 / Vista',
    '5.2': 'Server 2003 / XP 64-bit',
    '5.1': 'XP',
    '5.01': '2000 SP1',
    '5.0': '2000',
    '4.0': 'NT',
    '4.90': 'ME'
};
