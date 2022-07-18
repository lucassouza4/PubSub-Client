import ClientController from "../controller/clientController.js";

const router = (app)=>{
    app.post('/', ClientController.recive);
}

export default router;