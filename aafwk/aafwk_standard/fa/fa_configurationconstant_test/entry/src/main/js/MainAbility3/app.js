/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import abilityFeatureAbility from '@ohos.ability.featureAbility';
import commonEvent from '@ohos.commonEvent';
export default {
    onCreate() {
        console.info("Application onCreate MainAbility3");
        setTimeout(()=>{
            abilityFeatureAbility.terminateSelf().then((data)=>{
                console.log("Application terminateSelf data：" + JSON.stringify(data) )
            }).catch((error)=>{
                console.log("Application terminateSelf data：" + JSON.stringify(error) )
            })
        },2500)
    },
    onDestroy() {
        console.log("singletonEntryAbulity_onDestroy222");
        commonEvent.publish("ApplicationMainAbility3_onDestroy",()=>{
            console.log("ApplicationMainAbility3_onDestroy publish callBack ApplicationMainAbility2_onDestroy");
        });
    },
    onForgeGround(){
        console.log("singletonEntryAbulity_onForgeGround");
        commonEvent.publish("ApplicationMainAbility3_onForgeGround",()=>{
            console.log("ApplicationMainAbility3_onHide publish callBack ApplicationMainAbility2_onForgeGround");
        });
    }
};
