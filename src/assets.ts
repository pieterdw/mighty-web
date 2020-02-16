import { ncp } from "ncp";
import fs from "fs";
import { sync as deleteFiles } from "rimraf";

export const copyAssetsToDist = (emptyFolderFirst: boolean) => {
  if (emptyFolderFirst) {
    try {
      deleteFiles("./dist/*");
    } catch (err) {
      console.log("Couldn't delete contents of dist folder: ", err);
    }
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
