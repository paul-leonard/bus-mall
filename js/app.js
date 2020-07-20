'use strict';

/* ***** Project Layout *****

Assumptions:
User session

*** Feature List ***
Pick out 3 random images to show.
No repeat images within the three.
Display images side-by-side-by-side.
Once user clicks on an image, list three new.
Track how many times a product was clicked on.
Each user should get 25 clicks per session.
After the maximum click picks, turrn off the event listener.
Display a list of all products in the form "Product1 had x votes and was shown y times."

*** Global Variables ***
arrayOfProductObjects (array of ProductObjects)
picksAllowedPerUserSession
currentUserSessionClicks
productsToShowPerScreen

*** Object Structure ***
Each Product will be its own object.

  Object properties will include:
    productName
    src
    timesShownThisSession
    timesChosenThisSession
    ShownAllTimeCount
    ChosenAllTimeCount

  Object methods will include:
    generateRandomInteger
    chooseImagesToDisplay (use while loops to find 3 random integers that are all unique)
    renderImagesToDisplay
    endSession (removes EventListener and displays results)
    generate listener?  or have this as part of display render?

*** Calculations within Methods ***
math.random() will be used to determine which random products to show.  I will use the link to remember how to accurately receive an integer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

*/