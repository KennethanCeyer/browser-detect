/*
 * Copyright (c) PIGNOSE 2017-2018 All Rights Reserved.
 * This package is under MIT License
 *
 * @ Author PIGNOSE <kenneth@pigno.se>
 *
 * For more information, Check the follow link
 * https://github.com/KennethanCeyer/browser-detect
 */

import { BrowserDetect } from './browser-detect.interface';
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

export default function (userAgent?: string): BrowserDetect {
    const detector = new Detector(userAgent, injectableNavigator, injectableProcess);
    return detector.detect();
}
