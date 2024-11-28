Feature: User can create a box and run it
    Scenario: User can create a box and run it succesfully
        Given user logs in the secret santa website
        When user creates a box
        Then the box should be visible on the dashboard

    Scenario: Generating an invite link
        Given the user is logged in as 'userAutor'
        Given the user generates an invite link

    Scenario: Participant joins the box and fills out his card
        Given the participant logs in
        And fills in his wishes
        Then the participant's dashboard should confirm successful entry

    Scenario: Adding new participants
        Given the user is logged in as 'userAutor'
        When the user adds new participants
        Then the system should confirm successful participant addition

    Scenario: Conducting the draw
        Given the user is logged in as 'userAutor'
        And the box has all required participants
        When the user starts the draw process
        Then the draw should complete successfully with confirmation


    Scenario: Deleting the created box
        Given the user is logged in as 'userAutor'
        And the box ID is known
        When the user deletes the box
        Then the box should no longer be visible on the dashboard
