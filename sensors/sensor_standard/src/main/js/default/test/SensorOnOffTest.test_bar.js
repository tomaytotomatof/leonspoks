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
import sensor from '@ohos.sensor'

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'

describe("SensorJsTest", function () {
    beforeAll(function () {

        /*
         * @tc.setup: setup invoked before all testcases
         */
        console.info('beforeAll caled')
    })

    afterAll(function () {

        /*
         * @tc.teardown: teardown invoked after all testcases
         */
        console.info('afterAll caled')
    })

    beforeEach(function () {

        /*
         * @tc.setup: setup invoked before each testcases
         */
        console.info('beforeEach caled')
    })

    afterEach(function () {

        /*
         * @tc.teardown: teardown invoked after each testcases
         */
        console.info('afterEach caled')
    })

    /*
     * @tc.name:SensorJsTest001
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest001", 0, async function (done) {
        console.info('----------------------SensorJsTest001---------------------------');
        function offPromise() {
            return new Promise((resolve, reject) => {
                sensor.off(sensor.SensorType.SENSOR_TYPE_ID_BAROMETER, (error) => {
                    if (error) {
                        console.info('SensorJsTest001  off error');
                        expect(false).assertTrue();
                        console.info('setTimeout ..start')
                        setTimeout((err) => {
                            reject(err);
                        }, 500);
                    } else {
                        console.info('SensorJsTest001  off success');
                        expect(true).assertTrue();
                        setTimeout(() => {
                            resolve();
                        }, 500);
                    }
                }, 1000)
            })
        }

        let promise = new Promise((resolve, reject) => {
            sensor.on(sensor.SensorType.SENSOR_TYPE_ID_BAROMETER, function (error, data) {
                if (error) {
                    console.info('SensorJsTest001  on error');
                    expect(false).assertTrue();
                    setTimeout((err) => {
                        reject(err);
                    }, 500);
                } else {
                    console.info('SensorJsTest001  on success pressure: ' + data.pressure);
                    expect(typeof (data.pressure)).assertEqual("number");
                    setTimeout(() => {
                        resolve();
                    }, 500);
                }
            });
        })

        await promise.then(() => {
            return offPromise();
        }, () => {
            console.info("SensorJsTest001 reject");
        })
        done();
    })

    /*
     * @tc.name:SensorJsTest005
     * @tc.desc:verify app info is not null
     * @tc.type: FUNC
     * @tc.require: Issue Number
     */
    it("SensorJsTest005", 0, async function (done) {
        function onceSensorCallback(error, data) {
            if (error) {
                console.info('SensorJsTest005  once error');
                expect(false).assertTrue();
            } else {
                console.info('SensorJsTest005  once success pressure: ' + data.pressure);
                expect(typeof (data.pressure)).assertEqual("number");
            }
            setTimeout(() => {
                done();
            }, 500);
        }
        sensor.once(sensor.SensorType.SENSOR_TYPE_ID_BAROMETER, onceSensorCallback);
    })
})
