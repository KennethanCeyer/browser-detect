function browserDetector(navigator) {
    if (typeof navigator === 'undefined' && typeof process === 'undefined') {
        throw 'Please give navigator.\n' +
              '> browser(navigator or window.navigator)';
    }
    else if (typeof process !== 'undefined') {
        return {
            name: 'node',
            version: process.version.slice(1)
        };
    }

    // * Referenced DamonOehlman/detect-browser
    var browsers = [
        ['edge', /Edge\/([0-9\._]+)/],
        ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
        ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
        ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
        ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
        ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
        ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
        ['ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
        ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
        ['ie', /MSIE\s(7\.0)/],
        ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
        ['android', /Android\s([0-9\.]+)/],
        ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
        ['safari', /Version\/([0-9\._]+).*Safari/]
    ];

    return browsers
        .filter(element => {
            return element[1].test(navigator.userAgent);
        })
        .map(element => {
            var match = element[1].exec(navigator.userAgent);
            var version = match && match[1].split(/[._]/).slice(0, 3);
            var versionTails = Array.prototype.slice.call(version, 1).join('') || '0';

            if (version && version.length < 3) {
                Array.prototype.push.apply(version, (version.length === 1) ? [0, 0] : [0]);
            }

            return {
                name: element[0],
                version: version.join('.'),
                versionNumber: parseFloat(version[0] + '.' + versionTails)
            };
        }).shift();
};

define(['polyfills'], () => {
    return browserDetector;
});
