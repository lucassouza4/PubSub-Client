import axios from "axios";

let clients = [];
let mensagens = [];
const url ="http://10.128.0.33";

async function fazerBackup(port){
    if(port == 3000){
        try {
            await axios.put(`${url}:3001/backup`,mensagens,
            {
                headers: {
                    broker: port // NECESSARIO ??? --------------------------------
                }
            });
        } catch (error) {
            console.log("não foi possível realizar o backup");
        }
    }
}

export default class BrokerController { // RENOMEAR CLASSE E ARQUIVO ------------------------
    static subscriber(req,res){
        let {id} = req.params;   

        clients.push(id);
        
        res.status(200).send(); 
        console.log(`${id} se inscreveu`);
    }

    static async consumirRecurso(req,res){
        let {id} = req.params;

        mensagens.push({acquire:`client ${id} - recurso X`});

        setTimeout(async function(){
            mensagens.push({release:`client ${id} - recurso X`});
            await fazerBackup(req.body.broker);
        },1000)

        res.status(200).send(mensagens); 
    }

    static backup(req,res){
        let data = req.body;

        mensagens = data;
        console.log("backup realizado com sucesso !");

        return res.status(200).send(true);
    }

    static async unsubscribe(req,res){
        let {id} = req.params;   
    
        clients = clients.filter((client)=> client != id);
        console.log(`${id} se desinscreveu`);

        res.status(200).send(true); 
    }
}