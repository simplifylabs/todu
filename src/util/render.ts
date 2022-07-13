import State, { ITask } from "./state";
import chalk from "chalk";

const help = `
   ${chalk.bold("Keybinds")}
   ${chalk.dim("Everything you need to know.")}

      ${chalk.bold("Space")}            ${chalk.dim("Toggle current task")}
      ${chalk.bold("Up/Down")}          ${chalk.dim("Move cursor up/down")}
      ${chalk.bold("Shift + Up/Down")}  ${chalk.dim("Move item up/down")}
      ${chalk.bold("A")}                ${chalk.dim("Add task")}
      ${chalk.bold("D")}                ${chalk.dim("Delete current task")}
      ${chalk.bold("E")}                ${chalk.dim("Edit current task")}
      ${chalk.bold("H")}                ${chalk.dim("Show/Hide help page")}
      ${chalk.bold("Q")}                ${chalk.dim("Exit tudo")}

   ${chalk.dim("Press")} ${chalk.bold("Q")} ${chalk.dim("to exit this screen.")}
`;

const empty = `      No tasks yet!
      ${chalk.dim("Press")} ${chalk.bold("A")} ${chalk.dim("to add one.")}
`;

export default class Render {
  static tab = "   ";

  static update() {
    console.clear();
    if (State.help) console.log(help);
    else console.log(this.getListOutput());
  }

  static getListOutput() {
    let output = `\n${this.tab}${chalk.bold("To-Do:")}\n`;
    output += `${this.tab}${chalk.dim(`(Press "H" for help)`)}\n\n`;

    output += this.getShowenTasks()
      .map((task: ITask | undefined) => {
        if (task == undefined)
          return `${this.tab}${this.tab} ${chalk.dim("...")}`;

        const icon = task.done ? chalk.green("✔️") : chalk.red("🗙");
        const text =
          task.index == State.selected ? chalk.bgGray(task.text) : task.text;
        const caret =
          task.index == State.selected && State.typing ? chalk.bgGray("_") : "";

        return `${this.tab}${this.tab} ${icon} ${text}${caret}`;
      })
      .join("\n");

    if (!State.hasTasks) output += empty;

    output += "\n";
    return output;
  }

  static getShowenTasks() {
    let count = process.stdout.rows - 6;
    if (State.list.length < count) return State.listWithIndex;

    const countAroundSelected = Math.floor((count - 1) / 2);
    const lastIndex = State.list.length - 1;

    let start = State.selected - countAroundSelected;
    let end = State.selected + countAroundSelected;

    if (start < 0) {
      end += start * -1;
      start = 0;
    }

    if (end > lastIndex) {
      start -= end - lastIndex;
      end = lastIndex;
    }

    const list: (ITask | undefined)[] = [...State.listWithIndex].splice(
      start,
      end - start + 1
    );

    if (start > 0) list[0] = undefined;
    if (end < lastIndex) list[list.length - 1] = undefined;

    return list;
  }
}
