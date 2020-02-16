const { spawn } = require("child_process");
const fs = require("fs");

export const build = () => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Starting build");

      const args = ["build"]
        .concat(
          fs
            .readdirSync(".\\src\\")
            .filter(f => f.endsWith(".ts"))
            .map(f => `.\\src\\${f}`)
        )
        .concat(["--no-source-maps", "--no-cache"]);

      const parcel = spawn(".\\node_modules\\.bin\\parcel.cmd", args);
      console.log(`Executing Parcel with args: ${args.join(" ")}`);

      parcel.stdout.on("data", chunk => {
        process.stdout.write(chunk);
      });
      parcel.stderr.on("data", chunk => {
        process.stderr.write(chunk);
      });
      parcel.on("error", console.error);
      parcel.on("close", code => {
        if (code !== 0) {
          console.error(`Child process exited with code ${code}`);
          reject();
        } else {
          console.log("Done building");
          resolve();
        }
      });
    } catch (err) {
      console.log("Problem during build: ", err);
    }
  });
};
