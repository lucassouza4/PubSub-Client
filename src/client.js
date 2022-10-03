import express from "express";
import inquirer from "inquirer";
import axios from "axios";
import routes from "./routes/routesClient.js";

const app = express();
routes(app);

let brokerPrimario = 3000;
let brokerSecundario = 3001;
let interacoes = 0;
const urlPrimario = "10.128.0.27:";
const urlSecundario = "10.128.0.27:";

const questions = [
    {
        type: 'input',
        name: 'port',
        message: "Qual a porta ?",
    },
];

async function conectarbrokerPrimario() {
    try {
        let resp = await axios.post(`${urlPrimario}${brokerPrimario}/sub/${client.port}`);
        console.log(`Client conectado na porta ${client.port}`);
        console.log(resp.data);
    } catch (error) {
        console.log('Não foi possível conectar ao broker primário... mudando para secundário')
        conectarbrokerSecundario();
    }
}
async function conectarbrokerSecundario() {
    let aux = brokerPrimario;
    brokerPrimario = brokerSecundario;
    brokerSecundario = aux;
    conectarbrokerPrimario();
}

async function unsubscribe() {
    try {
        await axios.delete(`${urlPrimario}${brokerPrimario}/${client.port}`);
        console.log("client desconectado !");
        server.close();
    } catch (error) {
        console.error(error);
    }
}

async function pub() {
    return setTimeout(
        async function () {
            try {
                let resp = await axios.post(`${urlPrimario}${brokerPrimario}/${client.port}`,
                {
                    broker: brokerPrimario,
                });
                console.log(resp.data);
            } catch (error) {
                if(brokerPrimario === 80){
                    conectarbrokerSecundario();
                    console.log("broker primario parou de responder");
                }
                else{
                    console.log("broker secundário parou de responder");
                    interacoes = 10;
                }

                server.close();
            }
            interacoes++;
            if(interacoes < 10) pub();
            if(interacoes == 10) unsubscribe();
        }
        , 1000);
}

const client = await inquirer.prompt(questions);

conectarbrokerPrimario();
pub();

const server = app.listen(client.port)