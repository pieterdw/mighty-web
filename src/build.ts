const { spawn } = require("child_process");
const fs = require("fs");

export const build = () => {
  return new Promise((resolve, reject) => {
    innerBuild("./src/index.ts")
      .then(() => {
        if (fs.existsSync(".\\src\\admin.ts")) {
          innerBuild("./src/admin.ts")
            .then(resolve)
            .catch(reject);
        } else {
          resolve();
        }
      })
      .catch(reject);
  });
};

const innerBuild = (entryFileName: string) => {
  return new Promise((resolve, reject) => {
    const parcel = spawn(
      ".\\node_modules\\.bin\\parcel.cmd",
      ["build", entryFileName, "--no-source-maps", "--no-cache"].filter(x => x)
    );
    parcel.stdout.on("data", chunk => {
      process.stdout.write(chunk);
    });
    parcel.stderr.on("data", chunk => {
      process.stderr.write(chunk);
    });
    parcel.on("error", console.error);
    parcel.on("close", code => {
      if (code !== 0) {
        console.error(
          `Parcel process exited with code ${code} (building ${entryFileName})`
        );
        reject(code);
      } else {
        console.log("Done building " + entryFileName);
        resolve();
      }
    });
  });
};
