interface BrowserDetectModel {
    name: String;
    version: String;
    versionNumber: Number;
    mobile: Boolean;
    os: String;
}

interface BrowserDetect {
    (navigator?: Navigator): BrowserDetectModel;
}

declare var browser: BrowserDetect;