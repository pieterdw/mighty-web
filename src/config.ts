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
    readPackageJson("./package.json", console.error, false, (er, data) => {
      if (er) {
        return reject(er);
      } else {
        const config = data["web"];
        if (!config) {
          return reject("No web section in package.json!");
        }
        return resolve(config);
      }
    });
  });
};
