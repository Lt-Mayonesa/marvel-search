const repository = require('../repositories/movie-repository')

//TODO: this operation could be cached on another module
function getRoles() {
    return Object.entries(repository.getAllActors()
        .reduce((acc, cur) => {
            return {
                ...acc,
                ...Object.entries(cur.characters)
                    .map(it => [it[0], [cur.slug]])
                    .reduce((a, [role, slugs]) => {
                        if (role in a)
                            a[role] = a[role].concat(slugs);
                        else
                            a[role] = slugs;
                        return a;
                    }, acc)
            }
        }, {}))
        .map(([role, actors]) => ({role, actors}));
}

module.exports = {
    all: ({played_by_actors} = {}) => {
        if (played_by_actors)
            return getRoles()
                .filter(({role, actors}) => actors.length >= played_by_actors)

        return getRoles()
    }
}