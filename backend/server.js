require("dotenv").config();
const http = require("http");

const app = require("./app");

// Je pense qu'il y a des trucs à rajoutter pour sequelize.
// Vers le milieu de la page là, au dessus de "Define the Sequelize Model"
// https://www.bezkoder.com/angular-13-node-js-express-mysql/#Full-stack_Angular_13_038_Node_Express_Architecture

app.set("port", process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.info(
    `App is running : http://localhost: ${process.env.PORT || 3000}`
  );
});
