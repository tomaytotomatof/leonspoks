/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import {
  fileio, FILE_CONTENT, prepareFile, nextFileName, isIntNum,
  describe, it, expect,
} from '../../Common';

describe('fileio_open_close', function () {

  /**
   * @tc.number SUB_DF_FileIO_OpenCloseSync_0000
   * @tc.name fileio_open_close_sync_000
   * @tc.desc Test openSync() and closeSync() interfaces.
   */
  it('fileio_open_close_sync_000', 0, function () {
    let fpath = nextFileName('fileio_open_close_sync_000');

    try {
      let fd = fileio.openSync(fpath, 0o102, 0o666);
      expect(isIntNum(fd)).assertTrue();
      expect(fileio.closeSync(fd) == null).assertTrue();
      expect(fileio.unlinkSync(fpath) == null).assertTrue();
    } catch (e) {
      console.log('fileio_open_close_sync_000 has failed for ' + e);
      expect(null).assertFail();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_OpenCloseSync_0010
   * @tc.name fileio_open_close_sync_001
   * @tc.desc Test openSync() and closeSync() interfaces.
   */
  it('fileio_open_close_sync_001', 0, function () {
    let fpath = nextFileName('fileio_open_close_sync_001');
    expect(prepareFile(fpath, FILE_CONTENT)).assertTrue();

    try {
      let fd = fileio.openSync(fpath);
      expect(isIntNum(fd)).assertTrue();
      expect(fileio.closeSync(fd) == null).assertTrue();
      expect(fileio.unlinkSync(fpath) == null).assertTrue();
    } catch (e) {
      console.log('fileio_open_close_sync_001 has failed for ' + e);
      expect(null).assertFail();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_OpenSync_0000
   * @tc.name fileio_open_sync_000
   * @tc.desc Test openSync() interface.
   */
  it('fileio_open_sync_000', 0, function () {
    try {
      fileio.openSync('/', 0o102, 0o666);
      expect(null).assertFail();
    } catch (e) {
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_OpenSync_0010
   * @tc.name fileio_open_sync_001
   * @tc.desc Test openSync() interface.
   */
  it('fileio_open_sync_001', 0, function () {
    let fpath = nextFileName('fileio_open_sync_001');

    try {
      fileio.openSync(fpath, 0o102);
      expect(null).assertFail();
    } catch (e) {
    }
  });
  
  /**
   * @tc.number SUB_DF_FileIO_CloseSync_0000
   * @tc.name fileio_close_sync_000
   * @tc.desc Test closeSync() interface.
   */
  it('fileio_close_sync_000', 0, function () {
    try {
      fileio.closeSync();
      expect(null).assertFail();
    } catch (e) {
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_CloseSync_0010
   * @tc.name fileio_close_sync_001
   * @tc.desc Test closeSync() interface.
   */
  it('fileio_close_sync_001', 0, function () {
    try {
      fileio.closeSync(-1);
      expect(null).assertFail();
    } catch (e) {
    }
  });
});