/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import media from '@ohos.multimedia.media'
import {toNewPage, clearRouter} from './VideoPlayerTestBase.js';
import {getFileDescriptor, closeFileDescriptor, isFileOpen} from '../../../../../MediaTestBase.js';
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('VideoPlayerFuncCallbackTest', function () {
    const VIDEO_SOURCE = 'H264_AAC.mp4';
    const PLAY_TIME = 3000;
    const SEEK_TIME = 5000;
    const WIDTH_VALUE = 720;
    const HEIGHT_VALUE = 480;
    const DURATION_TIME = 10034;
    const CREATE_EVENT = 'create';
    const SETSURFACE_EVENT = 'setDisplaySurface';
    const GETDESCRIPTION = 'getTrackDescription';
    const SETSOURCE_EVENT = 'setSource';
    const SETFDSOURCE_EVENT = 'setFdSource';
    const PREPARE_EVENT = 'prepare';
    const SRC_PREPARE_EVENT = 'src2prepare';
    const PLAY_EVENT = 'play';
    const PAUSE_EVENT = 'pause';
    const STOP_EVENT = 'stop';
    const RESET_EVENT = 'reset';
    const RELEASE_EVENT = 'release';
    const SEEK_EVENT = 'seek';
    const SEEK_MODE_EVENT = 'seekMode';
    const SETVOLUME_EVENT = 'volume';
    const SETSPEED_EVENT = 'speed';
    const SETLOOP_EVENT = 'loop';
    const WAIT_EVENT = 'wait';
    const ERROR_EVENT = 'error';
    const END_EVENT = 'end';
    const DELTA_TIME = 1000;
    const NEXT_FRAME_TIME = 8333;
    const PREV_FRAME_TIME = 4166;
    const DELTA_SEEK_TIME = 100;
    let surfaceID = '';
    let fdHead = 'fd://';
    let fileDescriptor = undefined;
    let page = 0;
    let events = require('events');
    let eventEmitter = new events.EventEmitter();

    beforeAll(async function() {
        console.info('beforeAll case');
        await getFileDescriptor(VIDEO_SOURCE).then((res) => {
            fileDescriptor = res;
        });
    })

    beforeEach(async function() {
        await toNewPage(page);
        page = (page + 1) % 2;
        await msleep(1000).then(() => {}, failureCallback).catch(catchCallback);
        surfaceID = globalThis.value;
        console.info('case new surfaceID is ' + surfaceID);
        console.info('beforeEach case');
    })

    afterEach(async function() {
        await clearRouter();
        console.info('afterEach case');
    })

    afterAll(async function() {
        await closeFileDescriptor(VIDEO_SOURCE);
        console.info('afterAll case');
    })

    function failureCallback(error) {
        expect().assertFail();
        console.info(`case error called,errMessage is ${error.message}`);
    }

    function catchCallback(error) {
        expect().assertFail();
        console.info(`case error called,errMessage is ${error.message}`);
    }

    function sleep(time) {
        for(let t = Date.now(); Date.now() - t <= time;);
    }

    function msleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function printfError(error, done) {
        expect().assertFail();
        console.info(`case error called,errMessage is ${error.message}`);
        done();
    }

    function printfDescription(obj) { 
        let description = ""; 
        for(let i in obj) { 
            let property = obj[i];
            console.info('case key is  '+ i);
            console.info('case value is  '+ property);
            description += i + " = " + property + "\n"; 
        } 
    }

    function toNextStep(videoPlayer, steps, done) {
        if (steps[0] == END_EVENT) {
            console.info('case success!!');
            done();
        } else {
            eventEmitter.emit(steps[0], videoPlayer, steps, done);
        }
    }
    function setOnCallback(videoPlayer, steps, done) {
        videoPlayer.on('playbackCompleted', () => {
            console.info('case playbackCompleted success');
        });

        videoPlayer.on('bufferingUpdate', (infoType, value) => {
            console.info('case bufferingUpdate success infoType is ' + infoType);
            console.info('case bufferingUpdate success value is ' + value);
        });

        videoPlayer.on('startRenderFrame', () => {
            console.info('case startRenderFrame success');
        });

        videoPlayer.on('videoSizeChanged', (width, height) => {
            console.info('case videoSizeChanged success');
        });

        videoPlayer.on('error', (error) => {
            console.info(`case error called,errMessage is ${error.message}`);
            if (steps[0] == ERROR_EVENT) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            }
        });
    }

    eventEmitter.on(CREATE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        media.createVideoPlayer((err, video) => {
            if (typeof (video) != 'undefined') {
                videoPlayer = video;
                setOnCallback(videoPlayer, steps, done);
                expect(videoPlayer.state).assertEqual('idle');
                console.info('case createVideoPlayer success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(SETFDSOURCE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.fdSrc = steps[0];
        steps.shift();
        toNextStep(videoPlayer, steps, done);
    });

    eventEmitter.on(SETSOURCE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.url = steps[0];
        steps.shift();
        toNextStep(videoPlayer, steps, done);
    });

    eventEmitter.on(SETLOOP_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.loop = steps[0];
        steps.shift();
        toNextStep(videoPlayer, steps, done);
    });

    eventEmitter.on(WAIT_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        sleep(PLAY_TIME);
        toNextStep(videoPlayer, steps, done);
    });

    eventEmitter.on(SETSURFACE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.setDisplaySurface(surfaceID, (err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('idle');
                console.info('case setDisplaySurface success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        })
    });

    eventEmitter.on(PREPARE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.prepare((err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('prepared');
                expect(videoPlayer.duration).assertEqual(DURATION_TIME);
                expect(videoPlayer.width).assertEqual(WIDTH_VALUE);
                expect(videoPlayer.height).assertEqual(HEIGHT_VALUE);
                console.info('case prepare success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(SRC_PREPARE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.prepare((err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('prepared');
                expect(videoPlayer.duration).assertEqual(DURATION_TIME);
                expect(videoPlayer.width).assertEqual(WIDTH_VALUE);
                expect(videoPlayer.height).assertEqual(HEIGHT_VALUE);
                console.info('case prepare success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(GETDESCRIPTION, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.getTrackDescription((err, arrlist) => {
            if (typeof (err) == 'undefined') {
                for (let i = 0; i < arrlist.length; i++) {
                    printfDescription(arrlist[i]);
                }
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(PLAY_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        let startTime = videoPlayer.currentTime;
        videoPlayer.play((err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('playing');
                console.info('case play success!!');
                sleep(PLAY_TIME);
                let endTime = videoPlayer.currentTime;
                expect(endTime - startTime).assertClose(PLAY_TIME, DELTA_TIME);
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(PAUSE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.pause((err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('paused');
                console.info('case pause success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(STOP_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.stop((err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('stopped');
                console.info('case stop success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(RESET_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.reset((err) => {
            if (typeof (err) == 'undefined') {
                expect(videoPlayer.state).assertEqual('idle');
                console.info('case reset success!!');
                toNextStep(videoPlayer, steps, done);
            }  else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(RELEASE_EVENT, (videoPlayer, steps, done) => {
        steps.shift();
        videoPlayer.release((err) => {
            if (typeof (err) == 'undefined') {
                console.info('case release success!!');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    function checkSeekTime(seekMode, seekTime, seekDoneTime) {
        switch (seekMode) {
            case media.SeekMode.SEEK_NEXT_SYNC:
                if (seekTime == 0) {
                    expect(seekDoneTime + DELTA_SEEK_TIME).assertClose(DELTA_SEEK_TIME, DELTA_SEEK_TIME);
                } else if (seekTime == DURATION_TIME) {
                    expect(seekDoneTime).assertClose(DURATION_TIME, DELTA_SEEK_TIME);
                } else {
                    expect(seekDoneTime).assertClose(NEXT_FRAME_TIME, DELTA_SEEK_TIME);
                }
                break;
            case media.SeekMode.SEEK_PREV_SYNC:
                if (seekTime == 0) {
                    expect(seekDoneTime + DELTA_SEEK_TIME).assertClose(DELTA_SEEK_TIME, DELTA_SEEK_TIME);
                } else if (seekTime == DURATION_TIME) {
                    expect(seekDoneTime).assertClose(NEXT_FRAME_TIME, DELTA_SEEK_TIME);
                } else {
                    expect(seekDoneTime).assertClose(PREV_FRAME_TIME, DELTA_SEEK_TIME);
                }
                break;
            default:
                break;
        }
    }

    eventEmitter.on(SEEK_EVENT, (videoPlayer, steps, done) => {
        let seekTime = steps[1];
        steps.shift();
        steps.shift();
        videoPlayer.seek(seekTime, (err, seekDoneTime) => {
            if (typeof (err) == 'undefined') {
                if (seekTime > DURATION_TIME) {
                    seekTime = DURATION_TIME;
                }
                checkSeekTime(media.SeekMode.SEEK_PREV_SYNC, seekTime, seekDoneTime);
                console.info('case seek success and seekDoneTime is '+ seekDoneTime);
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(SEEK_MODE_EVENT, (videoPlayer, steps, done) => {
        let seekTime = steps[1];
        let seekMode = steps[2];
        steps.shift();
        steps.shift();
        steps.shift();
        videoPlayer.seek(seekTime, seekMode, (err, seekDoneTime) => {
            if (typeof (err) == 'undefined') {
                if (seekTime > DURATION_TIME) {
                    seekTime = DURATION_TIME;
                }
                checkSeekTime(seekMode, seekTime, seekDoneTime);
                console.info('case seek success and seekDoneTime is '+ seekDoneTime);
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    eventEmitter.on(SETVOLUME_EVENT, (videoPlayer, steps, done) => {
        let volumeValue = steps[1];
        steps.shift();
        steps.shift();
        videoPlayer.setVolume(volumeValue, (err) => {
            if (typeof (err) == 'undefined') {
                console.info('case setVolume success');
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    function checkSpeedTime(videoPlayer, speedValue, startTime) {
        let endTime = videoPlayer.currentTime;
        if (videoPlayer.state == 'playing') {
            switch (speedValue) {
                case media.PlaybackSpeed.SPEED_FORWARD_0_75_X:
                    expect(endTime - startTime).assertClose(0.75 * 1000, DELTA_TIME);
                    break;
                case media.PlaybackSpeed.SPEED_FORWARD_1_00_X:
                    expect(endTime - startTime).assertClose(1000, DELTA_TIME);
                    break;
                case media.PlaybackSpeed.SPEED_FORWARD_1_25_X:
                    expect(endTime - startTime).assertClose(1.25 * 1000, DELTA_TIME);
                    break;
                case media.PlaybackSpeed.SPEED_FORWARD_1_75_X:
                    expect(endTime - startTime).assertClose(1.75 * 1000, DELTA_TIME);
                    break;
                case media.PlaybackSpeed.SPEED_FORWARD_2_00_X:
                    expect(endTime - startTime).assertClose(2 * 1000, DELTA_TIME);
                    break;
            }
        } else {
            console.info('case speed not in play');
        }
    }

    eventEmitter.on(SETSPEED_EVENT, (videoPlayer, steps, done) => {
        let speedValue = steps[1];
        steps.shift();
        steps.shift();
        let startTime = videoPlayer.currentTime;
        videoPlayer.setSpeed(speedValue, (err, speedMode) => {
            if (typeof (err) == 'undefined') {
                sleep(1000);
                expect(speedValue).assertEqual(speedMode);
                console.info('case setSpeed success and speedMode is '+ speedMode);
                checkSpeedTime(videoPlayer, speedValue, startTime);
                toNextStep(videoPlayer, steps, done);
            } else if ((typeof (err) != 'undefined') && (steps[0] == ERROR_EVENT)) {
                steps.shift();
                toNextStep(videoPlayer, steps, done);
            } else {
                printfError(err, done);
            }
        });
    });

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SETSOURCE
        * @tc.name      : 001.test setSorce '' (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_PROMISE_SETSOURCE', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let fdPath = '';
        let mySteps = new Array(CREATE_EVENT, SETSOURCE_EVENT, fdPath, ERROR_EVENT, RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done);            
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SETVOLUME
        * @tc.name      : 001.test SetVolume 0/0.5/1 (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SETVOLUME', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let mySteps = new Array(CREATE_EVENT, SETFDSOURCE_EVENT, fileDescriptor, SETSURFACE_EVENT,
            PREPARE_EVENT, PLAY_EVENT, SETVOLUME_EVENT, 0, SETVOLUME_EVENT, 0.5, SETVOLUME_EVENT, 1,
            RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done);         
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SETSPEED
        * @tc.name      : 001.test SetSpeed 0.75/1/1.25/1.75/2 (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SETSPEED', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let mySteps = new Array(CREATE_EVENT, SETFDSOURCE_EVENT, fileDescriptor, SETSURFACE_EVENT,
            PREPARE_EVENT, PLAY_EVENT, SETSPEED_EVENT, media.PlaybackSpeed.SPEED_FORWARD_0_75_X,
            SETSPEED_EVENT, media.PlaybackSpeed.SPEED_FORWARD_1_00_X, 
            SETSPEED_EVENT, media.PlaybackSpeed.SPEED_FORWARD_1_25_X,
            SETSPEED_EVENT, media.PlaybackSpeed.SPEED_FORWARD_1_75_X,
            SETSPEED_EVENT, media.PlaybackSpeed.SPEED_FORWARD_2_00_X, RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SEEKMODE
        * @tc.name      : 001.test seek mode SEEK_PREV_SYNC/SEEK_NEXT_SYNC (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_SEEKMODE', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let mySteps = new Array(CREATE_EVENT, SETFDSOURCE_EVENT, fileDescriptor, SETSURFACE_EVENT,
            PREPARE_EVENT, PLAY_EVENT, SEEK_MODE_EVENT, SEEK_TIME, media.SeekMode.SEEK_NEXT_SYNC,
            SEEK_MODE_EVENT, SEEK_TIME, media.SeekMode.SEEK_PREV_SYNC,RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done); 
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_CALLBACK
        * @tc.name      : 001.test callback bufferingUpdate/videoSizeChanged/startRenderFrame/playbackCompleted
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_CALLBACK', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let frameCount = -1;
        let completedCount = 0;
        let widthValue = -1;
        let heightValue = -1;

        eventEmitter.on('test_create', () => {
            media.createVideoPlayer((err, video) => {
                if (typeof (video) != 'undefined') {
                    videoPlayer = video;
                    expect(videoPlayer.state).assertEqual('idle');
                    console.info('case createVideoPlayer success!!');
                    eventEmitter.emit('test_callback');
                }else {
                    printfError(err, done);
                }
            });
        });

        eventEmitter.on('test_callback', () => {
            videoPlayer.on('playbackCompleted', async () => {
                console.info('case playbackCompleted success');
                completedCount++;
                expect(widthValue).assertEqual(WIDTH_VALUE);
                expect(heightValue).assertEqual(HEIGHT_VALUE);
                expect(completedCount).assertEqual(1);
                videoPlayer.release((err) => {
                    if (typeof (err) == 'undefined') {
                        console.info('case release success!!');
                        done();
                    } else {
                        printfError(err, done);
                    }
                });
            });
    
            videoPlayer.on('bufferingUpdate', (infoType, value) => {
                console.info('case bufferingUpdate success infoType is ' + infoType);
                console.info('case bufferingUpdate success value is ' + value);
            });
    
            videoPlayer.on('startRenderFrame', () => {
                console.info('case startRenderFrame success');
            });
    
            videoPlayer.on('videoSizeChanged', (width, height) => {
                console.info('case videoSizeChanged success');
                widthValue = width;
                heightValue = height;
            });
            eventEmitter.emit('test_setSurface');
        });

        eventEmitter.on('test_setSurface', () => {
            videoPlayer.url = fdHead + fileDescriptor.fd;
            videoPlayer.setDisplaySurface(surfaceID, (err) => {
                if (typeof (err) == 'undefined') {
                    expect(videoPlayer.state).assertEqual('idle');
                    console.info('case setDisplaySurface success!!');
                    eventEmitter.emit('test_prepare');
                }else {
                    printfError(err, done);
                }
            })
        });

        eventEmitter.on('test_prepare', () => {
            videoPlayer.prepare((err) => {
                if (typeof (err) == 'undefined') {
                    expect(videoPlayer.state).assertEqual('prepared');
                    expect(videoPlayer.duration).assertEqual(DURATION_TIME);
                    expect(videoPlayer.width).assertEqual(WIDTH_VALUE);
                    expect(videoPlayer.height).assertEqual(HEIGHT_VALUE);
                    console.info('case prepare success!!');
                    eventEmitter.emit('test_play');
                } else {
                    printfError(err, done);
                }
            });
        });

        eventEmitter.on('test_play', () => {
            videoPlayer.play((err) => {
                if (typeof (err) == 'undefined') {
                    expect(videoPlayer.state).assertEqual('playing');
                    console.info('case play success!!');
                } else {
                    printfError(err, done);
                }
            });
        });
        eventEmitter.emit('test_create');
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_GETTRECKDESCRIPTION
        * @tc.name      : 001.test getTrackDescription (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_GETTRECKDESCRIPTION', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let mySteps = new Array(CREATE_EVENT, SETFDSOURCE_EVENT, fileDescriptor, SETSURFACE_EVENT,
            PREPARE_EVENT, GETDESCRIPTION, RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done); 
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_LOOP
        * @tc.name      : 001.test LOOP (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_LOOP', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let mySteps = new Array(CREATE_EVENT, SETFDSOURCE_EVENT, fileDescriptor, SETSURFACE_EVENT,
            PREPARE_EVENT, SETLOOP_EVENT, true, PLAY_EVENT, SEEK_EVENT, DURATION_TIME, WAIT_EVENT,
            SEEK_EVENT, DURATION_TIME, WAIT_EVENT, SEEK_EVENT, DURATION_TIME, WAIT_EVENT,
            SEEK_EVENT, DURATION_TIME, WAIT_EVENT, SETLOOP_EVENT, false, RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done); 
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_BASE
        * @tc.name      : 001.test video playe (callback)
        * @tc.desc      : Video playback control test
        * @tc.size      : MediumTest
        * @tc.type      : Function test
        * @tc.level     : Level0
    */
    it('SUB_MEDIA_VIDEO_PLAYER_FUNCTION_CALLBACK_BASE', 0, async function (done) {
        isFileOpen(fileDescriptor, done);
        let videoPlayer = null;
        let fdPath = fdHead + fileDescriptor.fd;
        let mySteps = new Array(CREATE_EVENT, SETFDSOURCE_EVENT, fileDescriptor, SETSURFACE_EVENT,
            PREPARE_EVENT, PLAY_EVENT, PAUSE_EVENT, PLAY_EVENT, STOP_EVENT, RESET_EVENT, SETSOURCE_EVENT, fdPath,
            PREPARE_EVENT, SETLOOP_EVENT, true, PLAY_EVENT, SEEK_EVENT, DURATION_TIME / 2, SEEK_EVENT, 0,
            SEEK_EVENT, DURATION_TIME, WAIT_EVENT, SETLOOP_EVENT, false, RELEASE_EVENT, END_EVENT);
        eventEmitter.emit(mySteps[0], videoPlayer, mySteps, done); 
    })
})
