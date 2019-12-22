#!/usr/bin/env node

import "babel-polyfill";
import { getConfig } from "./config";
import { deploy } from "./deploy";

console.log("Mighty Web");
getConfig()
  .then(config => {
    console.log("config:", config);
    deploy(config);
  })
  .catch(er => console.error("Could not fetch config: ", er));
