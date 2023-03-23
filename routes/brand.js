const express = require("express");
const router = express.Router();
const api = require('axios');

//GET,POST,DELETE,PUT
router.post("/", async (req, res)=>{
    try{
        const data = "hola"
        let marcas = []
        marcas = req.body
        marcas.forEach((e, i) => {
            setTimeout(() => {
                crearEstructura(e.Marca);
              },i * 1000);
        });
        res.send(data)
    }catch(e){
        console.log(e)
    }
})
const arrayDePrueba = [

]
function crearEstructura (data) {
        const categoryEstructure = {
            "category": {
              "name": `${data}`,
              "parent_id": 1490732
            }
        }
        api
            .post(`https://api.jumpseller.com/v1/categories.json?login='.env'&authtoken='.env'`,categoryEstructure)
            .then(res =>{
                let manipulable = res.data.category.name
                arrayDePrueba[manipulable] = res.data.category.id 
                console.log(arrayDePrueba)
            })
            .catch(err => {
                console.log(err)
            })
}
module.exports = router