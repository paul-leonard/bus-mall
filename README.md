# bus-mall
This is an interactive marketing research survey web app developed for a fictional BusMall company as part of Code201 Lab11+ at Code Fellows.



## Code Fellows: Code_201: Lab11+

### About Paul Leonard

#### Summary of Website
This is a website for a fictional company called BusMall.  The premise is to create a web app that BusMall can use in marketing research to determine which products should be included and/or featured in their magizine.  The app shows three random products to the survey user.  The user then clicks on their favorite of the three products.  The app tracks how many times each item is clicked on and the total amount of times a given product was shown.  From this, the interest in the product will be deduced and data displayed.  The underlying intent of this website is to practice creating a website that requires HTML, CSS, and JS.

#### Author
Paul Leonard

#### Links and Resources
Below are some helpful links and resources used in producing this website.
- [Code 201 class repo](https://github.com/codefellows/seattle-201d65)
- My Code 201 class notes
- [Setting Up Code 201 Projects](https://codefellows.github.io/code-201-guide/curriculum/class-02/project_setup)
- [Discussion of centering UL and LIs on the page](https://stackoverflow.com/questions/1708054/how-can-i-center-ul-li-into-div)

#### Collaborations
- Thanks to Chance for sitting down with me and trying to help me figure out my infinite loop troubles
- Thanks to Riva for her advice on how she was handling passing between currentScreenPicks and previousScreenPicks
- Thanks to Allistar for idea to contain canvas within an element
- Thanks to Mike for help getting chart.js canvas elements to reduce in size
- Thanks to Riva for helping find a missing comma to make stacked bar charts
- Thanks to Nicholas for saving me from my repeating first image during code review!

#### Use of Tools
- .eslintrc.json is used as published on the [class GitHub repo](https://github.com/codefellows/seattle-201d65).
- [Eric Meyer's reset.css file](https://meyerweb.com/eric/tools/css/reset/)
- The JavaScript 'use strict' command was used to ensure proper programming syntax was followed. 

#### Known bugs
None known.

#### License
Published with the MIT License on GitHub.

---
## About Me (within a README for a website about me)
Thank you for visiting my page of notes.  I hope they were helpful to you.  Please also check out [my GitHub portfolio page](https://github.com/paul-leonard "Paul's GitHub Portfolio").

After graduating with a mechanical engineering degree from *Missouri University of Science and Technology* 13 years ago, I moved out to Seattle and started work at Boeing.  While there, I worked in airplane modifications, flight test, and flight controls design engineering.  I am super excited to return to a rich learning environment and gain some new programming skills.  I plan to complete the full course path ending with a specialty in Python.  I enjoy spending time outside by camping and hiking or having a beer at a brewery with friends (when that is a thing again).


---
## Lab Instructions

1. As a user, I would like to display three unique products by chance so that the viewers can pick a favorite.

    - Create a constructor function that creates an object associated with each product, and has the following properties:
        1. Name of the product
        1. File path of image

    - Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

    - Attach an event listener to the section of the HTML page where the images are going to be displayed.

    - Once the users 'clicks' a product, generate three new products for the user to pick from.

1. As a user, I would like to track the selections made by viewers so that I can determine which products to keep for the catalog.
    - In the constructor function define a property to hold the number of times a product has been clicked.

    - After every selection by the viewer, update the newly added property to reflect if it was clicked.

1. As a user, I would like to control the number of rounds a user is presented with so that I can control the voting session duration.
    - By default, the user should be presented with 25 rounds of voting before ending the session.
    - Keep the number of rounds in a variable to allow the number to be easily changed for debugging and testing purposes.

1. As a user, I would like to view a report of results after all rounds of voting have concluded so that I can evaluate which products were the most popular.
    - Create a property attached to the constructor function itself that keeps track of all the products that are currently being considered.

    - After voting rounds have been completed, remove the event listeners on the product.

    - Display the list of all the products followed by the votes received and number of times seen for each. Example: `Banana Slicer had 3 votes and was shown 5 times`

### Stretch Goals

- Handle the display and voting for an arbitrary number of images
- Using a variable, declare in your JS how many images to show.
- Based on that value, dynamically create that many ```<img>``` tags
- Also based on that value, ensure that your randomizer is properly handling the specified number of images for display and repeat tracking.