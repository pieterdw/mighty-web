const { spawn } = require("child_process");
const fs = require("fs");

export const build = () => {
  return new Promise((resolve, reject) => {
    const mightySync = spawn(
      ".\\node_modules\\.bin\\parcel.cmd",
      [
        "build",
        "./src/index.ts",
        fs.existsSync(".\\src\\admin.ts") && "./src/admin.ts",
        "--no-source-maps",
        "--no-cache"
      ].filter(x => x)
    );
    mightySync.stdout.on("data", chunk => {
      process.stdout.write(chunk);
    });
    mightySync.stderr.on("data", chunk => {
      process.stderr.write(chunk);
    });
    mightySync.on("error", console.error);
    mightySync.on("close", code => {
      if (code !== 0) {
        console.error(`child process exited with code ${code}`);
        reject();
      } else {
        console.log("Done building");
        resolve();
      }
    });
  });
};
