let db = {}

const initDb = (data) => {
    db = data
    console.log('db initilized')
    return Promise.resolve()
}

module.exports = {

    __init: initDb,

    getAllActors: (characters_played) => {
        let result = Object.keys(db)
            .map(k => db[k]);
        if (characters_played)
            return result.filter(it => Object.keys(it.characters).length >= characters_played)
        else
            return result
    },

    getActor: (slug) => {
        return db[slug]
    }
}