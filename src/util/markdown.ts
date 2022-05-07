import fs from "fs";
import path from "path";
import State from "./state";

const header = `<!--
This file was created using Todu.
https://github.com/simplifylabs/todu

IMPORTANT: Do not edit this file manually!
-->\n`;

const title = `# To-Do\n`;
const footer = `\n> Created with [Todu](https://github.com/simplifylabs/todu)\n`;

export default class Markdown {
  static path = path.join(process.cwd(), "TODO.md");

  static read() {
    if (!fs.existsSync(this.path)) return [];
    const raw = fs.readFileSync(this.path, "utf8");
    return this.parse(raw);
  }

  static parse(raw: string) {
    const tasks = [...raw.matchAll(/- \[(X|x| )] (.*)/gm)];
    return tasks.map((t) => ({ text: t[2], done: t[1] == " " ? false : true }));
  }

  static update() {
    if (!State.hasTasks) {
      if (fs.existsSync(this.path)) fs.rmSync(this.path);
      return;
    }

    fs.writeFileSync(this.path, this.getMarkdown(), "utf8");
  }

  static getMarkdown() {
    const tasks = State.list
      .map((t) => `- [${t.done ? "x" : " "}] ${t.text}`)
      .join("\n");
    return `${header}\n${title}\n${tasks}\n${footer}`;
  }
}
