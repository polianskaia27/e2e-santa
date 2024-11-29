Feature: User can create a box and run it
    Scenario: User can create a box and run it succesfully
        Given user logs in the secret santa website as "polalextest@gmail.com" and "test123"
        When user creates a box with the following details:
            | maxAmount | currency |
            | 50        | Евро     |
        Then the box should be visible on the dashboard

    Scenario: Generating an invite link
        Given the user generates an invite link

    Scenario: Participant joins the box and fills out his card
        Given the participant logs as "polalextest+1@gmail.com" and "test123"
        And fills in his wishes
        Then the participant's dashboard should confirm successful entry

    Scenario: Adding new participants
        Given the user is logged in as "polalextest@gmail.com" and "test123"
        When the user adds new participants with the following details:
            | login | email                   |
            | Alex2 | polalextest+2@email.com |
            | Alex3 | polalextest+3@email.com |
            | Alex4 | polalextest+4@email.com |
        Then the system should confirm successful participant addition

    Scenario: Conducting the draw
        Given the user is logged in as "polalextest@gmail.com" and "test123"
        And the box has all required participants
        When the user starts the draw process
        Then the draw should complete successfully with confirmation


    Scenario: Deleting the created box
        When the user deletes the box
