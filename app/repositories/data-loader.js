const {get} = require('../clients/the-movie-client');

function slugify(name) {
    return name.normalize('NFKD')
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/[-\s]+/g, '-');
}

function collapseToArray(obj, key, collapseOn, value) {
    obj[key] = {...obj[key]}
    if (obj[key].hasOwnProperty(collapseOn))
        obj[key][collapseOn].push(value);
    else
        obj[key][collapseOn] = [value]
}

module.exports = async (movies) => Promise.all(Object.values(movies)
    .map(async movie => {
        let item = await get(`/movie/${movie}?append_to_response=credits`);

        return {
            title: item.title,
            credits: item.credits.cast.map(it => ({
                name: it.name,
                character: it.character
            }))
        }
    }))
    .then(movies => {
        let actors = {}
        movies.map(item => {

            item.credits.forEach(actor => {
                const slug = slugify(actor.name)
                actors[slug] = {
                    slug: slug,
                    name: actor.name,
                    movies: {},
                    ...actors[slug]
                }
                collapseToArray(actors[slug], 'movies', item.title, actor.character);
                collapseToArray(actors[slug], 'characters', actor.character, item.title);
            })
        })
        return actors;
    });