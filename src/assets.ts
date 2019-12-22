const { spawn } = require("child_process");
import { sync as del } from "del";
import { ncp } from "ncp";

export const copyAssetsToDist = () => {
  del("./dist/");
  return new Promise((resolve, reject) => {
    ncp("./public/", "./dist/", err => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("Done syncing public folder to dist folder.");
      resolve();
    });
  });
};
