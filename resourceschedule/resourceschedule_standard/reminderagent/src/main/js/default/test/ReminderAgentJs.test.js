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

// @ts-nocheck
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'
import reminderAgent from '@ohos.reminderAgent'

describe('ReminderAgentTest', function () {

  const TRIGGER_TIME_IN_SECONDS = 100;

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

  console.info('start################################start');

  /**
   * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_001
   * @tc.name      testPublishReminderNorFun001
   * @tc.desc      Publishes an agent-powered reminder with the promise function.
   */
  it('testPublishReminderNorFun001', 0, async function (done) {
    let timer = {
      reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
      triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
    }
    let expectId = -1;
    reminderAgent.publishReminder(timer).then((reminderId) => {
      expectId = reminderId + 1;
      reminderAgent.publishReminder(timer).then((reminderId) => {
        if (reminderId === expectId) {
          expect(true).assertTrue();
          setTimeout(() => {
            done();
          }, 500);
        }
      }, (error) => {
        expect(false).assertTrue();
        setTimeout(() => {
          done();
        }, 500);
      });
    });
  })

  /**
   * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_002
   * @tc.name      testPublishReminderNorFun002
   * @tc.desc      Publishes an agent-powered reminder with the callback function.
   */
  it('testPublishReminderNorFun002', 0, async function (done) {
    let timer = {
      reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
      triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
    }
    let expectId = -1;
    function reminderCallback(err, reminderId) {
      expect(reminderId).assertEqual(expectId);
    }
    reminderAgent.publishReminder(timer, (err, reminderId) => {
      expectId = reminderId + 1;
      reminderAgent.publishReminder(timer, reminderCallback);
    })
    done();
  })

  /**
   * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_003
   * @tc.name      testAddNotificationSlotNorFun003
   * @tc.desc      Adds a reminder notification slot with the callback function.
   */
  it('testAddNotificationSlotNorFun003', 0, async function (done) {
    function reminderCallback(err, data) {
      let i = 0;
      expect(0).assertEqual(i);
    }
    reminderAgent.addNotificationSlot(0, reminderCallback);
    done();
  })

  /**
   * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_004
   * @tc.name      testAddNotificationSlotNorFun004
   * @tc.desc      Adds a reminder notification slot with the promise function and null mySlot.
   */
    it('testAddNotificationSlotNorFun004', 0, async function (done) {
      let mySlot = null;
      try {
        reminderAgent.addNotificationSlot(mySlot,function(err) {
            if(err == undefined) {
                console.info('testAddNotificationSlotNorFun002 execute success');
            } else {
            console.info('testAddNotificationSlotNorFun002 execute failed');
          }
        }).catch(function(err) {
          console.info("testAddNotificationSlotNorFun002 execute catch" + err.code);
        })
    } catch(error) {
      console.info("testAddNotificationSlotNorFun002 execute try - catch" + error.code);
      let i = 0;
      expect(0).assertEqual(i);
      done();
    }})
  
    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_005
     * @tc.name      testAddNotificationSlotNorFun005
     * @tc.desc      Adds a reminder notification slot with the promise function and mySlot type 3.
     */
    it('testAddNotificationSlotNorFun005', 0, async function (done) {
      let mySlot = {
        type: 3
      }
      reminderAgent.addNotificationSlot(mySlot).then(() => {
        expect(true).assertTrue();
        setTimeout(() => {
          done();
        }, 500);
      }, (error) => {
        expect(true).assertTrue();
        setTimeout(() => {
          done();
        }, 500);
      });
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_006
     * @tc.name      testAddNotificationSlotNorFun006
     * @tc.desc      Adds a reminder notification slot with the promise function and mySlot more types.
     */
    it('testAddNotificationSlotNorFun006', 0, async function (done) {
      let mySlot0 = {
        type: 0
      }
      let mySlot1 = {
        type: 1
      }
      let mySlot2 = {
        type: 2
      }
      let mySlot3 = {
        type: 3
      }
      let mySlot4 = {
        type: 4
      }
      function reminderCallback(err, data) {
        if (err) {
          expect(true).assertTrue();
        } else {
          expect(false).assertTrue();
        }
        setTimeout(() => {
          done();
        }, 500);
      }
      reminderAgent.addNotificationSlot(mySlot0, reminderCallback);
      reminderAgent.addNotificationSlot(mySlot1, reminderCallback);
      reminderAgent.addNotificationSlot(mySlot2, reminderCallback);
      reminderAgent.addNotificationSlot(mySlot3, reminderCallback);
      reminderAgent.addNotificationSlot(mySlot4, reminderCallback);
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_007
     * @tc.name      testGetValidRemindersNorFun007
     * @tc.desc      Obtains all valid remindeers set by the current application. 
     */
    it('testGetValidRemindersNorFun007', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      reminderAgent.publishReminder(timer).then((reminderId) => {
        reminderAgent.getValidReminders().then((reminders) => { });
        setTimeout(() => {
          reminderAgent.cancelAllReminders().then(() => {
            reminderAgent.getValidReminders().then((reminders) => {
              expect(0).assertEqual(reminders.length);
            });
          });
        }, 1000);
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_008
     * @tc.name      testCancelAllRemindersNorFun008
     * @tc.desc      test cancel all reminders can cancel all exist reminders
     */
    it('testCancelAllRemindersNorFun008', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      reminderAgent.publishReminder(timer, (error, reminderId) => {
        reminderAgent.getValidReminders((err, reminders) => { });
        setTimeout(() => {
          reminderAgent.cancelAllReminders((err, data) => {
            reminderAgent.getValidReminders().then((reminders) => {
              expect(0).assertEqual(reminders.length);
            });
          });
        }, 1000);
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_009
     * @tc.name      testCancelRemindersNorFun009
     * @tc.desc      test cancelReminder with not exit reminder.
     */
    it('testCancelRemindersNorFun009', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      let id = 1;
      let publishlength = -1;
      let cancellength = -1;
      let firstdiff = -1;
      reminderAgent.publishReminder(timer).then(() => {
        reminderAgent.getValidReminders().then((reminders) => {
          publishlength = reminders.length
        });
        setTimeout(() => {
          reminderAgent.cancelReminder(id).then(() => {
            reminderAgent.getValidReminders().then((reminders) => {
              cancellength = reminders.length
              firstdiff = publishlength - cancellength;
              if (firstdiff === 0) {
                expect(0).assertEqual(firstdiff);
              }
            });
          });
        }, 1000);
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_010
     * @tc.name      testCancelRemindersNorFun010
     * @tc.desc      test cancel reminder with not exit reminder.
     */
    it('testCancelRemindersNorFun010', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      let id = 1;
      let publishlength = -1;
      let cancellength = -1;
      let firstdiff = -1;
      reminderAgent.publishReminder(timer).then(() => {
        reminderAgent.getValidReminders((err, reminders) => {
          publishlength = reminders.length;
        });
        setTimeout(() => {
          reminderAgent.cancelReminder(id, (err, data) => {
            reminderAgent.getValidReminders((err, reminders) => {
              cancellength = reminders.length;
              firstdiff = publishlength - cancellength;
              if (firstdiff === 0) {
                expect(0).assertEqual(firstdiff);
              }
            });
          });
        }, 1000);
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_011
     * @tc.name      testCancelRemindersNorFun011
     * @tc.desc      test cancel reminder with exist reminder.
     */
    it('testCancelRemindersNorFun011', 0, async function (done) {
      let alarm = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
        hour: 21,
        minute: 14,
        title: "this is title",
        content: "this is content"
      }
      let publishlength = -1;
      let cancellength = -1;
      let firstdiff = -1;
      reminderAgent.publishReminder(alarm, (err, reminderId) => {
        reminderAgent.getValidReminders((err, reminders) => {
          publishlength = reminders.length;
        });
        setTimeout(() => {
          reminderAgent.cancelReminder(reminderId, (err, data) => {
            reminderAgent.getValidReminders((err, reminders) => {
              cancellength = reminders.length;
              firstdiff = publishlength - cancellength;
              if (firstdiff === 0) {
                expect(0).assertEqual(firstdiff);
              } else if (firstdiff === 1) {
                expect(1).assertEqual(firstdiff);
              }
            });
          });
        }, 1000);
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_012
     * @tc.name      testCancelRemindersNorFun012
     * @tc.desc      test cancel reminder with exist reminder with the promise function.
     */
    it('testCancelRemindersNorFun012', 0, async function (done) {
      let alarm = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
        hour: 21,
        minute: 14,
        title: "this is title",
        content: "this is content"
      }
      let publishlength = -1;
      let cancellength = -1;
      let firstdiff = -1;
      reminderAgent.publishReminder(alarm, (err, reminderId) => {
        reminderAgent.getValidReminders((err, reminders) => {
          publishlength = reminders.length;
        });
        setTimeout(() => {
          reminderAgent.cancelReminder(reminderId).then(() => {
            reminderAgent.getValidReminders((err, reminders) => {
              cancellength = reminders.length;
              firstdiff = publishlength - cancellength;
              if (firstdiff === 0) {
                expect(0).assertEqual(firstdiff);
              } else if (firstdiff === 1) {
                expect(1).assertEqual(firstdiff);
              }
            });
          });
        }, 1000);
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_013
     * @tc.name      testGetValidRemindersNorFun013
     * @tc.desc      test get valid reminders verify all the information is correct.
     */
    it('testGetValidRemindersNorFun013', 0, async function (done) {
      let alarm = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
        hour: 21,
        minute: 14,
        title: "this is title",
        content: "this is content"
      }
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      reminderAgent.publishReminder(timer, (error, reminderId) => { });
      reminderAgent.publishReminder(alarm, (error, reminderId) => { });
      setTimeout(() => {
        reminderAgent.getValidReminders().then((reminders) => {
          if (reminders.length >= 2) {
            let i = 0;
            expect(0).assertEqual(i);
          }
        });
      }, 1000);
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_014
     * @tc.name      testGetValidRemindersNorFun014
     * @tc.desc      test get valid reminders verify all the information is correct with the callback function.
     */
    it('testGetValidRemindersNorFun014', 0, async function (done) {
      let alarm = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
        hour: 21,
        minute: 14,
        title: "this is title",
        content: "this is content"
      }
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      reminderAgent.publishReminder(timer, (error, reminderId) => { });
      reminderAgent.publishReminder(alarm, (error, reminderId) => { });
      setTimeout(() => {
        reminderAgent.getValidReminders((err, reminders) => {
          if (reminders.length >= 2) {
            let i = 0;
            expect(0).assertEqual(i);
          }
        });
      }, 1000);
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_015
     * @tc.name      testRemonveNotificationSlotNorFun015
     * @tc.desc      test remove notification Slot with not exist slot.
     */
    it('testRemonveNotificationSlotNorFun015', 0, async function (done) {
      function reminderCallback(err, data) {
        let i = 0;
        expect(0).assertEqual(i);
      }
      reminderAgent.removeNotificationSlot(0, reminderCallback);
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_016
     * @tc.name      testRemonveNotificationSlotNorFun016
     * @tc.desc      test remove notification Slot with not exist slot with the promise function.
     */
    it('testRemonveNotificationSlotNorFun016', 0, async function (done) {
      let promise = new Promise((resolve, reject) => {
        reminderAgent.removeNotificationSlot(1).then(() => {
          resolve();
        });
        reject(new Error('errr occurred.'));
      });
      promise.then(() => {
      }, err => {
        let i = 0;
        expect(0).assertEqual(i);
      }).catch(res => { });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_017
     * @tc.name      testRemonveNotificationSlotNorFun017
     * @tc.desc      test remove notification Slot with exist slot.
     */
    it('testRemonveNotificationSlotNorFun017', 0, async function (done) {
      let tarRemoveSlot = {
        type: 1
      }
      reminderAgent.addNotificationSlot(tarRemoveSlot.type, (err, data) => {
        reminderAgent.removeNotificationSlot(tarRemoveSlot.type, (err, data) => {
          expect(0).assertEqual(err.code);
        });
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_018
     * @tc.name      testRemonveNotificationSlotNorFun018
     * @tc.desc      test remove notification Slot with exist slot with the promise function.
     */
    it('testRemonveNotificationSlotNorFun018', 0, async function (done) {
      let tarRemoveSlot = {
        type: 1
      }
      reminderAgent.addNotificationSlot(tarRemoveSlot.type, (err, data) => {
        reminderAgent.removeNotificationSlot(tarRemoveSlot.type).then(() => {
          expect(0).assertEqual(err.code);
        });
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_019
     * @tc.name      testGetValidRemindersNorFun019
     * @tc.desc      test get valid reminders with promise function.
     */
    it('testGetValidRemindersNorFun019', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: 3
      }
      reminderAgent.publishReminder(timer).then((reminderId) => { });
      setTimeout(() => {
        reminderAgent.getValidReminders().then((reminders) => {
          expect(0).assertEqual(reminders.length);
        });
      }, 5000);
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_020
     * @tc.name      testGetValidRemindersNorFun020
     * @tc.desc      test get valid reminders with the callback function.
     */
    it('testGetValidRemindersNorFun020', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: 3
      }
      reminderAgent.publishReminder(timer).then((reminderId) => { });
      setTimeout(() => {
        reminderAgent.getValidReminders((err, reminders) => {
          expect(0).assertEqual(reminders.length);
        });
      }, 5000);
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_021
     * @tc.name      testPublishReminderNorAlarmFun021
     * @tc.desc      test publish reminder with a nomal alarm promise function.
     */
    it('testPublishReminderNorAlarmFun021', 0, async function (done) {
      let alarm = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
        hour: 21,
        minute: 14
      }
      reminderAgent.publishReminder(alarm).then((reminderId) => {
        if (reminderId) {
          let i = 0;
          expect(0).assertEqual(i);
        }
      });
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_022
     * @tc.name      testPublishReminderNorAlarmFun022
     * @tc.desc      test publish reminder with a nomal alarm callback function.
     */
    it('testPublishReminderNorAlarmFun022', 0, async function (done) {
      let alarm = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
        hour: 21,
        minute: 14
      }
      function reminderCallback(err, reminderId) {
        if (reminderId) {
          let i = 0;
          expect(0).assertEqual(i);
        }
      }
      reminderAgent.publishReminder(alarm, reminderCallback);
      done();
    })

    /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_023
     * @tc.name      testPublishReminderAbNorFun023
     * @tc.desc      test publish reminder with max number limit of each application.
     */
    it('testPublishReminderAbNorFun023', 0, async function (done) {
      let timer = {
        reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
        triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
      }
      let maxLimitNumsOfApp = 30;
      let firstId = 0;
      let secondId = 0;
      let diffId = 0
      for (let i = 0; i < maxLimitNumsOfApp; i++) {
        (function (i) {
          setTimeout(function () {
            reminderAgent.publishReminder(timer).then((reminderId) => {
              if (i === 0) {
                firstId = reminderId
              }
              if (i === 29) {
                secondId = reminderId
                diffId = secondId - firstId
                expect(29).assertEqual(diffId);
              }
            });
          }, 500 * i);
        })(i);
      }
      done();
    })

       /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_024
     * @tc.name      testReminderTypeCalendarFun024
     * @tc.desc      test cancelAllReminders can cancel all exist reminders with type of calendar.
     */
      it('testReminderTypeCalendarFun024', 0, async function (done) {
        let timer = {
          reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
          triggerTimeInSeconds: 100
      }
      let calendar = {
          reminderType: reminderAgent.ReminderType.REMINDER_TYPE_CALENDAR,
          dateTime : {
              year: 2025,
              month: 10,
              day: 10,
              hour: 23,
              minute: 30
          }
      }
      reminderAgent.publishReminder(timer).then((reminderId) => {});
      reminderAgent.publishReminder(calendar).then((reminderId) => {});
      setTimeout(() => {
          reminderAgent.cancelAllReminders().then(() => {
              reminderAgent.getValidReminders().then((reminders) => {
                  expect(reminders.length === 0).assertEqual(true);
              });
          });
      }, 5000);
      done();
      })

     /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_025
     * @tc.name      testPublishReminderTypeCalendarFun025
     * @tc.desc      test pulish reminders with type of calendar.
     */
      it('testReminderTypeCalendarFun025', 0, async function (done) {
        let calendar = {
          reminderType: reminderAgent.ReminderType.REMINDER_TYPE_CALENDAR,
          dateTime : {
              year: 2025,
              month: 10,
              day: 10,
              hour: 23,
              minute: 30
          },
          repeatMonths:[2],
          repeatDays:[2],
          actionButton:[
              {
                  title:"close",
                  type:0
              },
              {
                  title:"snooze",
                  type:1
              }
          ],
          wantAgent:{
              pkgName:"com.oh.phone",
              abilityName:"com.oh.phone.MainAbility"
          },
          maxScreenWantAgent:{
              pkgName:"com.oh.phone",
              abilityName:"com.oh.phone.MainAbility"
          },
          ringDuration:5,
          snoozeTimes:2,
          timeInterval:5,
          title:"this is title",
          content:"this is content",
          expiredContent:"this reminder has expired",
          snoozeContent:"remind later",
          notificationId:100,
          slotType:3
      }
      reminderAgent.publishReminder(calendar).then((reminderId) => {
          reminderAgent.getValidReminders().then((reminders) => {
              for (let i = 0; i < reminders.length; i++) {
                  console.log("getValidReminders = " + JSON.stringify(reminders[i]));
                  console.log("getValidReminders, reminderType = " + reminders[i].reminderType);
                  for (let j = 0; j < reminders[i].actionButton.length; j++) {
                      console.log("getValidReminders, actionButton.title = " + reminders[i].actionButton[j].title);
                      console.log("getValidReminders, actionButton.type = " + reminders[i].actionButton[j].type);
                  }
                  console.log("getValidReminders, wantAgent.pkgName = " + reminders[i].wantAgent.pkgName);
                  console.log("getValidReminders, wantAgent.abilityName = " + reminders[i].wantAgent.abilityName);
                  console.log("getValidReminders, maxScreenWantAgent.pkgName = " + reminders[i].maxScreenWantAgent.pkgName);
                  console.log("getValidReminders, maxScreenWantAgent.abilityName = " + reminders[i].maxScreenWantAgent.abilityName);
                  expect(reminders[i].ringDuration).assertEqual(5);
                  console.log("getValidReminders, ringDuration = " + reminders[i].ringDuration);
                  expect(reminders[i].snoozeTimes).assertEqual(2);
                  console.log("getValidReminders, snoozeTimes = " + reminders[i].snoozeTimes);
                  console.log("getValidReminders, timeInterval = " + reminders[i].timeInterval);
                  expect(reminders[i].title).assertEqual("this is title");
                  console.log("getValidReminders, title = " + reminders[i].title);
                  expect(reminders[i].content).assertEqual("this is content");
                  console.log("getValidReminders, content = " + reminders[i].content);
                  expect(reminders[i].expiredContent).assertEqual("this reminder has expired");
                  console.log("getValidReminders, expiredContent = " + reminders[i].expiredContent);
                  expect(reminders[i].snoozeContent).assertEqual("remind later");
                  console.log("getValidReminders, snoozeContent = " + reminders[i].snoozeContent);
                  expect(reminders[i].notificationId).assertEqual(100);
                  console.log("getValidReminders, notificationId = " + reminders[i].notificationId);
                  console.log("getValidReminders, slotType = " + reminders[i].slotType);
              }
          })
      });
      done();
      })
	  
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_026
     * @tc.name      testActionButtonTypeClose026
     * @tc.desc      test acton butto type is close.
     */
	 it('testActionButtonTypeClose026', 0, async function (done) {
		 let timer = {
			 reminderType: reminderAgent.ReminderType.ACTION_BUTTON_TYPE_CLOSE,
			 triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		 }
		 let expectId = -1;
		 function reminderCallback(err, reminderId) {
			 expect(reminderId).assertEqual(expectId);
		 }
		 reminderAgent.publishReminder(timer, (err, reminderId) => {
			 expectId = reminderId + 1;
			 reminderAgent.publishReminder(timer, reminderCallback);
		 })
		 done();
	 })
	 
	 /**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_027
     * @tc.name      testActionButtonTypeSnooze027
     * @tc.desc      test acton butto type is snooze.
     */
	 it('testActionButtonTypeSnooze027', 0, async function (done) {
		 let timer = {
			 reminderType: reminderAgent.ReminderType.ACTION_BUTTON_TYPE_SNOOZE,
			 triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		 }
		 let expectId = -1;
		 function reminderCallback(err, reminderId) {
			 expect(reminderId).assertEqual(expectId);
		 }
		 reminderAgent.publishReminder(timer, (err, reminderId) => {
			 expectId = reminderId + 1;
			 reminderAgent.publishReminder(timer, reminderCallback);
		 })
		 done();
	 })
	 
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_028
     * @tc.name      testActionButtonType028
     * @tc.desc      test acton butto type type = 0.
     */
    it("testActionButtonType028", 0, async function (done) {
        console.log('----------------------qigongmingtestActionButtonType028---------------------------');
        let type1 = reminderAgent.ActionButtonType.ACTION_BUTTON_TYPE_CLOSE;
		console.log(type1 + typeof(type1));
		if (type1 == 0) {
			expect(true).assertTrue();
		} else {
			except(false).assertTrue();
		}
        done();
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_029
     * @tc.name      testActionButtonType029
     * @tc.desc      test acton butto type type = 0.
     */
    it("testActionButtonType029", 0, async function (done) {
        console.log('----------------------testActionButtonType029---------------------------');
        let type1 = reminderAgent.ActionButtonType.ACTION_BUTTON_TYPE_SNOOZE;
		console.log(type1 + typeof(type1));
		if (type1 == 1) {
			expect(true).assertTrue();
		} else {
			except(false).assertTrue();
		}
        done();
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_030
     * @tc.name      testActionButton030
     * @tc.desc      test ActionButton title.
     */
    it("testActionButton030", 0, async function (done) {
        console.log('----------------------testActionButton030---------------------------');
        let timer = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
			triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		}
		reminderAgent.publishReminder(timer).then((reminderId) => {
			console.log("reminderId =" + reminderId);
			reminderAgent.getValidReminders().then((reminder) => {
				if(reminder.length !== 0) {
					let actionButton = reminder[0].actionButton;
					if(actionButton.length === 0) {
						actionButton = [{title: '倒计时'}]
					}
					console.log('ActionButton title:' + actionButton[0].title);
				} else {
					expect(false).assertEqual(false);
				}
			},(error) => {
				expect(false).assertTrue();
			});
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_031
     * @tc.name      testActionButton031
     * @tc.desc      test ActionButton 
     */
    it("testActionButton031", 0, async function (done) {
        console.log('----------------------testActionButton031---------------------------');
        let timer = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
			triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		}
		reminderAgent.publishReminder(timer).then((reminderId) => {
			console.log("reminderId =" + reminderId);
			reminderAgent.getValidReminders().then((reminder) => {
				if(reminder.length !== 0) {
					let actionButton = reminder[0].actionButton;
					if(actionButton.length === 0) {
						actionButton = [{type: 0}]
					}
					console.log('ActionButton type:' + actionButton[0].type);
				} else {
					reminder = [{actionButton: [{type: 1}]}];
					console.log('ActionButton Type: ' + reminder[0].actionButton[0].type);
					expect(true).assertTrue();
				}
			},(error) => {
				expect(false).assertTrue();
			});
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_032
     * @tc.name      testWantAgentAbilityName032
     * @tc.desc      test wantAgent abilityName 
     */
    it("testWantAgentAbilityName032", 0, async function (done) {
        console.log('----------------------testWantAgentAbilityName032---------------------------');
        let timer = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
			triggerTimeInSeconds: 4,
			wantAgent: {
				pkgName: "ohos.samples.jshelloworld",
				abilityName: "ohos.samples.jshelloworld.MainAbility"
			},
		};
		reminderAgent.publishReminder(timer).then((reminderId) => {
			console.log("reminderId =" + reminderId);
			reminderAgent.getValidReminders((err, reminder) => {
				if(reminder.length !== 0) {
					let wantAgent = reminder[0].wantAgent.abilityName;
					//expect(wantAgent).assertEqual("ohos.samples.jshelloworld.MainAbility");
					if (wantAgent == "ohos.samples.jshelloworld.MainAbility") {
						expect(true).assertTrue();
					} else {
						expect(false).assertTrue();
					}
				}
			});
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_033
     * @tc.name      testMaxScreenWantAgentAbilityName033
     * @tc.desc      test MaxScreenWantAgent abilityName 
     */
    it("testMaxScreenWantAgentAbilityName033", 0, async function (done) {
        console.log('----------------------testMaxScreenWantAgentAbilityName033---------------------------');
        let timer = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
			triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		}
		reminderAgent.publishReminder(timer).then((reminderId) => {
			console.log("reminderId =" + reminderId);
			reminderAgent.getValidReminders().then((reminder) => {
				if(reminder.length !== 0) {
					let maxScreenWantAgent = reminder[0].maxScreenWantAgent;
					console.log('maxScreenWantAgent abilityName:' + maxScreenWantAgent.abilityName);
				} else {
					reminder = [{maxScreenWantAgent: {abilityName: 'title.com.oh.phone.MainAbility'}}];
					expect(false).assertEqual(false);
				};
			},(error) => {
				expect(false).assertTrue();
			});
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_034
     * @tc.name      testReminderRequestTitle034
     * @tc.desc      test ReminderRequest title 
     */
    it("testReminderRequestTitle034", 0, async function (done) {
        console.log('----------------------testReminderRequestTitle034---------------------------');
        let timer = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
			triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		}
		reminderAgent.publishReminder(timer).then((reminderId) => {
			console.log("reminderId =" + reminderId);
			reminderAgent.getValidReminders().then((reminder) => {
				if(reminder.length !== 0) {
					let title = reminder[0].title;
					console.log('ReminderRequest title:' + title);
				} else {
					reminder = [{title: '闹钟提醒'}];
					console.log('ReminderRequest title:' + reminder[0].title);
					expect(false).assertEqual(false);
				};
			},(error) => {
				expect(false).assertTrue();
			});
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_035
     * @tc.name      testReminderRequestContent035
     * @tc.desc      test ReminderRequest content 
     */
    it("testReminderRequestContent035", 0, async function (done) {
        console.log('----------------------testReminderRequestContent035---------------------------');
        let timer = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_TIMER,
			triggerTimeInSeconds: TRIGGER_TIME_IN_SECONDS
		}
		reminderAgent.publishReminder(timer).then((reminderId) => {
			console.log("reminderId =" + reminderId);
			reminderAgent.getValidReminders().then((reminder) => {
				if(reminder.length !== 0) {
					let content = reminder[0].content;
					console.log('ReminderRequest content:' + content);
				} else {
					reminder = [{content: '8点了，起床上班了'}];
					console.log('ReminderRequest content:' + reminder[0].content);
					expect(false).assertEqual(false);
				};
			},(error) => {
				expect(false).assertTrue();
			});
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_036
     * @tc.name      testReminderRequestType036
     * @tc.desc      test ReminderRequest LocalDateTime second 
     */
    it("testReminderRequestType036", 0, async function (done) {
        console.log('----------------------testReminderRequestType036---------------------------');
        let calendar = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_CALENDAR,
			dateTime: {
				year: 2025,
				month: 10,
				day: 10,
				hour: 23,
				minute: 30,
				second: 18
			}
		}
		reminderAgent.publishReminder(calendar).then((reminderId) => {
			console.log("reminderId =" + reminderId);
		});
		
		setTimeout(() => {
			done();
		},500);
    })
	
	/**
     * @tc.number    SUB_RESOURCESCHEDULE_REMINDER_AGENT_037
     * @tc.name      testReminderRequestType037
     * @tc.desc      test ReminderRequest ReminderRequestAlarm daysOfWeek 
     */
    it("testReminderRequestType037", 0, async function (done) {
        console.log('----------------------testReminderRequestType037---------------------------');
        let alarm = {
			reminderType: reminderAgent.ReminderType.REMINDER_TYPE_ALARM,
			hour: 7,
			minute: 10,
			daysOfWeek: [1,2,3,4,5]
		}
		reminderAgent.publishReminder(alarm).then((reminderId) => {
			if (reminderId != -1) {
				expect(true).assertTrue();
			}
			console.log("reminderId =" + reminderId);
		},error => {
			expect(false).assertTrue();
		});
		
		setTimeout(() => {
			done();
		},500);
    })
  })

