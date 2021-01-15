const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promos = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.get((req, res, next)=>{
    Promos.find({})
    .then((promos) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.post((req, res, next)=>{
    Promos.create(req.body)
    .then((promos) => {
        console.log("Promo Created ", dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos)
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put((req, res, next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported on /promotions');
})
.delete((req, res, next)=>{
    Promos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
})

promoRouter.route('/:promoId')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next)=>{
    res.end('Will send details of the promotion: ' + req.params.promoId + ' to you');
})
.post((req, res, next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/' + req.params.promoId);
})
.put((req, res, next)=>{
    res.write('Updating the promotion:s ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req, res, next)=>{
    res.end('Deleting promotion: ' + req.params.promoId);
})


module.exports = promoRouter;