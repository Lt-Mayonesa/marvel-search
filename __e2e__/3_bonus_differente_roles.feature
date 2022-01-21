Feature: Are there 2 different actors who played the same role?

  Background:
    * url 'http://localhost:8080/api/v1'
    * def structure =
    """
    {
      role: '#string',
      actors: #[] #string,
    }
    """

  Scenario: there are 122 roles that were played by 2 or more actors
    Given path '/characters'
    And param played_by_actors = 2
    When method get
    Then status 200
    And match response == '#[122] structure'

  Scenario: there are 4 roles that were played by 10 or more actors
    Given path '/characters'
    And param played_by_actors = 10
    When method get
    Then status 200
    And match response == '#[4] structure'

  Scenario: there are 0 roles that were played by 100 or more actors
    Given path '/characters'
    And param played_by_actors = 100
    When method get
    Then status 200
    And match response == '#[0]'
