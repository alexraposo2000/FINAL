Feature: As a user
         I want to search for songs, albums, and playlists
         So that I can find and discover new music

Scenario: User can search for specific <type> based on <keyword>
    Given User has a playlist "<pl_name>"
    When I am on the Search page
    Then I should see a search bar
    When I type "<keyword>" into the search bar
    And I select "<type>" from the drop down menu
    And I select the "Search" button
    Then I see the Search page with results of type "<type>" that match keyword "<keyword>"

Examples:
    | type      | keyword | pl_name |
    | song      | Style   | K-Pop   |
    | album     | 1989    | K-Pop   |
    | playlist  | K-Pop   | K-Pop   |