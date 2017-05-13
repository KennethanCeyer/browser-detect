define(['browser-detect'], (browserDetect) => {
    return (_userAgent) => {
        var userAgent;
        if (typeof _userAgent === 'undefined') {
            var navigator = (typeof window !== 'undefined'? window.navigator : navigator);
            if (typeof navigator === 'undefined') {
                userAgent = undefined;
            }
            else {
                userAgent = (navigator.userAgent || navigator.vendor);
            }
        }
        else {
            userAgent = _userAgent;
        }
        return browserDetect(userAgent);
    };
});