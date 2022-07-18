export default class ClientController {
    static recive = ((_req,res)=>{
        res.status(200).send();
        console.log({message:"Mensagem recebida"}); 
    })
}