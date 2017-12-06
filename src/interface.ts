export type BrowserDefinition = (string | RegExp)[];

export interface OsDefinitionImpl {
    name: string;
    pattern: string;
    value?: RegExpExecArray | null;
}

export type OsDefinition = OsDefinitionImpl | string;

export type OsVersionMapDefinition = {[key: string]: string};

export interface BrowserDetectInfo {
    name?: string;
    version?: string;
    versionNumber?: number;
    mobile?: boolean;
    os?: string;
}
