import { BrowserDetectInfo } from './browser-detect.interface';
import { Detector } from './detector';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/map';
import 'core-js/fn/string/trim';

const injectableNavigator = typeof window !== 'undefined'
    ? window.navigator
    : undefined;

const injectableProcess = typeof process !== 'undefined'
    ? process
    : undefined;

export default function (userAgent?: string): BrowserDetectInfo {
    const detector = new Detector(userAgent, injectableNavigator, injectableProcess);
    return detector.detect();
}
