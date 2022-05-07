export function exit() {
  console.clear();
  process.exit();
}

export function init() {
  process.on("SIGINT", () => {
    exit();
  });
}

export default { exit, init };
