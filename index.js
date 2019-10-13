const express = require ('express');
const consign = require ('consign');
const bodyParser = require('body-parser')
const cors = require('cors')

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

consign().include('routes').include('uteis').into(app);

app.listen(process.env.PORT || 4000, '127.0.0.1', ()=>{

    console.log('servidor rodando!')
})
