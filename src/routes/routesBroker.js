import BrokerController from "../controller/brokerController.js";

const router = (app)=>{
    app.post('/sub/:id', BrokerController.subscriber);
    app.post('/:id', BrokerController.consumirRecurso);
    app.put('/backup', BrokerController.backup);
    app.delete('/:id', BrokerController.unsubscribe);
}

export default router;