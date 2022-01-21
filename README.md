# marvel-search

We will need a web server that will answer these questions:

1. Which Marvel movies did each actor play in?
2. Actors who played more than one Marvel character?
3. BONUS – Are there 2 different actors who played the same role?

## API

`base path: /api/v1`

### `GET` /actors

Get a list of all the actors with the movies they appear in, and the characters they played.

#### query params

| name | required | type |description |
| ---- | -------- | ---- | ----------- |
| characters_played | no | number | filter result to actors who played the same or more of the characters specified. |

#### response

```json
[
  {
    "slug": "ioan-gruffudd",
    "name": "Ioan Gruffudd",
    "movies": [
      {
        "name": "Fantastic Four",
        "characters": [
          "Reed Richards / Mr. Fantastic"
        ]
      },
      {
        "name": "Fantastic Four: Rise of the Silver Surfer",
        "characters": [
          "Reed Richards / Mr. Fantastic"
        ]
      }
    ],
    "characters": [
      {
        "name": "Reed Richards / Mr. Fantastic",
        "movies": [
          "Fantastic Four",
          "Fantastic Four: Rise of the Silver Surfer"
        ]
      }
    ]
  }
]
```

### `GET` /characters

Get a list of all the characters in the MCU with the actors that played them.

#### query params

| name | required | type |description |
| ---- | -------- | ---- | ----------- |
| played_by_actors | no | number | filter the characters to those played by (or more than) the actors specified in parameter. |

#### response

```json
[
  {
    "role": "Reed Richards / Mr. Fantastic",
    "actors": [
      "ioan-gruffudd",
      "miles-teller"
    ]
  },
  {
    "role": "Sue Storm / Invisible Woman",
    "actors": [
      "jessica-alba",
      "kate-mara"
    ]
  }
]
```

## Development

### get started

install dependencies

```bash
npm i
```

start server

```bash
npm start
```

run unit tests

```bash
npm run test
```

run e2e tests

```bash
npm start
npm run e2e
```