/*
* Copyright (c) 2021 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'
import factory from '@ohos.data.distributedData'

const KEY_TEST_INT_ELEMENT = 'key_test_int';
const KEY_TEST_FLOAT_ELEMENT = 'key_test_float';
const KEY_TEST_BOOLEAN_ELEMENT = 'key_test_boolean';
const KEY_TEST_STRING_ELEMENT = 'key_test_string';
const KEY_TEST_SYNC_ELEMENT = 'key_test_sync';

const VALUE_TEST_INT_ELEMENT = 123;
const VALUE_TEST_FLOAT_ELEMENT = 321.12;
const VALUE_TEST_BOOLEAN_ELEMENT = true;
const VALUE_TEST_STRING_ELEMENT = 'value-string-001';
const VALUE_TEST_SYNC_ELEMENT = 'value-string-001';

const TEST_BUNDLE_NAME = 'ohos.acts.distributeddatamgr';
const TEST_STORE_ID = 'storeId';
var kvManager = null;
var kvStore = null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function putBatchString(len, prefix) {
    let entries = [];
    for (var i = 0; i < len; i++) {
        var entry = {
            key : prefix + i,
            value : {
                type : factory.ValueType.STRING,
                value : 'batch_test_string_value'
            }
        }
        entries.push(entry);
    }
    return entries;
}

describe('SingleKvStorePromiseTest', function () {
    const config = {
        bundleName : TEST_BUNDLE_NAME,
        userInfo : {
            userId : '0',
            userType : factory.UserType.SAME_USER_ID
        }
    }

    const options = {
        createIfMissing : true,
        encrypt : false,
        backup : false,
        autoSync : true,
        kvStoreType : factory.KVStoreType.SINGLE_VERSION,
        schema : '',
        securityLevel : factory.SecurityLevel.S2,
    }

    beforeAll(async function (done) {
        console.log('beforeAll config:'+ JSON.stringify(config));
        await factory.createKVManager(config).then((manager) => {
            kvManager = manager;
            console.log('beforeAll createKVManager success');
        }).catch((err) => {
            console.log('beforeAll createKVManager err ' + err);
        });
        console.log('beforeAll end');
        done();
    })

    afterAll(async function (done) {
        console.log('afterAll');
        kvManager = null;
        kvStore = null;
        done();
    })

    beforeEach(async function (done) {
        console.log('beforeEach' + JSON.stringify(options));
        await kvManager.getKVStore(TEST_STORE_ID, options).then((store) => {
            kvStore = store;
            console.log('beforeEach getKVStore success');
        }).catch((err) => {
            console.log('beforeEach getKVStore err ' + err);
        });
        console.log('beforeEach end');
        done();
    })

    afterEach(async function (done) {
        console.log('afterEach');
        await kvManager.closeKVStore(TEST_BUNDLE_NAME, TEST_STORE_ID, kvStore).then(async () => {
            console.log('afterEach closeKVStore success');
            await kvManager.deleteKVStore(TEST_BUNDLE_NAME, TEST_STORE_ID).then(() => {
                console.log('afterEach deleteKVStore success');
                kvStore = null;
            }).catch((err) => {
                console.log('afterEach deleteKVStore err ' + err);
            });
        }).catch((err) => {
            console.log('afterEach closeKVStore err ' + err);
        });
        done();
    })

    it('testSingleKvStorePutString001', 0, async function (done) {
        console.log('testSingleKvStorePutString001');
        try {
            await kvStore.put(KEY_TEST_STRING_ELEMENT, null).then((data) => {
                console.log('testSingleKvStorePutString001 put success');
                expect(null).assertFail();
            }).catch((error) => {
                console.log('testSingleKvStorePutString001 put error' + error);
            });
        } catch (e) {
            console.log('testSingleKvStorePutString001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutString002', 0, async function (done) {
        console.log('testSingleKvStorePutString002');
        try {
            await kvStore.put(KEY_TEST_STRING_ELEMENT, '').then((data) => {
                console.log('testSingleKvStorePutString002 put success');
                expect(data == undefined).assertTrue();
            }).catch((error) => {
                console.log('testSingleKvStorePutString002 put error' + error);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutString002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutString003', 0, async function (done) {
        console.log('testSingleKvStorePutString003');
        try {
            await kvStore.put(KEY_TEST_STRING_ELEMENT, VALUE_TEST_STRING_ELEMENT).then((data) => {
                console.log('testSingleKvStorePutString003 put success');
                expect(data == undefined).assertTrue();
            }).catch((error) => {
                console.log('testSingleKvStorePutString003 put error' + error);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutString003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutString004', 0, async function (done) {
        console.log('testSingleKvStorePutString004');
        try {
            var str = '';
            for (var i = 0 ; i < 4095; i++) {
                str += 'x';
            }
            await kvStore.put(KEY_TEST_STRING_ELEMENT, str).then(async (data) => {
                console.log('testSingleKvStorePutString004 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_STRING_ELEMENT).then((data) => {
                    console.log('testSingleKvStorePutString004 get success data ' + data);
                    expect(str == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutString004 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((error) => {
                console.log('testSingleKvStorePutString004 put error' + error);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutString004 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetString001', 0, async function (done) {
        console.log('testSingleKvStoreGetString001');
        try {
            await kvStore.put(KEY_TEST_STRING_ELEMENT, VALUE_TEST_STRING_ELEMENT).then(async (data) => {
                console.log('testSingleKvStoreGetString001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_STRING_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreGetString001 get success');
                    expect(VALUE_TEST_STRING_ELEMENT == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetString001 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((error) => {
                console.log('testSingleKvStoreGetString001 put error' + error);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreGetString001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetString002', 0, async function (done) {
        console.log('testSingleKvStoreGetString002');
        try {
            await kvStore.get(KEY_TEST_STRING_ELEMENT).then((data) => {
                console.log('testSingleKvStoreGetString002 get success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreGetString002 get fail ' + err);
            });
        } catch (e) {
            console.log('testSingleKvStoreGetString002 get e ' + e);
        }
        done();
    })

    it('testSingleKvStorePutInt001', 0, async function (done) {
        console.log('testSingleKvStorePutInt001');
        try {
            await kvStore.put(KEY_TEST_INT_ELEMENT, VALUE_TEST_INT_ELEMENT).then((data) => {
                console.log('testSingleKvStorePutInt001 put success');
                expect(data == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutInt001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutInt001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutInt002', 0, async function (done) {
        console.log('testSingleKvStorePutInt002');
        try {
            var intValue = 987654321;
            await kvStore.put(KEY_TEST_INT_ELEMENT, intValue).then(async (data) => {
                console.log('testSingleKvStorePutInt002 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_INT_ELEMENT).then((data) => {
                    console.log('testSingleKvStorePutInt002 get success');
                    expect(intValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutInt002 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutInt002 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutInt002 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutInt003', 0, async function (done) {
        console.log('testSingleKvStorePutInt003');
        try {
            var intValue = Number.MAX_VALUE;
            await kvStore.put(KEY_TEST_INT_ELEMENT, intValue).then(async (data) => {
                console.log('testSingleKvStorePutInt003 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_INT_ELEMENT).then((data) => {
                    console.log('testSingleKvStorePutInt003 get success');
                    expect(intValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutInt003 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutInt003 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutInt003 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutInt004', 0, async function (done) {
        console.log('testSingleKvStorePutInt004');
        try {
            var intValue = Number.MIN_VALUE;
            await kvStore.put(KEY_TEST_INT_ELEMENT, intValue).then(async (data) => {
                console.log('testSingleKvStorePutInt004 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_INT_ELEMENT).then((data) => {
                    console.log('testSingleKvStorePutInt004 get success');
                    expect(intValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutInt004 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutInt004 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutInt004 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetInt001', 0, async function (done) {
        console.log('testSingleKvStoreGetInt001');
        try {
            await kvStore.put(KEY_TEST_INT_ELEMENT, VALUE_TEST_INT_ELEMENT).then(async (data) => {
                console.log('testSingleKvStoreGetInt001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_INT_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreGetInt001 get success');
                    expect(VALUE_TEST_INT_ELEMENT == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetInt001 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetInt001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreGetInt001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBool001', 0, async function (done) {
        console.log('testSingleKvStorePutBool001');
        try {
            await kvStore.put(KEY_TEST_BOOLEAN_ELEMENT, VALUE_TEST_BOOLEAN_ELEMENT).then((data) => {
                console.log('testSingleKvStorePutBool001 put success');
                expect(data == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutBool001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutBool001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetBool001', 0, async function (done) {
        console.log('testSingleKvStoreGetBool001');
        try {
            var boolValue = false;
            await kvStore.put(KEY_TEST_BOOLEAN_ELEMENT, boolValue).then(async (data) => {
                console.log('testSingleKvStoreGetBool001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_BOOLEAN_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreGetBool001 get success');
                    expect(boolValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetBool001 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetBool001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreGetBool001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutFloat001', 0, async function (done) {
        console.log('testSingleKvStorePutFloat001');
        try {
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, VALUE_TEST_FLOAT_ELEMENT).then((data) => {
                console.log('testSingleKvStorePutFloat001 put success');
                expect(data == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutFloat001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStorePutFloat001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetFloat001', 0, async function (done) {
        console.log('testSingleKvStoreGetFloat001');
        try {
            var floatValue = 123456.654321;
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, floatValue).then(async (data) => {
                console.log('testSingleKvStoreGetFloat001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_FLOAT_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreGetFloat001 get success');
                    expect(floatValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetFloat001 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetFloat001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreGetFloat001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetFloat002', 0, async function (done) {
        console.log('testSingleKvStoreGetFloat002');
        try {
            var floatValue = 123456.0;
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, floatValue).then(async (data) => {
                console.log('testSingleKvStoreGetFloat002 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_FLOAT_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreGetFloat002 get success');
                    expect(floatValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetFloat002 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetFloat002 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreGetFloat002 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetFloat003', 0, async function (done) {
        console.log('testSingleKvStoreGetFloat003');
        try {
            var floatValue = 123456.00;
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, floatValue).then(async (data) => {
                console.log('testSingleKvStoreGetFloat003 put success');
                expect(data == undefined).assertTrue();
                await kvStore.get(KEY_TEST_FLOAT_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreGetFloat003 get success');
                    expect(floatValue == data).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetFloat003 get fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetFloat003 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreGetFloat003 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteString001', 0, async function (done) {
        console.log('testSingleKvStoreDeleteString001');
        try {
            var str = 'this is a test string';
            await kvStore.put(KEY_TEST_STRING_ELEMENT, str).then(async (data) => {
                console.log('testSingleKvStoreDeleteString001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.delete(KEY_TEST_STRING_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreDeleteString001 delete success');
                    expect(data == undefined).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteString001 delete fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteString001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreDeleteString001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteString002', 0, async function (done) {
        console.log('testSingleKvStoreDeleteString002');
        try {
            var str = '';
            for (var i = 0 ; i < 4096; i++) {
                str += 'x';
            }
            await kvStore.put(KEY_TEST_STRING_ELEMENT, str).then(async (data) => {
                console.log('testSingleKvStoreDeleteString002 put success');
                expect(data == undefined).assertTrue();
                await kvStore.delete(KEY_TEST_STRING_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreDeleteString002 delete success');
                    expect(data == undefined).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteString002 delete fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteString002 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreDeleteString002 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteString003', 0, async function (done) {
        console.log('testSingleKvStoreDeleteString003');
        try {
            await kvStore.delete(KEY_TEST_STRING_ELEMENT).then((data) => {
                console.log('testSingleKvStoreDeleteString003 delete success');
                expect(data == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteString003 delete fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreDeleteString003 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteInt001', 0, async function (done) {
        console.log('testSingleKvStoreDeleteInt001');
        try {
            await kvStore.put(KEY_TEST_INT_ELEMENT, VALUE_TEST_INT_ELEMENT).then(async (data) => {
                console.log('testSingleKvStoreDeleteInt001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.delete(KEY_TEST_INT_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreDeleteInt001 delete success');
                    expect(data == undefined).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteInt001 delete fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteInt001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreDeleteInt001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteFloat001', 0, async function (done) {
        console.log('testSingleKvStoreDeleteFloat001');
        try {
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, VALUE_TEST_FLOAT_ELEMENT).then(async (data) => {
                console.log('testSingleKvStoreDeleteFloat001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.delete(KEY_TEST_FLOAT_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreDeleteFloat001 delete success');
                    expect(data == undefined).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteFloat001 delete fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteFloat001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreDeleteFloat001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteBool001', 0, async function (done) {
        console.log('testSingleKvStoreDeleteBool001');
        try {
            await kvStore.put(KEY_TEST_BOOLEAN_ELEMENT, VALUE_TEST_BOOLEAN_ELEMENT).then(async (data) => {
                console.log('testSingleKvStoreDeleteBool001 put success');
                expect(data == undefined).assertTrue();
                await kvStore.delete(KEY_TEST_BOOLEAN_ELEMENT).then((data) => {
                    console.log('testSingleKvStoreDeleteBool001 delete success');
                    expect(data == undefined).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteBool001 delete fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteBool001 put fail ' + err);
                expect(null).assertFail();
            });
        } catch (e) {
            console.log('testSingleKvStoreDeleteBool001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOnChange001', 0, async function (done) {
        try {
            kvStore.on('dataChange', 0, function (data) {
                console.log('testSingleKvStoreOnChange001 ' + JSON.stringify(data));
                expect(data != null).assertTrue();
            });
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, VALUE_TEST_FLOAT_ELEMENT).then((data) => {
                console.log('testSingleKvStoreOnChange001 put success');
                expect(data == undefined).assertTrue();
            }).catch((error) => {
                console.log('testSingleKvStoreOnChange001 put fail ' + error);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreOnChange001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOnChange002', 0, async function (done) {
        try {
            kvStore.on('dataChange', 1, function (data) {
                console.log('testSingleKvStoreOnChange002 on ' + JSON.stringify(data));
                expect(data != null).assertTrue();
            });
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, VALUE_TEST_FLOAT_ELEMENT).then((data) => {
                console.log('testSingleKvStoreOnChange002 put success');
                expect(data == undefined).assertTrue();
            }).catch((error) => {
                console.log('testSingleKvStoreOnChange002 put fail ' + error);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreOnChange002 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOnChange003', 0, async function (done) {
        try {
            kvStore.on('dataChange', 2, function (data) {
                console.log('testSingleKvStoreOnChange003 ' + JSON.stringify(data));
                expect(data != null).assertTrue();
            });
            await kvStore.put(KEY_TEST_FLOAT_ELEMENT, VALUE_TEST_FLOAT_ELEMENT).then((data) => {
                console.log('testSingleKvStoreOnChange003 put success');
                expect(data == undefined).assertTrue();
            }).catch((error) => {
                console.log('testSingleKvStoreOnChange003 put fail ' + error);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreOnChange003 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOnSyncComplete001', 0, async function (done) {
        try {
            kvStore.on('syncComplete', function (data) {
                console.log('testSingleKvStoreOnSyncComplete001 0' + data)
                expect(data != null).assertTrue();
            });
            await kvStore.put(KEY_TEST_SYNC_ELEMENT, VALUE_TEST_SYNC_ELEMENT).then((data) => {
                console.log('testSingleKvStoreOnSyncComplete001 put success');
                expect(data == undefined).assertTrue();
                var devices = ['A12C1F9261528B21F95778D2FDC0B2E33943E6251AC5487F4473D005758905DB'];
                var mode = factory.SyncMode.PULL_ONLY;
                kvStore.sync(devices, mode, 10);
            }).catch((error) => {
                console.log('testSingleKvStoreOnSyncComplete001 put fail ' + error);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreOnSyncComplete001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOnSyncComplete002', 0, async function (done) {
        try {
            kvStore.on('syncComplete', function (data) {
                console.log('testSingleKvStoreOnSyncComplete002 0' + data)
                expect(data != null).assertTrue();
            });
            await kvStore.put(KEY_TEST_SYNC_ELEMENT, VALUE_TEST_SYNC_ELEMENT).then((data) => {
                console.log('testSingleKvStoreOnSyncComplete002 put success');
                expect(data == undefined).assertTrue();
                var devices = ['A12C1F9261528B21F95778D2FDC0B2E33943E6251AC5487F4473D005758905DB'];
                var mode = factory.SyncMode.PUSH_ONLY;
                kvStore.sync(devices, mode, 10);
            }).catch((error) => {
                console.log('testSingleKvStoreOnSyncComplete002 put fail ' + error);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreOnSyncComplete002 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOnSyncComplete003', 0, async function (done) {
        try {
            kvStore.on('syncComplete', function (data) {
                console.log('testSingleKvStoreOnSyncComplete003 0' + data)
                expect(data != null).assertTrue();
            });
            await kvStore.put(KEY_TEST_SYNC_ELEMENT, VALUE_TEST_SYNC_ELEMENT).then((data) => {
                console.log('testSingleKvStoreOnSyncComplete003 put success');
                expect(data == undefined).assertTrue();
                var devices = ['A12C1F9261528B21F95778D2FDC0B2E33943E6251AC5487F4473D005758905DB'];
                var mode = factory.SyncMode.PUSH_PULL;
                kvStore.sync(devices, mode, 10);
            }).catch((error) => {
                console.log('testSingleKvStoreOnSyncComplete003 put fail ' + error);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreOnSyncComplete003 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOffChange001', 0, async function (done) {
        console.log('testSingleKvStoreOffChange001');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffChange001 ' + JSON.stringify(data));
            };
            kvStore.on('dataChange', 0, func);
            kvStore.off('dataChange', func);
        }catch(e) {
            console.log('testSingleKvStoreOffChange001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOffChange002', 0, async function (done) {
        console.log('testSingleKvStoreOffChange002');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffChange002 ' + JSON.stringify(data));
            };
            var func1 = function (data) {
                console.log('testSingleKvStoreOffChange002 ' + JSON.stringify(data));
            };
            kvStore.on('dataChange', 0, func);
            kvStore.on('dataChange', 0, func1);
            kvStore.off('dataChange', func);
        }catch(e) {
            console.log('testSingleKvStoreOffChange002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOffChange003', 0, async function (done) {
        console.log('testSingleKvStoreOffChange003');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffChange003 0' + data)
            };
            var func1 = function (data) {
                console.log('testSingleKvStoreOffChange003 0' + data)
            };
            kvStore.on('dataChange', 0, func);
            kvStore.on('dataChange', 0, func1);
            kvStore.off('dataChange', func);
            kvStore.off('dataChange', func1);
        }catch(e) {
            console.log('testSingleKvStoreOffChange003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOffChange004', 0, async function (done) {
        console.log('testSingleKvStoreOffChange004');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffChange004 ' + JSON.stringify(data));
            };
            kvStore.on('dataChange', 0, func);
            kvStore.off('dataChange');
        }catch(e) {
            console.log('testSingleKvStoreOffChange004 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOffSyncComplete001', 0, async function (done) {
        console.log('testSingleKvStoreOffSyncComplete001');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffSyncComplete001 0' + data)
            };
            kvStore.on('syncComplete', func);
            kvStore.off('syncComplete', func);
        }catch(e) {
            console.log('testSingleKvStoreOffSyncComplete001 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreOffSyncComplete002', 0, async function (done) {
        console.log('testSingleKvStoreOffSyncComplete002');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffSyncComplete002 0' + data)
            };
            var func1 = function (data) {
                console.log('testSingleKvStoreOffSyncComplete002 0' + data)
            };
            kvStore.on('syncComplete', func);
            kvStore.on('syncComplete', func1);
            kvStore.off('syncComplete', func);
            expect(null).assertFail();
        }catch(e) {
            console.log('testSingleKvStoreOffSyncComplete002 put e ' + e);
            expect(true).assertTrue();
        }
        done();
    })

    it('testSingleKvStoreOffSyncComplete003', 0, async function (done) {
        console.log('testSingleKvStoreOffSyncComplete003');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffSyncComplete003 0' + data)
            };
            var func1 = function (data) {
                console.log('testSingleKvStoreOffSyncComplete003 0' + data)
            };
            kvStore.on('syncComplete', func);
            kvStore.on('syncComplete', func1);
            kvStore.off('syncComplete', func);
            kvStore.off('syncComplete', func1);
            expect(null).assertFail();
        }catch(e) {
            console.log('testSingleKvStoreOffSyncComplete003 put e ' + e);
            expect(true).assertTrue();
        }
        done();
    })

    it('testSingleKvStoreOffSyncComplete004', 0, async function (done) {
        console.log('testSingleKvStoreOffSyncComplete004');
        try {
            var func = function (data) {
                console.log('testSingleKvStoreOffSyncComplete004 0' + data)
            };
            kvStore.on('syncComplete', func);
            kvStore.off('syncComplete');
        }catch(e) {
            console.log('testSingleKvStoreOffSyncComplete004 put e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreSetSyncRange001', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncRange001');
        try {
            var localLabels = ['A', 'B'];
            var remoteSupportLabels = ['C', 'D'];
            await kvStore.setSyncRange(localLabels, remoteSupportLabels).then((err) => {
                console.log('testSingleKvStoreSetSyncRange001 setSyncRange success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteString003 delete fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncRange001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreSetSyncRange002', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncRange002');
        try {
            var localLabels = ['A', 'B'];
            var remoteSupportLabels = ['B', 'C'];
            await kvStore.setSyncRange(localLabels, remoteSupportLabels).then((err) => {
                console.log('testSingleKvStoreSetSyncRange002 setSyncRange success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreSetSyncRange002 delete fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncRange002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreSetSyncRange003', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncRange003');
        try {
            var localLabels = ['A', 'B'];
            var remoteSupportLabels = ['A', 'B'];
            await kvStore.setSyncRange(localLabels, remoteSupportLabels).then((err) => {
                console.log('testSingleKvStoreSetSyncRange003 setSyncRange success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreSetSyncRange003 delete fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncRange003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBatch001', 0, async function (done) {
        console.log('testSingleKvStorePutBatch001');
        try {
            let entries = putBatchString(10, 'batch_test_string_key');
            console.log('testSingleKvStorePutBatch001 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorePutBatch001 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.getEntries('batch_test_string_key').then((entrys) => {
                    console.log('testSingleKvStorePutBatch001 getEntries success');
                    console.log('testSingleKvStorePutBatch001 ' + JSON.stringify(entries));
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value == 'batch_test_string_value').assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutBatch001 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStorePutBatch001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBatch002', 0, async function (done) {
        console.log('testSingleKvStorePutBatch002');
        try {
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_number_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.INTEGER,
                        value : 222
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStorePutBatch002 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorePutBatch002 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.getEntries('batch_test_number_key').then((entrys) => {
                    console.log('testSingleKvStorePutBatch002 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value == 222).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutBatch002 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch002 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStorePutBatch002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBatch003', 0, async function (done) {
        console.log('testSingleKvStorePutBatch003');
        try {
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_number_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.FLOAT,
                        value : 2.0
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStorePutBatch003 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorePutBatch003 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.getEntries('batch_test_number_key').then((entrys) => {
                    console.log('testSingleKvStorePutBatch003 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value == 2.0).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutBatch003 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch003 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStorePutBatch003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBatch004', 0, async function (done) {
        console.log('testSingleKvStorePutBatch004');
        try {
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_number_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.DOUBLE,
                        value : 2.00
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStorePutBatch004 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorePutBatch004 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.getEntries('batch_test_number_key').then((entrys) => {
                    console.log('testSingleKvStorePutBatch004 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value == 2.00).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutBatch004 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch004 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStorePutBatch004 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBatch005', 0, async function (done) {
        console.log('testSingleKvStorePutBatch005');
        try {
            var bo = false;
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_bool_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.BOOLEAN,
                        value : bo
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStorePutBatch005 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorePutBatch005 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.getEntries('batch_test_bool_key').then((entrys) => {
                    console.log('testSingleKvStorePutBatch005 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value == bo).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutBatch005 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch005 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStorePutBatch005 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorePutBatch006', 0, async function (done) {
        console.log('testSingleKvStorePutBatch006');
        try {
            var arr = new Uint8Array([21,31]);
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_bool_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.BYTE_ARRAY,
                        value : arr
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStorePutBatch006 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorePutBatch006 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.getEntries('batch_test_bool_key').then((entrys) => {
                    console.log('testSingleKvStorePutBatch006 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value.toString() == arr.toString()).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStorePutBatch006 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch006 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStorePutBatch005 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteBatch001', 0, async function (done) {
        console.log('testSingleKvStoreDeleteBatch001');
        try {
            let entries = [];
            let keys = [];
            for (var i = 0; i < 5; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
                keys.push(key + i);
            }
            console.log('testSingleKvStoreDeleteBatch001 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreDeleteBatch001 putBatch success');
                expect(err == undefined).assertTrue();
                await kvStore.deleteBatch(keys).then((err) => {
                    console.log('testSingleKvStoreDeleteBatch001 deleteBatch success');
                    expect(err == undefined).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteBatch001 deleteBatch fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreDeleteBatch001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteBatch002', 0, async function (done) {
        console.log('testSingleKvStoreDeleteBatch002');
        try {
            let keys = ['batch_test_string_key1', 'batch_test_string_key2'];
            await kvStore.deleteBatch(keys).then((err) => {
                console.log('testSingleKvStoreDeleteBatch002 deleteBatch success');
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteBatch002 deleteBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreDeleteBatch002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreDeleteBatch003', 0, async function (done) {
        console.log('testSingleKvStoreDeleteBatch003');
        try {
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStoreDeleteBatch003 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreDeleteBatch003 putBatch success');
                expect(err == undefined).assertTrue();
                let keys = ['batch_test_string_key1', 'batch_test_string_keya'];
                await kvStore.deleteBatch(keys).then((err) => {
                    console.log('testSingleKvStoreDeleteBatch003 deleteBatch success');
                }).catch((err) => {
                    console.log('testSingleKvStoreDeleteBatch003 deleteBatch fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreDeleteBatch003 putBatch fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreDeleteBatch003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorestartTransaction001', 0, async function (done) {
        console.log('testSingleKvStorestartTransaction001');
        try {
            var count = 0;
            kvStore.on('dataChange', factory.SubscribeType.SUBSCRIBE_TYPE_ALL, function (data) {
                console.log('testSingleKvStorestartTransaction001 ' + JSON.stringify(data));
                count++;
            });
            await kvStore.startTransaction().then(async (err) => {
                console.log('testSingleKvStorestartTransaction001 startTransaction success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction001 startTransaction fail ' + err);
                expect(null).assertFail();
            });
            let entries = putBatchString(10, 'batch_test_string_key');
            console.log('testSingleKvStorestartTransaction001 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorestartTransaction001 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            let keys = Object.keys(entries).slice(5); //delete 5 beginnings
            await kvStore.deleteBatch(keys).then((err) => {
                console.log('testSingleKvStorestartTransaction001 deleteBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction001 deleteBatch fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.commit().then(async (err) => {
                console.log('testSingleKvStorestartTransaction001 commit success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction001 commit fail ' + err);
                expect(null).assertFail();
            });
            await sleep(2000);
            expect(count == 1).assertTrue();
        }catch(e) {
            console.log('testSingleKvStorestartTransaction001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorestartTransaction002', 0, async function (done) {
        console.log('testSingleKvStorestartTransaction002');
        try {
            var count = 0;
            kvStore.on('dataChange', 0, function (data) {
                console.log('testSingleKvStorestartTransaction002 ' + JSON.stringify(data));
                count++;
            });
            await kvStore.startTransaction().then(async (err) => {
                console.log('testSingleKvStorestartTransaction002 startTransaction success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction002 startTransaction fail ' + err);
                expect(null).assertFail();
            });
            let entries = putBatchString(10, 'batch_test_string_key');
            console.log('testSingleKvStorestartTransaction002 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStorestartTransaction002 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction002 putBatch fail ' + err);
                expect(null).assertFail();
            });
            let keys = Object.keys(entries).slice(5); //delete 5 beginnings
            await kvStore.deleteBatch(keys).then((err) => {
                console.log('testSingleKvStorestartTransaction002 deleteBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction002 deleteBatch fail ' + err);
                expect(null).assertFail();
            });
            // rollback
            await kvStore.rollback().then(async (err) => {
                console.log('testSingleKvStorestartTransaction002 rollback success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction002 rollback fail ' + err);
                expect(null).assertFail();
            });
            await sleep(2000);
            expect(count == 0).assertTrue();
        }catch(e) {
            console.log('testSingleKvStorestartTransaction002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStorestartTransaction003', 0, async function (done) {
        console.log('testSingleKvStorestartTransaction002');
        try {
            await kvStore.startTransaction(1).then(async (err) => {
                console.log('testSingleKvStorestartTransaction003 startTransaction success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction003 startTransaction fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStorestartTransaction003 e ' + e);
        }
        done();
    })

    it('testSingleKvStorestartTransaction004', 0, async function (done) {
        console.log('testSingleKvStorestartTransaction004');
        try {
            await kvStore.startTransaction('test_string').then(async (err) => {
                console.log('testSingleKvStorestartTransaction004 startTransaction success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction004 startTransaction fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStorestartTransaction004 e ' + e);
        }
        done();
    })

    it('testSingleKvStorestartTransaction005', 0, async function (done) {
        console.log('testSingleKvStorestartTransaction005');
        try {
            await kvStore.startTransaction(2.000).then(async (err) => {
                console.log('testSingleKvStorestartTransaction005 startTransaction success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStorestartTransaction005 startTransaction fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStorestartTransaction005 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreCommit001', 0, async function (done) {
        console.log('testSingleKvStoreCommit001');
        try {
            await kvStore.commit(1).then(async (err) => {
                console.log('testSingleKvStoreCommit001 commit success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreCommit001 commit fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreCommit001 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreCommit002', 0, async function (done) {
        console.log('testSingleKvStoreCommit002');
        try {
            await kvStore.commit('test_string').then(async (err) => {
                console.log('testSingleKvStoreCommit002 commit success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreCommit002 commit fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreCommit002 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreCommit003', 0, async function (done) {
        console.log('testSingleKvStoreCommit003');
        try {
            await kvStore.commit(2.000).then(async (err) => {
                console.log('testSingleKvStoreCommit003 commit success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreCommit003 commit fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreCommit003 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreRollback001', 0, async function (done) {
        console.log('testSingleKvStoreRollback001');
        try {
            await kvStore.rollback(1).then(async (err) => {
                console.log('testSingleKvStoreRollback001 rollback success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRollback001 rollback fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreRollback001 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreRollback002', 0, async function (done) {
        console.log('testSingleKvStoreRollback002');
        try {
            await kvStore.rollback('test_string').then(async (err) => {
                console.log('testSingleKvStoreRollback002 rollback success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRollback002 rollback fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreRollback002 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreRollback003', 0, async function (done) {
        console.log('testSingleKvStoreRollback003');
        try {
            await kvStore.rollback(2.000).then(async (err) => {
                console.log('testSingleKvStoreRollback003 rollback success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRollback003 rollback fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreRollback003 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreEnableSync001', 0, async function (done) {
        console.log('testSingleKvStoreEnableSync001');
        try {
            await kvStore.enableSync(true).then((err) => {
                console.log('testSingleKvStoreEnableSync001 enableSync success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreEnableSync001 enableSync fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreEnableSync001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreEnableSync002', 0, async function (done) {
        console.log('testSingleKvStoreEnableSync002');
        try {
            await kvStore.enableSync(false).then((err) => {
                console.log('testSingleKvStoreEnableSync002 enableSync success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreEnableSync002 enableSync fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreEnableSync002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreEnableSync003', 0, async function (done) {
        console.log('testSingleKvStoreEnableSync003');
        try {
            await kvStore.enableSync().then((err) => {
                console.log('testSingleKvStoreEnableSync003 enableSync success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreEnableSync003 enableSync fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreEnableSync003 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreEnableSync004', 0, async function (done) {
        console.log('testSingleKvStoreEnableSync004');
        try {
            await kvStore.enableSync(null).then((err) => {
                console.log('testSingleKvStoreEnableSync004 enableSync success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreEnableSync004 enableSync fail ' + err);
            });

        }catch(e) {
            console.log('testSingleKvStoreEnableSync004 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreRemoveDeviceData001', 0, async function (done) {
        console.log('testSingleKvStoreRemoveDeviceData001');
        try {
            await kvStore.put(KEY_TEST_STRING_ELEMENT, VALUE_TEST_STRING_ELEMENT).then((err) => {
                console.log('testSingleKvStoreRemoveDeviceData001 put success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreRemoveDeviceData001 put fail ' + err);
                expect(null).assertFail();
            });

            var deviceid = 'no_exist_device_id';
            await kvStore.removeDeviceData(deviceid).then((err) => {
                console.log('testSingleKvStoreRemoveDeviceData001 removeDeviceData success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRemoveDeviceData001 removeDeviceData fail ' + err);
            });

            await kvStore.get(KEY_TEST_STRING_ELEMENT).then((data) => {
                console.log('testSingleKvStoreRemoveDeviceData001 get success data:' + data);
                expect(data == VALUE_TEST_STRING_ELEMENT).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreRemoveDeviceData001 get fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreRemoveDeviceData001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreRemoveDeviceData002', 0, async function (done) {
        console.log('testSingleKvStoreRemoveDeviceData002');
        try {
            await kvStore.removeDeviceData().then((err) => {
                console.log('testSingleKvStoreRemoveDeviceData002 removeDeviceData success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRemoveDeviceData002 removeDeviceData fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreRemoveDeviceData002 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreRemoveDeviceData003', 0, async function (done) {
        console.log('testSingleKvStoreRemoveDeviceData003');
        try {
            await kvStore.removeDeviceData('').then((err) => {
                console.log('testSingleKvStoreRemoveDeviceData003 removeDeviceData success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRemoveDeviceData003 removeDeviceData fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreRemoveDeviceData003 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreRemoveDeviceData004', 0, async function (done) {
        console.log('testSingleKvStoreRemoveDeviceData004');
        try {
            await kvStore.removeDeviceData(null).then((err) => {
                console.log('testSingleKvStoreRemoveDeviceData004 removeDeviceData success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreRemoveDeviceData004 removeDeviceData fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreRemoveDeviceData004 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreSetSyncParam001', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncParam001');
        try {
            var defaultAllowedDelayMs = 500;
            await kvStore.setSyncParam(defaultAllowedDelayMs).then((err) => {
                console.log('testSingleKvStoreSetSyncParam001 put success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreSetSyncParam001 put fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncParam001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreSetSyncParam002', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncParam002');
        try {
            await kvStore.setSyncParam().then((err) => {
                console.log('testSingleKvStoreSetSyncParam002 put success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreSetSyncParam002 put fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncParam002 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreSetSyncParam003', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncParam003');
        try {
            await kvStore.setSyncParam('').then((err) => {
                console.log('testSingleKvStoreSetSyncParam003 put success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreSetSyncParam003 put fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncParam003 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreSetSyncParam004', 0, async function (done) {
        console.log('testSingleKvStoreSetSyncParam004');
        try {
            await kvStore.setSyncParam(null).then((err) => {
                console.log('testSingleKvStoreSetSyncParam004 put success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreSetSyncParam004 put fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreSetSyncParam004 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreGetSecurityLevel001', 0, async function (done) {
        console.log('testSingleKvStoreGetSecurityLevel001');
        try {
            await kvStore.getSecurityLevel().then((data) => {
                console.log('testSingleKvStoreGetSecurityLevel001 getSecurityLevel success');
                expect(data == factory.SecurityLevel.S2).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetSecurityLevel001 getSecurityLevel fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreGetSecurityLevel001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetSecurityLevel002', 0, async function (done) {
        console.log('testSingleKvStoreGetSecurityLevel002');
        try {
            await kvStore.getSecurityLevel(1).then((data) => {
                console.log('testSingleKvStoreGetSecurityLevel002 getSecurityLevel success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreGetSecurityLevel002 getSecurityLevel fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreGetSecurityLevel002 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreGetSecurityLevel003', 0, async function (done) {
        console.log('testSingleKvStoreGetSecurityLevel003');
        try {
            await kvStore.getSecurityLevel('test_string').then((data) => {
                console.log('testSingleKvStoreGetSecurityLevel003 getSecurityLevel success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreGetSecurityLevel003 getSecurityLevel fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreGetSecurityLevel003 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreGetSecurityLevel004', 0, async function (done) {
        console.log('testSingleKvStoreGetSecurityLevel004');
        try {
            await kvStore.getSecurityLevel(2.000).then((data) => {
                console.log('testSingleKvStoreGetSecurityLevel004 getSecurityLevel success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreGetSecurityLevel004 getSecurityLevel fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreGetSecurityLevel004 e ' + e);
        }
        done();
    })

    it('testSingleKvStoreGetResultSet001', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSet001');
        try {
            let resultSet;
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
            }
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetResultSet001 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.getResultSet('batch_test_string_key').then((result) => {
                console.log('testSingleKvStoreGetResultSet001 getResultSet success');
                resultSet = result;
                expect(resultSet.getCount() == 10).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet001 getResultSet fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.closeResultSet(resultSet).then((err) => {
                console.log('testSingleKvStoreGetResultSet001 closeResultSet success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet001 closeResultSet fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreGetResultSet001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetResultSet002', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSet002');
        try {
            let resultSet;
            await kvStore.getResultSet('batch_test_string_key').then((result) => {
                console.log('testSingleKvStoreGetResultSet002 getResultSet success');
                resultSet = result;
                expect(resultSet.getCount() == 0).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet002 getResultSet fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.closeResultSet(resultSet).then((err) => {
                console.log('testSingleKvStoreGetResultSet002 closeResultSet success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet002 closeResultSet fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreGetResultSet002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetResultSet003', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSet003');
        try {
            let resultSet;
            await kvStore.getResultSet().then((result) => {
                console.log('testSingleKvStoreGetResultSet003 getResultSet success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet003 getResultSet fail ' + err);

            });
        }catch(e) {
            console.log('testSingleKvStoreGetResultSet003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetResultSet004', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSet004');
        try {
            let resultSet;
            await kvStore.getResultSet('test_key_string', 123).then((result) => {
                console.log('testSingleKvStoreGetResultSet004 getResultSet success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet004 getResultSet fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreGetResultSet004 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetResultSet005', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSet005');
        try {
            let resultSet;
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
            }
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetResultSet005 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            var query = new factory.Query();
            query.prefixKey("batch_test");
            await kvStore.getResultSet(query).then((result) => {
                console.log('testSingleKvStoreGetResultSet005 getResultSet success');
                resultSet = result;
                expect(resultSet.getCount() == 10).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet005 getResultSet fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.closeResultSet(resultSet).then((err) => {
                console.log('testSingleKvStoreGetResultSet005 closeResultSet success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet005 closeResultSet fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreGetResultSet005 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetResultSet006', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSet006');
        try {
            let resultSet;
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
            }
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetResultSet006 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            var query = new factory.Query();
            query.prefixKey("batch_test");
            await kvStore.getResultSet(query).then((result) => {
                console.log('testSingleKvStoreGetResultSet006 getResultSet success');
                resultSet = result;
                expect(resultSet.getCount() == 10).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet006 getResultSet fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.closeResultSet(resultSet).then((err) => {
                console.log('testSingleKvStoreGetResultSet006 closeResultSet success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSet006 closeResultSet fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreGetResultSet006 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreCloseResultSet001', 0, async function (done) {
        console.log('testSingleKvStoreCloseResultSet001');
        try {
            console.log('testSingleKvStoreCloseResultSet001 success');
            let resultSet = null;
            await kvStore.closeResultSet(resultSet).then(() => {
                console.log('testSingleKvStoreCloseResultSet001 closeResultSet success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreCloseResultSet001 closeResultSet fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreCloseResultSet001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreCloseResultSet002', 0, async function (done) {
        console.log('testSingleKvStoreCloseResultSet002');
        try {
            console.log('testSingleKvStoreCloseResultSet002 success');
            let resultSet = null;
            await kvStore.getResultSet('batch_test_string_key').then((result) => {
                console.log('testSingleKvStoreCloseResultSet002 getResultSet success');
                resultSet = result;
            }).catch((err) => {
                console.log('testSingleKvStoreCloseResultSet002 getResultSet fail ' + err);
                expect(null).assertFail();
            });
            await kvStore.closeResultSet(resultSet).then((err) => {
                console.log('testSingleKvStoreCloseResultSet002 closeResultSet success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreCloseResultSet002 closeResultSet fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreCloseResultSet002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreCloseResultSet003', 0, async function (done) {
        console.log('testSingleKvStoreCloseResultSet003');
        try {
            console.log('testSingleKvStoreCloseResultSet003 success');
            let resultSet = null;
            await kvStore.closeResultSet().then(() => {
                console.log('testSingleKvStoreCloseResultSet003 closeResultSet success');
                expect(null).assertFail();
            }).catch((err) => {
                console.log('testSingleKvStoreCloseResultSet003 closeResultSet fail ' + err);
            });
        }catch(e) {
            console.log('testSingleKvStoreCloseResultSet003 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreCloseResultSet004', 0, async function (done) {
        console.log('testSingleKvStoreCloseResultSet004');
        try {
            // pass query
            console.log('testSingleKvStoreCloseResultSet004 success');
        }catch(e) {
            console.log('testSingleKvStoreCloseResultSet004 e ' + e);
            expect(null).assertFail();
        }
        done();
    })


    it('testSingleKvStoreGetResultSize001', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSize001');
        try {
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
            }
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetResultSize001 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            var query = new factory.Query();
            query.prefixKey("batch_test");

            await kvStore.getResultSize(query).then((resultSize) => {
                console.log('testSingleKvStoreGetResultSize001 getResultSet success');
                expect(resultSize == 10).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSize001 getResultSet fail ' + err);
                expect(null).assertFail();
            });

        }catch(e) {
            console.log('testSingleKvStoreGetResultSize001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetResultSize002', 0, async function (done) {
        console.log('testSingleKvStoreGetResultSize001');
        try {
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_string_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.STRING,
                        value : 'batch_test_string_value'
                    }
                }
                entries.push(entry);
            }
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetResultSize001 putBatch success');
                expect(err == undefined).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStorePutBatch001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            var query = new factory.Query();
            query.prefixKey("batch_test");

            await kvStore.getResultSize(query).then((resultSize) => {
                console.log('testSingleKvStoreGetResultSize001 getResultSet success');
                expect(resultSize == 10).assertTrue();
            }).catch((err) => {
                console.log('testSingleKvStoreGetResultSize001 getResultSet fail ' + err);
                expect(null).assertFail();
            });
        }catch(e) {
            console.log('testSingleKvStoreGetResultSize001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetEntries001', 0, async function (done) {
        console.log('testSingleKvStoreGetEntries001');
        try {
            var arr = new Uint8Array([21,31]);
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_bool_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.BYTE_ARRAY,
                        value : arr
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStoreGetEntries001 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetEntries001 putBatch success');
                expect(err == undefined).assertTrue();
                var query = new factory.Query();
                query.prefixKey("batch_test");
                await kvStore.getEntries(query).then((entrys) => {
                    console.log('testSingleKvStoreGetEntries001 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value.toString() == arr.toString()).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetEntries001 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetEntries001 putBatch fail ' + err);
                expect(null).assertFail();
            });
            console.log('testSingleKvStoreGetEntries001 success');
        }catch(e) {
            console.log('testSingleKvStoreGetEntries001 e ' + e);
            expect(null).assertFail();
        }
        done();
    })

    it('testSingleKvStoreGetEntries002', 0, async function (done) {
        console.log('testSingleKvStoreGetEntries002');
        try {
            var arr = new Uint8Array([21,31]);
            let entries = [];
            for (var i = 0; i < 10; i++) {
                var key = 'batch_test_bool_key';
                var entry = {
                    key : key + i,
                    value : {
                        type : factory.ValueType.BYTE_ARRAY,
                        value : arr
                    }
                }
                entries.push(entry);
            }
            console.log('testSingleKvStoreGetEntries002 entries: ' + JSON.stringify(entries));
            await kvStore.putBatch(entries).then(async (err) => {
                console.log('testSingleKvStoreGetEntries002 putBatch success');
                expect(err == undefined).assertTrue();
                var query = new factory.Query();
                query.prefixKey("batch_test");
                await kvStore.getEntries(query).then((entrys) => {
                    console.log('testSingleKvStoreGetEntries002 getEntries success');
                    expect(entrys.length == 10).assertTrue();
                    expect(entrys[0].value.value.toString() == arr.toString()).assertTrue();
                }).catch((err) => {
                    console.log('testSingleKvStoreGetEntries002 getEntries fail ' + err);
                    expect(null).assertFail();
                });
            }).catch((err) => {
                console.log('testSingleKvStoreGetEntries002 putBatch fail ' + err);
                expect(null).assertFail();
            });
            console.log('testSingleKvStoreGetEntries002 success');
        }catch(e) {
            console.log('testSingleKvStoreGetEntries002 e ' + e);
            expect(null).assertFail();
        }
        done();
    })
})