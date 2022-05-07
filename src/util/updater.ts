import checkForUpdate from "update-check";
import chalk from "chalk";

const error = `
   A new version of Todu is available.
   ${chalk.dim("Please run")} ${chalk.bgGray(
  " npm i -g todu@latest "
)} ${chalk.dim("to install it!")}
`;

export default class Updater {
  static async init() {
    if (process.env.NODE_ENV == "development") return;
    let update = null;

    try {
      update = await checkForUpdate(require("../../package.json"));
    } catch (e) {}

    if (update) {
      console.clear();
      console.log(error);
      process.exit();
    }
  }
}
