/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import power from '@ohos.power';

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'

describe('appInfoTest', function () {
    console.log("*************Power Unit Test Begin*************");
    it('power_is_screen_on_promise_test', 0, async function (done) {//isScreenOn(): Promise<boolean>
        power.wakeupDevice("power_is_screen_on_promise_test");
        power.isScreenOn()
            .then(screenOn => {
                console.info('power_is_screen_on_promise_test screenOn is ' + screenOn);
                expect(screenOn).assertTrue();
                console.info('power_is_screen_on_promise_test success');
                done();
            })
            .catch(error => {
                console.log('power_is_screen_on_promise_test error: ' + error);
                expect().assertFail();
                done();
            })
    })
    it('power_is_screen_on_callback_test', 0, async function (done) {//isScreenOn(callback: AsyncCallback<boolean>)
        power.wakeupDevice("power_is_screen_on_callback_test");
        power.isScreenOn((error, screenOn) => {
            if (typeof error === "undefined") {
                console.info('power_is_screen_on_callback_test screenOn is ' + screenOn);
                expect(screenOn).assertTrue();
                console.info('power_is_screen_on_callback_test success');
                done();
            } else {
                console.log('power_is_screen_on_callback_test: ' + error);
                expect().assertFail();
                done();
            }
        })
    })
    it('power_wakeupDevice_test_string', 0, async function (done) {//wakeupDevice(detail: string): void
        power.isScreenOn()
            .then(screenOn => {
                console.info('power_wakeupDevice_test_string: The current screenOn is ' + screenOn);
                if (screenOn) {
                    power.suspendDevice();
                }  
            })
            .catch(error => {
                console.log('power_wakeupDevice_test_string error: ' + error);
                expect().assertFail();
                done();
            })
        setTimeout(function(){
            power.wakeupDevice("power_wakeupDevice_test_string");
            power.isScreenOn()
            .then(screenOn => {
                console.info('power_wakeupDevice_test_string: The current screenOn is ' + screenOn);
                expect(screenOn).assertTrue();
                console.info('power_wakeupDevice_test_string success');
                done();
            })
            .catch(error => {
                console.log('power_wakeupDevice_test_string error: ' + error);
                expect().assertFail();
                done();
            })
        }, 2000); 
    })
    it('power_suspendDevice_test', 0, async function (done) {//function suspendDevice(): void;
        power.isScreenOn()
            .then(screenOn => {
                console.info('power_suspendDevice_test: The current screenOn is ' + screenOn);
                if (!screenOn) { 
                    power.wakeupDevice("power_suspendDevice_test");
                } 
            })
            .catch(error => {
                console.log('power_suspendDevice_test error: ' + error);
                expect().assertFail();
                done();
            })
        setTimeout(function(){
            power.suspendDevice();
            console.info('power_suspendDevice_test: SuspendDevice end');
            power.isScreenOn()
            .then(screenOn => {
                console.info('power_suspendDevice_test: The current screenOn is ' + screenOn);
                expect(screenOn).assertFalse();
                console.info('power_suspendDevice_test success');
                done();
            })
            .catch(error => {
                console.log('power_suspendDevice_test error: ' + error);
                expect().assertFail();
                done();
            })
        }, 2000); 
    })
})
