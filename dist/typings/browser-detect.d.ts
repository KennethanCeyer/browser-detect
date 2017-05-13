interface BrowserDetectModel {
    name: String;
    version: String | Number;
}

interface BrowserDetect {
    (navigator?: Navigator): BrowserDetectModel;
}

declare var browser: BrowserDetect;