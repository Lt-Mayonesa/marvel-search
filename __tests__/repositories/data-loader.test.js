const client = require('../../app/clients/the-movie-client')
const loader = require('../../app/repositories/data-loader')

jest.mock('../../app/clients/the-movie-client')

test('load single actor from movie ', async () => {
    client.get.mockImplementation(url => {
        return url === '/movie/123?append_to_response=credits' && {
            title: 'Iron Man',
            credits: {
                cast: [
                    {
                        name: 'Robert Downey Jr',
                        character: 'Tony Stark / Iron Man'
                    }
                ]
            }
        }
    })

    let res = await loader({
        'Iron Man': 123
    })

    expect(res).toStrictEqual({
        'robert-downey-jr': {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Tony Stark / Iron Man'],
            }
        }
    })
})

test('load multiple actors from movie', async () => {
    client.get.mockImplementation(url => {
        return url === '/movie/123?append_to_response=credits' && {
            title: 'Iron Man',
            credits: {
                cast: [
                    {
                        name: 'Robert Downey Jr',
                        character: 'Tony Stark / Iron Man'
                    },
                    {
                        name: 'Terrence Howard',
                        character: 'James \'Rhodey\' Rhodes'
                    },
                    {
                        name: 'Jeff Bridges',
                        character: 'Obadiah Stane / Iron Monger'
                    }
                ]
            }
        }
    })

    let res = await loader({
        'Iron Man': 123
    })

    expect(res).toStrictEqual({
        'robert-downey-jr': {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Tony Stark / Iron Man'],
            }
        },
        'terrence-howard': {
            name: 'Terrence Howard',
            slug: 'terrence-howard',
            characters: {
                'James \'Rhodey\' Rhodes': ['Iron Man']
            },
            movies: {
                'Iron Man': ['James \'Rhodey\' Rhodes'],
            }
        },
        'jeff-bridges': {
            name: 'Jeff Bridges',
            slug: 'jeff-bridges',
            characters: {
                'Obadiah Stane / Iron Monger': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Obadiah Stane / Iron Monger'],
            }
        }
    })
})

test('load single actor with multiple characters from movie ', async () => {
    client.get.mockImplementation(url => {
        return url === '/movie/123?append_to_response=credits' && {
            title: 'Iron Man',
            credits: {
                cast: [
                    {
                        name: 'Robert Downey Jr',
                        character: 'Tony Stark / Iron Man'
                    },
                    {
                        name: 'Robert Downey Jr',
                        character: 'Obadiah Stane / Iron Monger'
                    }
                ]
            }
        }
    })

    let res = await loader({
        'Iron Man': 123
    })

    expect(res).toStrictEqual({
        'robert-downey-jr': {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': ['Iron Man'],
                'Obadiah Stane / Iron Monger': ['Iron Man']
            },
            movies: {
                'Iron Man': [
                    'Tony Stark / Iron Man',
                    'Obadiah Stane / Iron Monger'
                ],
            }
        }
    })
})

test('load multiple actors from multiple movies', async () => {
    client.get.mockImplementation(url => {
        return {
            '/movie/456?append_to_response=credits': {
                title: 'Iron Man 2',
                credits: {
                    cast: [
                        {
                            name: 'Robert Downey Jr',
                            character: 'Tony Stark / Iron Man'
                        },
                        {
                            name: 'Terrence Howard',
                            character: 'James \'Rhodey\' Rhodes'
                        }
                    ]
                }
            },
            '/movie/123?append_to_response=credits': {
                title: 'Iron Man',
                credits: {
                    cast: [
                        {
                            name: 'Robert Downey Jr',
                            character: 'Tony Stark / Iron Man'
                        },
                        {
                            name: 'Jeff Bridges',
                            character: 'Obadiah Stane / Iron Monger'
                        }
                    ]
                }
            }
        }[url]
    })

    let res = await loader({
        'Iron Man': 123,
        'Iron Man 2': 456
    })

    expect(res).toStrictEqual({
        'robert-downey-jr': {
            name: 'Robert Downey Jr',
            slug: 'robert-downey-jr',
            characters: {
                'Tony Stark / Iron Man': [
                    'Iron Man',
                    'Iron Man 2'
                ]
            },
            movies: {
                'Iron Man': ['Tony Stark / Iron Man'],
                'Iron Man 2': ['Tony Stark / Iron Man'],
            }
        },
        'terrence-howard': {
            name: 'Terrence Howard',
            slug: 'terrence-howard',
            characters: {
                'James \'Rhodey\' Rhodes': ['Iron Man 2']
            },
            movies: {
                'Iron Man 2': ['James \'Rhodey\' Rhodes'],
            }
        },
        'jeff-bridges': {
            name: 'Jeff Bridges',
            slug: 'jeff-bridges',
            characters: {
                'Obadiah Stane / Iron Monger': ['Iron Man']
            },
            movies: {
                'Iron Man': ['Obadiah Stane / Iron Monger'],
            }
        }
    })
})

//TODO: add logic to handle server errors and skip movies with them
test('dont handle request errors', async () => {
    client.get.mockImplementation(() => {
        throw new Error('Request failed with status code 404')
    })

    try {
        await loader({
            'Iron Man': 123
        })
    } catch (e) {
        expect(e).toBeInstanceOf(Error)
        expect(e.message).toBe('Request failed with status code 404')
    }

})