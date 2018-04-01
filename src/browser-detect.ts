import { BrowserDetectInfo } from './browser-detect.interface';
import { Detector } from './detector';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/map';
import 'core-js/fn/string/trim';

export default function (userAgent: string): BrowserDetectInfo {
    const detector = new Detector(userAgent, navigator, process);
    return detector.detect();
}
