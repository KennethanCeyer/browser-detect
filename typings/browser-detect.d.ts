interface BrowserDetectModel {
    name: String;
    version: String;
    versionNumber: Number;
}

interface BrowserDetect {
    (navigator?: Navigator): BrowserDetectModel;
}

declare var browser: BrowserDetect;