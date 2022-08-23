const express = require('express');
const db = require('./models');
const logger = require('morgan');
const recruitRoute = require('./routes/recruit');
const applyRoute = require('./routes/apply');
const devRoute = require('./routes/forDev');


const app = express();

app.use(express.urlencoded({extended : false}));

db.sequelize.sync({force:false})
    .then(()=>{
        console.log('success');
    })
    .catch((err)=>{
        console.log('fail : ', err);
    });

app.use(logger('dev'));
app.use(express.json());

app.use('/',devRoute);
app.use('/recruit',recruitRoute);
app.use('/apply',applyRoute),



app.listen(3001,()=>{
    console.log('server on 3001')
})

