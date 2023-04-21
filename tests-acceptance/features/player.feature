Feature: As a user
         I want to play or pause songs
         So that I can choose the music I want to listen to

Scenario: User can play or pause a song
    When I am on the search page
    And I have completed a search for a "<search_type>" matching "<keyword>"
    Then I should see rows of songs
    When I click play for a song called "<song_name>"
    Then I should see the Player page
    And "<song_name>" by "<artist_name>" starts playing
    Then I should see a play or pause button
    When I click the play or pause button
    Then the song should start or stop playing and I should see the opposite button

Examples:
    | search_type | keyword   | song_name    | artist_name  |
    | song        | Style     | Style        | Taylor Swift |
    | song        | Dynamite  | Dynamite     | BTS          |
    | album       | 1989      | Shake It Off | Taylor Swift |