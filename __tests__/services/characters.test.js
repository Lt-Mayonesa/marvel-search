const repository = require('../../app/repositories/movie-repository')
const charactersService = require('../../app/services/characters')

jest.mock('../../app/repositories/movie-repository')

beforeEach(() => {
    jest.clearAllMocks()
})

test('there are no actors', async () => {
    repository.getAllActors.mockImplementation(() => [])

    expect(charactersService.all()).toStrictEqual([])
});

test('there is one actor', async () => {
    repository.getAllActors.mockImplementation(() => ([
        {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Tony Stark / Iron Man'],
            }
        }
    ]))

    expect(charactersService.all()).toStrictEqual([
        {
            role: 'Tony Stark / Iron Man',
            actors: [
                'robert-downey-jr'
            ]
        }
    ])
});

test('there are multiple actors playing different roles', async () => {
    repository.getAllActors.mockImplementation(() => ([
        {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Tony Stark / Iron Man'],
            }
        },
        {
            name: 'Terrence Howard',
            slug: 'terrence-howard',
            characters: {
                'James \'Rhodey\' Rhodes': ['Iron Man']
            },
            movies: {
                'Iron Man': ['James \'Rhodey\' Rhodes'],
            }
        },
        {
            name: 'Jeff Bridges',
            slug: 'jeff-bridges',
            characters: {
                'Obadiah Stane / Iron Monger': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Obadiah Stane / Iron Monger'],
            }
        }
    ]))

    expect(charactersService.all()).toStrictEqual([
        {
            role: 'Tony Stark / Iron Man',
            actors: [
                'robert-downey-jr'
            ]
        },
        {
            role: 'James \'Rhodey\' Rhodes',
            actors: [
                'terrence-howard'
            ]
        },
        {
            role: 'Obadiah Stane / Iron Monger',
            actors: [
                'jeff-bridges'
            ]
        }
    ])
});

test('there are multiple actors the same role', async () => {
    repository.getAllActors.mockImplementation(() => ([
        {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Tony Stark / Iron Man'],
            }
        },
        {
            name: 'Terrence Howard',
            slug: 'terrence-howard',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man 2']
            },
            movies: {
                'Iron Man 2': ['Tony Stark / Iron Man'],
            }
        },
        {
            name: 'Jeff Bridges',
            slug: 'jeff-bridges',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man 3']
            },
            movies: {
                'Iron Man 3': ['Tony Stark / Iron Man'],
            }
        }
    ]))

    expect(charactersService.all()).toStrictEqual([
        {
            role: 'Tony Stark / Iron Man',
            actors: [
                'robert-downey-jr',
                'terrence-howard',
                'jeff-bridges'
            ]
        }
    ])
});