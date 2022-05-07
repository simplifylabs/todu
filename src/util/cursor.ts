import signalExit from "signal-exit";

export default class Cursor {
  static restoring = false;

  static show() {
    if (!process.stderr.isTTY) return;
    process.stderr.write("\u001B[?25h");
  }

  static hide() {
    if (!process.stderr.isTTY) return;
    this.restore();
    process.stderr.write("\u001B[?25l");
  }

  static restore() {
    if (this.restoring) return;
    this.restoring = true;

    signalExit(
      () => {
        process.stderr.write("\u001B[?25h");
      },
      { alwaysLast: true }
    );
  }
}
