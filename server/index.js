console.clear();
import {} from "http";
import ExpressServer, { response } from "express";
import { send } from "process";

const PORT = 3000;
const app = ExpressServer();
const data = [];

app.use(ExpressServer.json());

//Obtener los detalles de una cuenta con el guid
app.get('/account/:guid', (req, res)=>{

    console.log(req.params.guid);
    const user = data.find((user)=> user.guid === req.params.guid);
    if(!user) res.status(404).send();
    res.send();
});
//Crear una cuenta
app.post('/account', (req, res)=>{});
//Actualizar una cuenta
app.patch('/account', (req, res)=>{});
//Eliminar una cuenta
app.delete('/account', (req, res)=>{});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});