const { fork } = require("child_process");

const tokens = [
  process.env.TOKEN1,
  process.env.TOKEN2,
  process.env.TOKEN3,
  process.env.TOKEN4,
  process.env.TOKEN5,
];

tokens.forEach((token, index) => {
  if (!token) {
    console.log(`TOKEN${index + 1} not found`);
    return;
  }

  fork("./bot.js", [], {
    env: {
      ...process.env,
      TOKEN: token,
      BOT_NUMBER: index + 1,
    },
  });
});
