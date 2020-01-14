const { spawn } = require("child_process");
import { sync as del } from "del";
import { ncp } from "ncp";
const fs = require("fs");

export const copyAssetsToDist = (emptyFolderFirst: boolean) => {
  if (emptyFolderFirst) {
    del(["./dist/**", "!./dist"]);
  }
  return new Promise((resolve, reject) => {
    ncp("./public/", "./dist/", err => {
      if (err) {
        console.error(err);
        reject(err);
      }
      console.log("Done syncing public folder to dist folder.");
      setVersionNumber()
        .then(resolve)
        .catch(reject);
      resolve();
    });
  });
};

const setVersionNumber = () => {
  const functionsFileName = ".\\dist\\functions.php";
  const versionNumber = Math.round(Math.random() * 100000) + "";
  return new Promise((resolve, reject) => {
    if (fs.existsSync(functionsFileName)) {
      fs.readFile(functionsFileName, "utf8", (err: any, data: string) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        var result = data.split("{{versionNumber}}").join(versionNumber);
        fs.writeFile(functionsFileName, result, "utf8", (err: any) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }
          console.log("Done setting version number");
          resolve();
        });
      });
    } else {
      resolve();
    }
  });
};
