import readPackageJson from "read-package-json";

export interface Config {
  ftpUser: string;
  ftpPassword: string;
  ftpHost: string;
  ftpPort: number;
  ftpDirectory: string;
}

export const getConfig = (): Promise<Config> => {
  return new Promise((resolve, reject) => {
    readPackageJson("./package.json", console.error, false, (err, data) => {
      if (err) {
        console.error("Couldn't read package.json: ", err);
        return reject(err);
      } else {
        const config = data["web"];
        if (process.env.NODE_ENV === "production") {
          if (!config) {
            console.error("No web section in package.json!");
            return reject("No web section in package.json!");
          }
        }
        return resolve(config);
      }
    });
  });
};
