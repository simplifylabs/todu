import fs from "fs";
import path from "path";
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

    const pkgPath = path.join(__dirname, "..", "package.json");
    const raw = fs.readFileSync(pkgPath, "utf8");
    const pkg = JSON.parse(raw);

    try {
      update = await checkForUpdate(pkg);
    } catch (e) {}

    if (update) {
      console.clear();
      console.log(error);
      process.exit();
    }
  }
}
