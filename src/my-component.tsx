/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import { useState } from 'react';
import axios from 'axios';
import cookieClient from 'react-cookie'

export interface MyComponentProps extends BlockAttributes {
  message: string;
}

export const MyComponent = ({  }: MyComponentProps): ReactElement => {
  const [eloBefore, seteloBefore] = useState("");
  const [eloOpponent, seteloOpponent] = useState("");
  const [wonBinary, setwonBinary] = useState("");
  const [eloAfter, seteloAfter] = useState(1);

  let updateElo = function (eloAfter:number) {
    const url = "https://ccthomastest.staffbase.rocks/api/users/61c1cba1afc36f3a3a9de018"
    const payload = {
      "profile": { "position": "eloAfter" }
    }
  
    axios.put(url, payload,{ withCredentials: true })
      .then(function (response:any) {
        console.log(response);
      })
      .catch(function (error:string) {
        console.log(error);
      });
  }

  let calcElo = function (e:Event) {
    e.preventDefault();
    console.log(eloBefore);
    console.log(eloOpponent);
    console.log(wonBinary);
    let wonYesNo = Number(wonBinary)
    let eloDifference = Number(eloOpponent) - Number(eloBefore);
    let winProbability = 1 / (1 + 10 ^ (eloDifference / 150));
    let maxChange = 16;
    let change = (wonYesNo - winProbability) * maxChange;
    let newElo = Number(eloBefore) + Number(change);
    seteloAfter(newElo);
    updateElo(newElo)
  };
  return <div><form onSubmit={(e:any) => calcElo(e)}>
    <label>eloBefore</label><input id="eloBefore" type="number" name="message" value={eloBefore} onChange={(e) => seteloBefore(e.target.value)} />
    <label>eloOpponent</label><input id="eloOpponent" type="number" name="message" value={eloOpponent} onChange={(e) => seteloOpponent(e.target.value)} />
    <label>wonBinary</label><input id="wonBinary" type="number" name="message" value={wonBinary} onChange={(e) => setwonBinary(e.target.value)} />

    <input id="submit" type="submit" />
    
  </form>
    Your new rating is {Number(eloAfter)}
  </div>
}