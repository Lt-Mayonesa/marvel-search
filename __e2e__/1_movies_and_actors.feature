Feature: Which Marvel movies did each actor play in?

  Background:
    * url 'http://localhost:3000/api/v1'
    * def moviesStructure =
    """
    {
      name: '#string',
      characters: '#array'
    }
    """
    * def charactersStructure =
    """
    {
      name: '#string',
      movies: '#array'
    }
    """
    * def structure =
    """
    {
      slug: '#string',
      name: '#string',
      movies: #[] moviesStructure,
      characters: #[] charactersStructure
    }
    """

  Scenario: all actors with their movies
    Given path '/actors'
    When method get
    Then status 200
    And match response == '#[] structure'

  Scenario: search one actor
    Given path '/actors/ioan-gruffudd'
    When method get
    Then status 200
    And match response ==
    """
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
    """

  Scenario: actor not found
    Given path '/actors/cris-evano'
    When method get
    Then status 404
    And match response ==
    """
    { error: "actor with id 'cris-evano' not found" }
    """