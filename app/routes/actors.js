const express = require('express');
const router = express.Router();
const {all, one} = require('../services/actors');

const validateQueryParams = (req, res, next) => {
    if (req.query.characters_played && isNaN(req.query.characters_played))
        res.status(400)
            .send({error: 'query param \'characters_played\' must be a number'})
    next()
};

function mapMovies(it) {
    return Object.keys(it.movies).map(m => ({name: m, characters: it.movies[m]}));
}

function mapCharacters(it) {
    return Object.keys(it.characters).map(c => ({name: c, movies: it.characters[c]}));
}

router.get('/', [
    validateQueryParams,
    (req, res, next) => {
        res.send(all({characters_played: req.query.characters_played})
            .map(it => {
                return {
                    ...it,
                    movies: mapMovies(it),
                    characters: mapCharacters(it)
                }
            })
        );
    }
]);

router.get('/:slug', function (req, res, next) {
    let actor = one(req.params.slug);
    if (actor)
        res.send({
            ...actor,
            movies: mapMovies(actor),
            characters: mapCharacters(actor)
        });
    else
        res.status(404).send({error: `actor with id '${req.params.slug}' not found`})
});

module.exports = router;
