#!/usr/bin/env node

import "core-js/features/promise";
import minimist from "minimist";
import { copyAssetsToDist } from "./assets";
import { build as doBuild } from "./build";
import { getConfig } from "./config";
import { deploy as doDeploy } from "./deploy";

console.log("Mighty Web");

const deploy = (build: boolean) => {
  console.log("DEPLOY");

  getConfig()
    .then(config => {
      console.log("Building and copying files...");
      let firstReady = false;
      const continueDeploy = () => {
        console.log('Continue with deploy');
        
        if (!firstReady && build) {
          firstReady = true;
          return;
        }
        doDeploy(config)
          .then(() => {
            console.log("");
            console.log((build ? "BUILT & " : "") + "DEPLOYED SUCCESSFULLY");
            console.log("");
            process.exit(0);
          })
          .catch(exitUnsuccessfully);
      };
      if (build) {
        doBuild()
          .then(continueDeploy)
          .catch(exitUnsuccessfully);
      } else {
        console.log("Skipping build...");
      }
      copyAssetsToDist(build)
        .then(continueDeploy)
        .catch(exitUnsuccessfully);
    })
    .catch(exitUnsuccessfully);
};

const help = () => {
  console.log("Execute mighty-web deploy to deploy an SK web app.");
  console.log("Add --nobuild to skip the build step.");
};

const exitUnsuccessfully = () => process.exit(1);

const argv = minimist(process.argv.slice(2));
if (argv._.includes("deploy")) {
  deploy(!argv.nobuild);
} else if (argv._.includes("build")) {
  doBuild()
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.log("Error: ", err);
      process.exit(1);
    });
} else {
  help();
}
