import { exit } from "./exit";
import Cursor from "./cursor";
import State from "./state";

export default class Keypress {
  static bindings: { [key: string]: Function } = {
    h: State.openHelp,
    escape: exit,
    q: exit,
    up: State.up,
    down: State.down,
    j: State.down,
    k: State.up,
    d: State.remove,
    delete: State.remove,
    e: State.edit,
    a: State.add,
    space: State.toggle,
    left: State.toggle,
    right: State.toggle,
    return: State.toggle,
  };

  static init() {
    require("keypress")(process.stdin);
    Cursor.hide();

    process.stdin.setRawMode(true);
    process.stdin.resume();

    process.stdin.on("keypress", (ch, key) => this.onKeypress(ch, key));
  }

  static onKeypress(char: any, key: any) {
    if (key && key.ctrl && key.name == "c") exit();

    if (State.help) {
      if (
        key &&
        (key.name == "return" ||
          key.name == "escape" ||
          key.name == "q" ||
          key.name == "h")
      )
        State.closeHelp();
    } else if (State.typing) {
      if (key && (key.name == "return" || key.name == "escape"))
        return State.finishType();
      if (key && key.name == "backspace") return State.backspace();
      else if (char) State.type(char);
    } else {
      if (key?.name && this.bindings[String(key.name)])
        this.bindings[key.name](key);
    }
  }
}
