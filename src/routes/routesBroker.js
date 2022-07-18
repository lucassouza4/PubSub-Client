import BrockerController from "../controller/brockerController.js";

const router = (app)=>{
    app.post('/sub/:id', BrockerController.subscriber);
    app.post('/:id', BrockerController.consumirRecurso);
    app.put('/backup', BrockerController.backup);
    app.delete('/:id', BrockerController.unsubscribe);
}

export default router;