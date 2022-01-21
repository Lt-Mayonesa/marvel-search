Feature: Actors who played more than one Marvel character?

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

  Scenario: there are 102 actors who played 2 or more characters
    Given path '/actors'
    And param characters_played = 2
    When method get
    Then status 200
    And match response == '#[102] structure'

  Scenario: there are 8 actors who played 4 or more characters
    Given path '/actors'
    And param characters_played = 4
    When method get
    Then status 200
    And match response == '#[8] structure'

  Scenario: there is 1 actor who played 10 or more characters
    Given path '/actors'
    And param characters_played = 10
    When method get
    Then status 200
    And match response == '#[1] structure'
