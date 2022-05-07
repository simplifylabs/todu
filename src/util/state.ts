import Markdown from "./markdown";
import Render from "./render";

export interface ITask {
  index?: number;
  text: string;
  done: boolean;
}

export default class State {
  static selected = 0;
  static typing = false;
  static help = false;

  static list: ITask[] = [];

  static load() {
    State.list = Markdown.read();
  }

  static openHelp() {
    State.help = true;
    Render.update();
  }

  static closeHelp() {
    State.help = false;
    Render.update();
  }

  static up() {
    State.selected--;
    if (State.selected < 0) State.selected = 0;
    Render.update();
  }

  static down() {
    State.selected++;
    if (State.selected > State.list.length - 1)
      State.selected = State.list.length - 1;
    Render.update();
  }

  static toggle() {
    const current = State.list[State.selected];
    current.done = !current.done;

    State.list.splice(State.selected, 1);
    State.list.unshift(current);

    State.sort();
    Render.update();
    Markdown.update();
  }

  static remove() {
    if (!State.hasTasks) return;

    State.list.splice(State.selected, 1);
    if (State.selected > State.list.length - 1)
      State.selected = State.list.length - 1;

    Render.update();
    Markdown.update();
  }

  static add() {
    State.list.unshift({ text: "", done: false });
    State.selected = 0;
    State.typing = true;
    Render.update();
  }

  static edit() {
    if (!State.hasTasks) return;
    State.typing = true;
    Render.update();
  }

  static finishType() {
    if (!State.hasTasks) return;
    State.typing = false;

    if (State.list[State.selected].text == "") {
      State.list.splice(State.selected, 1);
      if (State.selected > State.list.length - 1)
        State.selected = State.list.length - 1;
    }

    Render.update();
    Markdown.update();
  }

  static type(char: string) {
    State.list[State.selected].text += char;
    Render.update();
  }

  static backspace() {
    const current = State.list[State.selected].text;
    State.list[State.selected].text = current.slice(0, -1);
    Render.update();
  }

  static get hasTasks() {
    return State.list.length > 0;
  }

  static sort() {
    return State.list.sort((a, b) => (a.done === b.done ? 0 : b.done ? -1 : 1));
  }

  static get listWithIndex() {
    return State.list.map((t, i) => ({ ...t, index: i }));
  }
}
