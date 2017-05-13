define(['browser-detect'], (browserDetect) => {
    return () => {
        var navigator = (typeof window !== 'undefined'? window.navigator : navigator);
        return browserDetect(navigator);
    };
});