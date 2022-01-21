const express = require('express');
const router = express.Router();
const {all} = require('../services/characters');

const validateQueryParams = (req, res, next) => {
    if (req.query.played_by_actors && isNaN(req.query.played_by_actors))
        res.status(400).send({error: 'query param \'played_by_actors\' must be a number'})
    next()
};
router.get('/', [
    validateQueryParams,
    (req, res, next) => {
        if (req.query.played_by_actors)
            res.send(all({played_by_actors: req.query.played_by_actors}))
        else
            res.send(all());
    }
]);

module.exports = router;
