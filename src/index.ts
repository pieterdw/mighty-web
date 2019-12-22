#!/usr/bin/env node

import "babel-polyfill";
import { copyAssetsToDist } from "./assets";
import { build } from "./build";
import { getConfig } from "./config";
import { deploy } from "./deploy";

const exitUnsuccessfully = () => process.exit(1);

console.log("Mighty Web");

getConfig()
  .then(config => {
    let firstReady = false;
    const continueDeploy = () => {
      if (!firstReady) {
        firstReady = true;
        return;
      }

      deploy(config)
        .then(() => {
          console.log("");
          console.log("BUILT & DEPLOYED SUCCESSFULLY");
          process.exit(0);
        })
        .catch(exitUnsuccessfully);
    };
    build()
      .then(continueDeploy)
      .catch(exitUnsuccessfully);
    copyAssetsToDist()
      .then(continueDeploy)
      .catch(exitUnsuccessfully);
  })
  .catch(exitUnsuccessfully);
