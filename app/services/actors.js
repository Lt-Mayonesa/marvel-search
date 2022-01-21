const repository = require('../repositories/movie-repository')

module.exports = {
    all: ({characters_played} = {}) => repository.getAllActors(characters_played),

    one: (slug) => repository.getActor(slug)
}