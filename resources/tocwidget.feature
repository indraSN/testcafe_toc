Feature: Sign up widget availability in Palgrave journal page
  As a palgrave user I want to subscribe and receive toc alerts for a journal

  Scenario: Verify sign up widget availability

    Given Open the browser and enter the URL for journal
    When page is loaded successfully
    Then signup widget should be available

  Scenario: Verify toc alert sign up

    Given signup widget is available for journal
    When user enters email address
    And click submit button
    Then success message should be displayed
    And confirmation email should be triggered

  Scenario: Verify toc alert confirmation
    Given user receives confirmation email
    When user clicks on confirm link
    Then confirmation success page should be displayed
    And confirmation message should be as expected
    And user data should be added in database