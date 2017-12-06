export declare type BrowserDefinition = Array<string | RegExp>;
export interface OsDefinitionImpl {
    name: string;
    pattern: string;
    value?: RegExpExecArray | null;
}
export declare type OsDefinition = OsDefinitionImpl | string;
export declare type OsVersionMapDefinition = {
    [key: string]: string;
};
export interface BrowserDetectInfo {
    name?: string;
    version?: string;
    versionNumber?: number;
    mobile?: boolean;
    os?: string;
}
declare function browserDetector(userAgent: string): BrowserDetectInfo;