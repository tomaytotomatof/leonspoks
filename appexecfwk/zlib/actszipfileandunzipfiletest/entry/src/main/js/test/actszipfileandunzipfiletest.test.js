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
import zlib from '@ohos.zlib'
import fileio from '@ohos.fileio'
import file from '@system.file'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('ActsZlibTest', function () {

/*
* @tc.number: ACTS_ZipFile_0100
* @tc.name: zipFile
* @tc.desc: inFile is empty
*/
it('ACTS_ZipFile_0100', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3400 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = "";
    var zipDest = dir + "/ACTS_ZipFile_0100.zip"
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.zipFile(path, dir, options,
        (err, data) => {
            console.log("ACTS_ZipFile_0100 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_0200
* @tc.name: zipFile
* @tc.desc: inFile doesn't exist
*/
it('ACTS_ZipFile_0200', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let src = dir + "/ACTS_ZipFile_100000.txt";
    let path = dir + "/ACTS_ZipFile_9900.txt";
    var zipDest = dir + "/ACTS_ZipFile_6600.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0200";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0200.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0200 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0200 write data to file failed with error:" + err);
    });

    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.zipFile(src, dir, options,
        (err, data) => {
            console.log("ACTS_ZipFile_0200 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_0300
* @tc.name: zipFile
* @tc.desc: output file not specified
*/
it('ACTS_ZipFile_0300', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0300.txt";
    var zipDest = ""
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0300";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0300.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0300 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0300 write data to file failed with error:" + err);
    });

    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.zipFile(path, zipDest, options,
        (err, data) => {
            console.log("ACTS_ZipFile_0300 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_0400
* @tc.name: zipFile
* @tc.desc: The ouput file is a directory that does not exist
*/
it('ACTS_ZipFile_0400', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0400.txt";
    var zipDest = "/ACTS_ZipFile_0400.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0400";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0400.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0400 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0400 write data to file failed with error:" + err);
    });

    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.zipFile(path, zipDest, options,
        (err, data) => {
            console.log("ACTS_ZipFile_0400 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });

})

/*
* @tc.number: ACTS_ZipFile_0500
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_NO_FLUSH
*/
it('ACTS_ZipFile_0500', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0500.txt";a
    var zipDest = dir + "/ACTS_ZipFile_0500.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0500";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0500.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0500 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0500 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_0500 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_0500 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_0500 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_0500 err: " + err);
                    done();
                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_0500 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_0500 end==================");
})

/*
* @tc.number: ACTS_ZipFile_0600
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_NO_FLUSH
*/
it('ACTS_ZipFile_0600', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0600.txt";
    var zipDest = dir + "/ACTS_ZipFile_0600.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0600";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0600.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0600 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0600 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_0600 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_0600 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_0600 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_0600 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_0600 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_0600 end==================");
})

/*
* @tc.number: ACTS_ZipFile_0700
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_SYNC_FLUSH
*/
it('ACTS_ZipFile_0700', 0, async function (done) {
    console.log("==================ACTS_ZipFile_0700 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0700.txt";
    var zipDest = dir + "/ACTS_ZipFile_0700.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0700";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0700.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0700 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0700 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_SYNC_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_0700 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_0700 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_0700 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_0700 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_0700 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_0700 end==================");
})

/*
* @tc.number: ACTS_ZipFile_0800
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_FULL_FLUSH
*/
it('ACTS_ZipFile_0800', 0, async function (done) {
    console.log("==================ACTS_ZipFile_0800 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0800.txt";
    var zipDest = dir + "/ACTS_ZipFile_0800.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0800";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0800.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0800 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0800 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_FULL_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_0800 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_0800 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_0800 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_0800 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_0800 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_0800 end==================");
})

/*
* @tc.number: ACTS_ZipFile_0900
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_FINISH
*/
it('ACTS_ZipFile_0900', 0, async function (done) {
    console.log("==================ACTS_ZipFile_0900 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_0900.txt";
    var zipDest = dir + "/ACTS_ZipFile_0900.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_0900";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_0900.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0900 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0900 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_FINISH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_0900 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_0900 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_0900 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_0900 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_0900 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_0900 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1000
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_BLOCK
*/
it('ACTS_ZipFile_1000', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1000 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1000.txt";
    var zipDest = dir + "/ACTS_ZipFile_1000.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1000";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1000.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1000 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1000 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_BLOCK;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1000 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1000 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1000 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1000 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1000 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1000 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1100
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_TREES
*/
it('ACTS_ZipFile_1100', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1100 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1100.txt";
    var zipDest = dir + "/ACTS_ZipFile_1100.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1100";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1100.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1100 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1100 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_TREES;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1100 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1100 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1100 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1100 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1100 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1100 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1200
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_NO_FLUSH
*/
it('ACTS_ZipFile_1200', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1200 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1200.txt";
    var zipDest = dir + "/ACTS_ZipFile_1200.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1200";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1200.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1200 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1200 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1200 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1200 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1200 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1200 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1200 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1200 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1300
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_PARTIAL_FLUSH
*/
it('ACTS_ZipFile_1300', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1300 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1300.txt";
    var zipDest = dir + "/ACTS_ZipFile_1300.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1300";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1300.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1300 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1300 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_PARTIAL_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1300 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1300 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1300 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1300 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1300 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1300 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1400
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_SYNC_FLUSH
*/
it('ACTS_ZipFile_1400', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1400 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1400.txt";
    var zipDest = dir + "/ACTS_ZipFile_1400.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1400";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1400.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1400 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1400 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_SYNC_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1400 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1400 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1400 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1400 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1400 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1400 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1500
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_FULL_FLUSH
*/
it('ACTS_ZipFile_1500', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1500 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1500.txt";
    var zipDest = dir + "/ACTS_ZipFile_1500.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1500";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1500.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1500 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1500 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_FULL_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1500 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1500 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1500 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1500 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1500 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1500 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1600
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_FINISH
*/
it('ACTS_ZipFile_1600', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1600.txt";
    var zipDest = dir + "/ACTS_ZipFile_1600.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1600";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1600.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1600 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1600 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_FINISH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1600 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1600 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1600 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1600 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1600 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1600 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1700
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_BLOCK
*/
it('ACTS_ZipFile_1700', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1700 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1700.txt";
    var zipDest = dir + "/ACTS_ZipFile_1700.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1700";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1700.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1700 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1700 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_BLOCK;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1700 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1700 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1700 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1700 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1700 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1700 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1800
* @tc.name: zipFile
* @tc.desc: FlushType.FLUSH_TYPE_TREES
*/
it('ACTS_ZipFile_1800', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1800.txt";
    var zipDest = dir + "/ACTS_ZipFile_1800.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1800";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1800.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1800 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1800 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_TREES;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1800 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1800 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1800 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1800 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1800 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1800 end==================");
})

/*
* @tc.number: ACTS_ZipFile_1900
* @tc.name: zipFile
* @tc.desc: chunkSize: 64,
*/
it('ACTS_ZipFile_1900', 0, async function (done) {
    console.log("==================ACTS_ZipFile_1900 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_1900.txt";
    var zipDest = dir + "/ACTS_ZipFile_1900.zip";
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_1900";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_1900.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_1900 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_1900 write data to file failed with error:" + err);
    });
    try {
        var options = {
            chunkSize: 64,
        };

        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_1900 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_1900 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_1900 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_1900 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_1900 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_1900 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2000
* @tc.name: zipFile
* @tc.desc: chunkSize: 1024,
*/
it('ACTS_ZipFile_2000', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2000 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2000.txt";
    var zipDest = dir + "/ACTS_ZipFile_2000.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2000";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2000.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2000 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2000 write data to file failed with error:" + err);
    });
    try {
        var options = {
            chunkSize: 1024,
        };
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2000 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2000 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2000 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2000 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2000 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2000 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2100
* @tc.name: zipFile
* @tc.desc: chunkSize: 999,
*/
it('ACTS_ZipFile_2100', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2100 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2100.txt";
    var zipDest = dir + "/ACTS_ZipFile_2100.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2100";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2100.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2100 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2100 write data to file failed with error:" + err);
    });
    try {
        var options = {
            chunkSize: 999,
        };
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2100 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2100 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2100 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2100 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2100 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2100 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2200
* @tc.name: zipFile
* @tc.desc: COMPRESS_LEVEL_NO_COMPRESSION,
*/
it('ACTS_ZipFile_2200', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2200 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2200.txt";
    var zipDest = dir + "/ACTS_ZipFile_2200.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2200";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2200.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2200 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2200 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.level = zlib.CompressLevel.COMPRESS_LEVEL_NO_COMPRESSION;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2200 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2200 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2200 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2200 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2200 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2200 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2300
* @tc.name: zipFile
* @tc.desc: COMPRESS_LEVEL_BEST_SPEED,
*/
it('ACTS_ZipFile_2300', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2300 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2300.txt";
    var zipDest = dir + "/ACTS_ZipFile_2300.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2300";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2300.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2300 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2300 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.level = zlib.CompressLevel.COMPRESS_LEVEL_BEST_SPEED;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2300 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2300 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2300 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2300 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2300 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2300 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2400
* @tc.name: zipFile
* @tc.desc: COMPRESS_LEVEL_BEST_COMPRESSION,
*/
it('ACTS_ZipFile_2400', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2400 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2400.txt";
    var zipDest = dir + "/ACTS_ZipFile_2400.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2400";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2400.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2400 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2400 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.level = zlib.CompressLevel.COMPRESS_LEVEL_BEST_COMPRESSION;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2400 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2400 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2400 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2400 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2400 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2400 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2500
* @tc.name: zipFile
* @tc.desc: COMPRESS_LEVEL_DEFAULT_COMPRESSION,
*/
it('ACTS_ZipFile_2500', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2500 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2500.txt";
    var zipDest = dir + "/ACTS_ZipFile_2500.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2500";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2500.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2500 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2500 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.level = zlib.CompressLevel.COMPRESS_LEVEL_DEFAULT_COMPRESSION;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2500 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2500 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2500 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2500 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2500 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2500 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2600
* @tc.name: zipFile
* @tc.desc: MEM_LEVEL_MIN_MEMLEVEL,,
*/
it('ACTS_ZipFile_2600', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2600.txt";
    var zipDest = dir + "/ACTS_ZipFile_2600.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2600";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2600.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2600 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2600 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.memLevel = zlib.MemLevel.MEM_LEVEL_MIN;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2600 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2600 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2600 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2600 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2600 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2600 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2700
* @tc.name: zipFile
* @tc.desc: MEM_LEVEL_MAX_MEMLEVEL,,
*/
it('ACTS_ZipFile_2700', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2700 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2700.txt";
    var zipDest = dir + "/ACTS_ZipFile_2700.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2700";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2700.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2700 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2700 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.memLevel = zlib.MemLevel.MEM_LEVEL_MAX;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2700 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2700 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2700 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2700 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2700 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2700 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2800
* @tc.name: zipFile
* @tc.desc: MEM_LEVEL_DEFAULT_MEMLEVEL,,
*/
it('ACTS_ZipFile_2800', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2800 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2800.txt";
    var zipDest = dir + "/ACTS_ZipFile_2800.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2800";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2800.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2800 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2800 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.memLevel = zlib.MemLevel.MEM_LEVEL_DEFAULT;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2800 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2800 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2800 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2800 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2800 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2800 end==================");
})

/*
* @tc.number: ACTS_ZipFile_2900
* @tc.name: zipFile
* @tc.desc: COMPRESS_STRATEGY_DEFAULT_STRATEGY,,
*/
it('ACTS_ZipFile_2900', 0, async function (done) {
    console.log("==================ACTS_ZipFile_2900 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_2900.txt";
    var zipDest = dir + "/ACTS_ZipFile_2900.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_2900";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_2900.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_2900 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_2900 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_DEFAULT_STRATEGY;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_2900 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_2900 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_2900 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_2900 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_2900 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_2900 end==================");
})

/*
* @tc.number: ACTS_ZipFile_3000
* @tc.name: zipFile
* @tc.desc: COMPRESS_STRATEGY_FILTERED,,
*/
it('ACTS_ZipFile_3000', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3000 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3000.txt";
    var zipDest = dir + "/ACTS_ZipFile_3000.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3000";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3000.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3000 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3000 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_FILTERED;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_3000 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_3000 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_3000 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_3000 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_3000 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_3000 end==================");
})

/*
* @tc.number: ACTS_ZipFile_3100
* @tc.name: zipFile
* @tc.desc: COMPRESS_STRATEGY_HUFFMAN_ONLY,,
*/
it('ACTS_ZipFile_3100', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3100 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3100.txt";
    var zipDest = dir + "/ACTS_ZipFile_3100.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3100";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3100.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3100 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3100 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_HUFFMAN_ONLY;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_3100 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_3100 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_3100 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_3100 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_3100 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_3100 end==================");
})

/*
* @tc.number: ACTS_ZipFile_3200
* @tc.name: zipFile
* @tc.desc: COMPRESS_STRATEGY_RLE,,
*/
it('ACTS_ZipFile_3200', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3200 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3200.txt";
    var zipDest = dir + "/ACTS_ZipFile_3200.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3200";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3200.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3200 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3200 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_RLE;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_3200 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_3200 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_3200 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_3200 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_3200 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_3200 end==================");
})

/*
* @tc.number: ACTS_ZipFile_3300
* @tc.name: zipFile
* @tc.desc: COMPRESS_STRATEGY_FILTERED,,
*/
it('ACTS_ZipFile_3300', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3300 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3300.txt";
    var zipDest = dir + "/ACTS_ZipFile_3300.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3300";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3300.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3300 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3300 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_FILTERED;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_3300 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_3300 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_3300 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_3300 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_3300 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_3300 end==================");
})

/*
* @tc.number: ACTS_ZipFile_3400
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_3400', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3400 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = "";
    var zipDest = dir + "/ACTS_ZipFile_3400.zip"
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    zlib.zipFile(path, dir, options).then((data) => {
        console.log("ACTS_ZipFile_3400 data: " + data);
        expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
        done();
    }).catch((err) => {
        console.log("ACTS_ZipFile_3400 err: " + err);
        done();
    });
    console.log("==================ACTS_ZipFile_3400 end ==================");
})

/*
* @tc.number: ACTS_ZipFile_3500
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_3500', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3500 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3500.txt";
    let src = dir + "/ACTS_ZipFile_5500.txt";
    var zipDest = dir + "/ACTS_ZipFile_3500.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3500";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3500.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3500 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3500 write data to file failed with error:" + err);
    });

    var options = {};
    zlib.zipFile(src, dir, options).then((data) => {
        console.log("zipFilePromise_3500 data: " + data);
        expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
        done();
    }).catch((err) => {
        console.log("zipFilePromise_3500 err: " + err);
        done();
    });
    console.log("==================zipFilePromise_3500 end ==================");
})

/*
* @tc.number: ACTS_ZipFile_3600
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_3600', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3600.txt";
    var zipDest = "";
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3600";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3600.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3600 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3600 write data to file failed with error:" + err);
    });
    var options = {};
    zlib.zipFile(path, zipDest, options).then((data) => {
        console.log("zipFilePromise_3600 data: " + data);
        expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
        done();
    }).catch((err) => {
        console.log("zipFilePromise_3600 err: " + err);
        done();
    });
    console.log("==================zipFilePromise_3600 end ==================")

})

/*
* @tc.number: ACTS_ZipFile_3700
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_3700', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3700 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3700.txt";
    var zipDest = dir + "/ACTS_ZipFile_3700.zip";
    var src = dir + "/ACTS_ZipFile_6600.zip";
    let infos = path + dir;
    let unzipresultfilefirst = "/data/accounts/account_0/appdata";
    let unzipresultfilersecond = unzipresultfilefirst + "/com.example.amsZipfileUnzipfileST";
    let unzipresultfilerThrid = unzipresultfilersecond+"/com.example.amsZipfileUnzipfileST";
    let unzipresult=unzipresultfilerThrid+"/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_9200";
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3700";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3700 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3700 write data to file failed with error:" + err);
    });
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    zlib.zipFile(src, unzipresultfile, options).then((data) => {
        console.log("zipFilePromise_3700 data: " + data);
        expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
        done();
    }).catch((err) => {
        console.log("zipFilePromise_3700 err: " + err);
        done();
    });
    console.log("==================zipFilePromise_3700 end ==================");

    fileio.mkdir(unzipdir).then(function () {
        console.info("ACTS_ZipFile_3700 mkdir successfully");
    }).catch(function (error) {
        console.info("ACTS_ZipFile_3700 mkdir failed with error:" + error);
    });

})

/*
* @tc.number: ACTS_ZipFile_3800
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_3800', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3800 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3800.txt";
    var zipDest = dir + "/ACTS_ZipFile_3800.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3800";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3800.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3800 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3800 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_3800 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_3800 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_3800 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_3800 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_3800 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_3800 end==================");
})

/*
* @tc.number: ACTS_ZipFile_3900
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_3900', 0, async function (done) {
    console.log("==================ACTS_ZipFile_3900 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_3900.txt";
    var zipDest = dir + "/ACTS_ZipFile_3900.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_3900";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_3900.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_3900 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_3900 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_3900 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_3900 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_3900 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_3900 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_3900 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_3900 end==================");
})

/*
* @tc.number: ACTS_ZipFile_4000
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4000', 0, async function (done) {
    console.log("==================FWK_ZipFile_0600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_4000.txt";
    var zipDest = dir + "/ACTS_ZipFile_4000.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4000";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_4000.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_4000 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_4000 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_4000 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_4000 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_4000 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_4000 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_0500 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_4000 end==================");
})

/*
* @tc.number: ACTS_ZipFile_4100
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4100', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4100 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_4100.txt";
    var zipDest = dir + "/ACTS_ZipFile_4100.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4100";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_4100.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_4100 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_4100 write data to file failed with error:" + err);
    });
    try {
        var options = {};
        options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
        await zlib.zipFile(path, zipDest, options,
            (err, data) => {
                var zipStat = fileio.statSync(zipDest);
                var isFile = zipStat.isFile();
                expect(isFile).assertTrue();
                var srcSize = fileio.statSync(path).size;
                var destSize = zipStat.size;
                expect(srcSize > destSize).assertTrue();
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                fileio.mkdir(unzipdir).then(function () {
                    console.info("ACTS_ZipFile_4100 mkdir successfully");
                }).catch(function (error) {
                    console.info("ACTS_ZipFile_4100 mkdir failed with error:" + error);
                });
                zlib.unzipFile(zipDest, unzipdir, options).then((data) => {
                    var unzipStat = fileio.statSync(unzipresultfile);
                    var isFile = unzipStat.isFile();
                    expect(isFile).assertTrue();
                    var destSize = unzipStat.size;
                    var originSize = fileio.statSync(path).size;
                    var result = (originSize == destSize);
                    expect(result).assertTrue();
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
                    console.error('ACTS_ZipFile_4100 unzipFile');
                    done();
                }).catch((err) => {
                    console.log("ACTS_ZipFile_4100 err: " + err);
                    done();

                })
                done();
            });
    } catch (err) {
        console.error('ACTS_ZipFile_4100 err:' + err);
        done();
    }
    console.log("==================ACTS_ZipFile_4100 end==================");
})

/*
* @tc.number: ACTS_ZipFile_4200
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4200', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4200 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let src = dir + "/ACTS_ZipFile_100000.txt";
    let path = dir + "/ACTS_ZipFile_9900.txt";
    var zipDest = dir + "/ACTS_ZipFile_4200.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4200";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_4200.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_0200 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_0200 write data to file failed with error:" + err);
    });

    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.zipFile(src, dir, options,
        (err, data) => {
            console.log("ACTS_ZipFile_4200 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });

})

/*
* @tc.number: ACTS_ZipFile_4300
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4300', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4300 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    var zipDest = dir + "/ACTS_ZipFile_4300.zip"
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.unzipFile(dir, zipDest, options,
        (err, data) => {
            console.log("ACTS_ZipFile_4300 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_4400
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4400', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4400 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_4400.txt";
    var zipDest = dir + "/ACTS_ZipFile_4400.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4400";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_4400.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_4400 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_4400 write data to file failed with error:" + err);
    });
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_PARTIAL_FLUSH;
    zlib.unzipFile(path, zipDest, options,
        (err, data) => {
            console.log("FWK_ZipFile_4400 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_4500
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4500', 0, async function (done) {
    console.log("==================ACTS_ZipFile_5000 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_4500.txt";
    var zipDest = dir + "/ACTS_ZipFile_4500.zip"
    var unzipDest = dir + "/ACTS_ZipFile_9900.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4500";
    let zipdirfirst = "/data/accounts/account_0/appdata";
    let zipdirsecond = zipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let zipdir =zipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_9900";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_4500.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_4500 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_4500 write data to file failed with error:" + err);
    });
    var options = {};
    options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_FILTERED;
    await zlib.zipFile(path, zipDest, options,
        (err, data) => {
            var zipStat = fileio.statSync(zipDest);
            var isFile = zipStat.isFile();
            expect(isFile).assertTrue();
            var srcSize = fileio.statSync(path).size;
            var destSize = zipStat.size;
            expect(srcSize > destSize).assertTrue();
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
            fileio.mkdir(unzipdir).then(function () {
                console.info("ACTS_ZipFile_4500 mkdir successfully");
            }).catch(function (error) {
                console.info("ACTS_ZipFile_4500 mkdir failed with error:" + error);
            });
            zlib.unzipFile(unzipDest, zipdir, options).then((data) => {
                console.log("ACTS_ZipFile_4500 data: " + data);
                expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
                done();
            }).catch((err) => {
                console.log("ACTS_ZipFile_4500 err: " + err);
                done();
            })
            done();
        })
})

/*
* @tc.number: ACTS_ZipFile_4600
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4600', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4600 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = "";
    var zipDest = dir + "/ACTS_ZipFile_4600.txt";
    let infos = path + dir;
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.unzipFile(path, dir, options,
        (err, data) => {
            console.log("ACTS_ZipFile_4600 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });

})

/*
* @tc.number: ACTS_ZipFile_4700
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4700', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4700 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    var zipDest = dir + "/ACTS_ZipFile_4700.zip"
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_NO_FLUSH;
    await zlib.unzipFile(dir, zipDest, options,
        (err, data) => {
            console.log("ACTS_ZipFile_4700 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_4800
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4800', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4800 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_4800.txt";
    var zipDest = dir + "/ACTS_ZipFile_4800.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4800";
    let unzipresultfile = unzipdir + "/ACTS_ZipFile_4800.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_4800 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_4800 write data to file failed with error:" + err);
    });
    var options = {};
    options.flush = zlib.FlushType.FLUSH_TYPE_PARTIAL_FLUSH;
    zlib.unzipFile(path, zipDest, options,
        (err, data) => {
            console.log("ACTS_ZipFile_4800 data: " + data);
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
            done();
        });
})

/*
* @tc.number: ACTS_ZipFile_4900
* @tc.name: zipFile
* @tc.desc: FLUSH_TYPE_NO_FLUSH,,
*/
it('ACTS_ZipFile_4900', 0, async function (done) {
    console.log("==================ACTS_ZipFile_4900 start==================");
    let dirfirst = "/data/accounts/account_0/appdata"
    let dirsecond =dirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let dir = dirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files";
    let path = dir + "/ACTS_ZipFile_4900.txt";
    var zipDest = dir + "/ACTS_ZipFile_4900.zip"
    var unzipDest = dir + "/ACTS_ZipFile_4900.zip"
    let infos = path + dir;
    let unzipdirfirst = "/data/accounts/account_0/appdata";
    let unzipdirsecond = unzipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let unzipdir =unzipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_4900";
    let zipdirfirst = "/data/accounts/account_0/appdata";
    let zipdirsecond = zipdirfirst + "/com.example.amsZipfileUnzipfileST/com.example.amsZipfileUnzipfileST"
    let zipdir =zipdirsecond + "/com.example.amsZipfileUnzipfileST.MainAbility/files/ACTS_ZipFile_9800";
    let unzipresultfile = zipdir + "/ACTS_ZipFile_4900.txt";
    let fd = fileio.openSync(path, 0o100 | 0o2, 0o666);
    fileio.write(fd, infos).then(function (number) {
        console.info("ACTS_ZipFile_4900 write data to file successfully:" + number);
    }).catch(function (err) {
        console.info("ACTS_ZipFile_4900 write data to file failed with error:" + err);
    });
    var options = {};
    options.strategy = zlib.CompressStrategy.COMPRESS_STRATEGY_FILTERED;
    await zlib.zipFile(path, zipDest, options,
        (err, data) => {
            var zipStat = fileio.statSync(zipDest);
            var isFile = zipStat.isFile();
            expect(isFile).assertTrue();
            var srcSize = fileio.statSync(path).size;
            var destSize = zipStat.size;
            expect(srcSize > destSize).assertTrue();
            expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_OK);
            fileio.mkdir(unzipdir).then(function () {
                console.info("ACTS_ZipFile_4900 mkdir successfully");
            }).catch(function (error) {
                console.info("ACTS_ZipFile_4900 mkdir failed with error:" + error);
            });
            zlib.unzipFile(unzipDest, zipdir, options,
                (err, data) => {
                    console.log("ACTS_ZipFile_4900 data: " + data);
                    expect(data).assertEqual(zlib.ErrorCode.ERROR_CODE_ERRNO);
                    done();
                });

        })

    })
})


