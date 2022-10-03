import express from "express";
import inquirer from "inquirer";
import bodyParser from 'body-parser'
import routes from "./routes/routesBroker.js";

const app = express();
app.use(bodyParser.json());
routes(app);

const questionBroker = [
    {
        type: 'input',
        name: 'broker',
        message: "qual a porta do broker ? (3000|3001)",
    },
];

const questionsStop = [
    {
        type: 'input',
        name: 'parar',
        message: "Deseja parar o broker ? (Y|N)\n",
    },
];

async function main(){
    resp = await inquirer.prompt(questionsStop);
    if(resp.parar === "Y" || resp.parar === "y") server.close();
}

let resp = await inquirer.prompt(questionBroker);

const server = app.listen(resp.broker,()=>{
    console.log(`\nBroker ouvindo na porta ${resp.broker}\n`);
})

main();