#! /usr/bin/env node
import Keypress from "./util/keypress";
import Render from "./util/render";
import State from "./util/state";
import Exit from "./util/exit";
import Updater from "./util/updater";

(async () => {
  Updater.init();
  State.load();
  Keypress.init();
  Exit.init();
  Render.update();
})();
