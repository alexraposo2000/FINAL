Feature: As a user
         I want to make changes to a playlist
         So that I can refine the songs I listen to

Scenario: User can create and remove playlists
    When I am on the Library page
    Then I should see an add playlist button
    And I should see a remove playlist button
    When I click the add playlist button
    Then I should see a text box asking me to name the new playlist with an OK button
    When I type the playlist name "<pl_name>"
    And I click OK
    Then I should see a playlist named "<pl_name>" in my library
    When I select the playlist named "<pl_name>"
    And I click the remove playlist button
    Then I should no longer see the playlist named "<pl_name>" in my library

Examples:
    | pl_name |
    | Bops    |
    | Jams    |

Scenario: Users can add and remove songs from a playlist
    Given User has an empty playlist named "<pl_name>"
    When I am on my Search page
    And I have completed a search for a song named "<song_name>"
    Then I should see the song named "<song_name>" in the results
    And I should see a dropdown menu for playlist and an 'add' button
    When I select "<pl_name>" from my list of playlists
    And I click the 'add' button
    Then I should see a popup saying the add was successful
    When I click OK
    And I navigate to the Library page
    And I click on playlist named "<pl_name>"
    Then I should see "<song_name>" in "<pl_name>"
    And I should see a remove song button
    When I click the remove song button
    Then I should no longer see "<song_name>" in "<pl_name>"

Examples:
    | pl_name | song_name |
    | Bops    | Style     |
    | Jams    | Dynamite  |