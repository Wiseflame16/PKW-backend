const express = require("express");
const router = express.Router();
const api = require('axios');
const fs = require ("fs")

// Aquí se crea el archivo
// fs.writeFile('Registro.txt', '', function (err) {
//   if (err) throw err;
//   console.log('Archivo creado');
// });

// Aquí se agregan las respuestas al archivo
// fs.appendFile('Registro.txt', 'Respuesta 1\n', function (err) {
//   if (err) throw err;
//   console.log('Respuesta agregada al archivo');
// });

// fs.appendFile('Registro.txt', 'Respuesta 2\n', function (err) {
//   if (err) throw err;
//   console.log('Respuesta agregada al archivo');
// });

const Comparador = {
    Acura: 1490733,          'Alfa Romeo': 1490734,    AMC: 1490735,     
    'Aston Martin': 1490736, Audi: 1490737,            Bentley: 1490738, 
    BMW: 1490739,            Buick: 1490740,           Cadillac: 1490741,
    Chevrolet: 1490742,      Chrysler: 1490743,        'Citroën': 1490744,
    Daihatsu: 1490745,       Dodge: 1490746,           DS: 1490747,      
    Eagle: 1490748,          Ferrari: 1490749,         Fiat: 1490750,    
    Ford: 1490751,           Freightliner: 1490752,    GMC: 1490753,     
    'Great Wall': 1490754,   Honda: 1490755,           Hummer: 1490756,  
    Hyundai: 1490757,        Infiniti: 1490758,        International: 1490759,
    Isuzu: 1490760,          Jaguar: 1490761,          Jeep: 1490762,    
    Kia: 1490763,            Lamborghini: 1490764,     Lancia: 1490765,  
    'Land Rover': 1490766,   Lexus: 1490767,           Lincoln: 1490768, 
    Lotus: 1490769,          MARCA: 1490770,           Maserati: 1490771,
    Mazda: 1490772,          'Mercedes Benz': 1490773, Mercury: 1490774, 
    MG: 1490775,             Mini: 1490776,            Mitsubishi: 1490777,
    Nissan: 1490778,         Oldsmobile: 1490779,      Opel: 1490780,    
    Peugeot: 1490781,        Plymouth: 1490782,        Pontiac: 1490783, 
    Porsche: 1490784,        Proton: 1490785,          RAM: 1490786,     
    Renault: 1490787,        'Rolls Royce': 1490788,   Rover: 1490789,   
    SAAB: 1490790,           Saturn: 1490791,          Scion: 1490792,   
    Seat: 1490793,           Simca: 1490794,           Skoda: 1490795,   
    Smart: 1490796,          SsangYong: 1490797,       STOPTECH: 1490798,
    Subaru: 1490799,         Suzuki: 1490800,          Tesla: 1490801,   
    Toyota: 1490802,         Volkswagen: 1490803,      Volvo: 1490804,   
    Weismann: 1490805
}


//GET,POST,DELETE,PUT
router.post("/", async (req, res)=>{
    try{
        const data = "hola"
        let marcas = []
        marcas = req.body
        marcas.forEach((e, i) => {
            setTimeout(() => {
                crearEstructura(e);
              },i * 500);
        });
        res.send(data)
    }catch(e){
        console.log(e)
    }
})
const arrayDePrueba = [

]
function crearEstructura (data) {

let manipulable = data.Marca
let valorMarca = Comparador[`${manipulable}`]

        const categoryEstructure = {
            "category": {
              "name": `${data.Modelo}`,
              "parent_id": valorMarca
            }
        }
        let categoryEstructureDesesctucture = JSON.stringify(categoryEstructure);
        api
            .post(`https://api.jumpseller.com/v1/categories.json?login='.env'&authtoken='.env'`,categoryEstructure)
            .then(res =>{
                let valorFormateado = JSON.stringify(res.data);
                fs.appendFile('Registro.txt', `${valorFormateado}\n`, function (err) {
                    if (err) throw err;
                    console.log('Respuesta agregada al archivo');
                  });
            })
            .catch(err => {
                console.log(err.response.data)
                let valorFormateado2 = JSON.stringify(err.response.data);
                fs.appendFile('Registro.txt', `${categoryEstructureDesesctucture}\n ${valorFormateado2}\n`, function (err) {
                    if (err) throw err;
                    console.log('Error agregado al archivo');
                  });
            })
}
module.exports = router