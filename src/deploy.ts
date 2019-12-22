import FtpDeploy from "ftp-deploy";
import { Config } from "./config";

export const deploy = (config: Config): Promise<any> => {
  var ftpConfig = {
    user: config.ftpUser,
    password: config.ftpPassword,
    host: config.ftpHost,
    port: config.ftpPort,
    localRoot: "./dist",
    remoteRoot: config.ftpDirectory,
    include: ["*", "**/*", ".*"],
    exclude: [],
    deleteRemote: true
  };

  console.log("");
  console.log("Deploying to FTP");

  const ftpDeploy = new FtpDeploy();
  return ftpDeploy
    .deploy(ftpConfig)
    .then(result => {
      console.log("Ready deploying to FTP... ");
      console.log(result);
    })
    .catch(err => console.log(err));
};
