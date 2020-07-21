'use strict';

/* ***** Project Layout *****

Assumptions:
User session

*** Lab11 Feature List ***
- Pick out 3 random images to show.
- No repeat images within the three.
- Display images side-by-side-by-side.
- Once user clicks on an image, list three new.
- Track how many times a product was clicked on.
- Each user should get 25 clicks per session.
- After the maximum clicks/picks, turn off the event listener.
- Display a list of all products in the form "Product1 had x votes and was shown y times."

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


*** Lab12 Feature List ***
  - Each of the three products shown should not be repeated
  - No product should be repeated from the previous screen
  - Create a property that tracks how many times each product has been shown/increment the property each time product is shown
  - Import ChartJS from CDN using a src link
  - Use `<canvas>` tags to integrate chart in HTML
  - display two bar charts:  one with times shown and one with times chosen
  - locate bar charts below where the images were (maybe need to keep up the three photos?)
  - charts should only appear after all voting is complete.
  - Add an extra type of chart (suggest line chart on top of bar chart; bar=votes, line=shown)
  - Missed 0.5 point last time, understand why and fix.
  - extra: Also consider pie charts of times shown
  - extra: what is the radar chart?
  - extra: calculate chosen/shown rate.
  - extra: sort results?
  - extra: display top three
  - extra: display top three with stats
*/

// ************ Global Variables ***************
var arrayOfProductObjects = [];
var picksAllowedPerUserSession = 5; //per Lab11 will be 25
var currentUserSessionClicks = 0;
var productsToShowPerScreen = 3; //per Lab11 will be 3
var randomPicks = [];
var previousItemChoices = [];


// *************** Function Definitions ***************

function ProductObject (productName, src) {
  this.productName = productName;
  this.src = src;
  this.timesShownThisSession = 0;
  this.timesChosenThisSession = 0;
  this.ShownAllTimeCount = 0;
  this.ChosenAllTimeCount = 0;

  arrayOfProductObjects.push(this);
}


ProductObject.prototype.displayProduct = function() {
  var productGalleryTargetUl = document.getElementById('productGallery');
  var productDisplayLi = document.createElement('li');

  var productImg = document.createElement('img');
  productImg.src = this.src;
  productImg.alt = this.productName;
  productDisplayLi.appendChild(productImg);

  var productLabelP = document.createElement('p');
  productLabelP.textContent = this.productName;
  productDisplayLi.appendChild(productLabelP);

  productGalleryTargetUl.appendChild(productDisplayLi);

  this.timesShownThisSession++;
};


function pickItemChoices() {
  for (var i = 0; i < productsToShowPerScreen; i++) {
    // while () come back and make a function to prevent double occurances
    do {
      randomPicks[i] = Math.floor(Math.random() * ((arrayOfProductObjects.length-1) - 0 + 1)) + 0;

      //below for loop checks current pick againist current randomPicks that are at indices less than the current number
      var redundantFlag = 0;
      for (var m = 0; m < i; m++) {
        if (randomPicks[i] === randomPicks[m]) {
          redundantFlag = 1;
          console.log('Found a REDUNDANT on same screen!');
          break;
        } else {

          console.log('previousItemChoices',previousItemChoices);
          console.log('previousItemChoices.length',previousItemChoices.length);
          if (previousItemChoices.length > 2) {
            for (var n = 0; n < previousItemChoices.length; n++) {
              if (randomPicks[i] === previousItemChoices[n]) {
                redundantFlag = 1;
                console.log('Found a REPEAT from previous screen!');
                console.log('Repeat between screens check pass #', n);
                break;
              }
            }
          } else {
            previousItemChoices.push(randomPicks[i]);
          }
        }
      }
    } while (redundantFlag === 1);
    // Thanka to Chance for his help trying to figure out this infinite loop and assigning values to the array and explaining execution order for JS
    //a couple issues with the logic right now, but hopefully fixable
    // on inital load, the previous array is going to get filled with randomPicks from first showing
    //will need to reset to empty so that it can get filled again.
    // rearrange the structure
    //array setting to empty looks like 'array = [];'  decide on best place to say that
    // after the big giant for loop, but before the function closes... try the clearing the array in a couple places
  }

  console.log('previousItemChoices',previousItemChoices);
  //previousItemChoices = randomPicks;  <-- This is a bad way to set an array value according to https://www.dyn-web.com/javascript/arrays/value-vs-reference.php
  // for (var w = 0; w < randomPicks.length; w++) {
  //   previousItemChoices[w] = randomPicks[w];
  // }
  //pass by reference; set a complete array equal to another array; 
  console.log('previousItemChoices',previousItemChoices);
  console.log('randomPicks',randomPicks);
}


function displayItems() {
  //clear previous choices
  var productGalleryTargetUl = document.getElementById('productGallery');
  productGalleryTargetUl.innerHTML = '';

  //call function to determine which random products
  pickItemChoices();

  // previousItemChoices = randomPicks; // <-- This is a bad way to set an array value

  //rely on methods to produce HTML to get each product on the page
  for (var i = 0; i < productsToShowPerScreen; i++) {
    arrayOfProductObjects[randomPicks[i]].displayProduct();
  }
}


function reactToClick(event) {
  // console.log('react to event start');
  // console.log(event.target);
  // console.log(event);

  //if an image was clicked on, increase the total click count
  // console.log(event.target.tagName);
  if (event.target.tagName === 'IMG') {
    currentUserSessionClicks++;

    //figure out which product was clicked on and give it credit
    for (var j= 0; j < arrayOfProductObjects.length; j++) {
      if (arrayOfProductObjects[j].src === event.target.getAttribute('src')) {
        // console.log('They match at ' + j + ' which is ' + arrayOfProductObjects[j].productName);
        arrayOfProductObjects[j].timesChosenThisSession++;
      }
    }

    if(currentUserSessionClicks >= picksAllowedPerUserSession) {

      //remove goat images
      var productGalleryTargetUl = document.getElementById('productGallery');
      productGalleryTargetUl.innerHTML = '';

      //remove listener
      productGalleryTargetUl.removeEventListener('click', reactToClick);

      //display list
      var targetEl = document.getElementById('surveyResults');

      for (var k = 0; k < arrayOfProductObjects.length; k++) {
        var eachLiEl = document.createElement('li');
        eachLiEl.textContent = arrayOfProductObjects[k].productName + ' had ' + arrayOfProductObjects[k].timesChosenThisSession + ' votes and was shown ' + arrayOfProductObjects[k].timesShownThisSession + ' times.';
        targetEl.appendChild(eachLiEl);
      }
    } else {
      //display new set of products
      displayItems();
    }
  } else {
    alert('Please click on an image.');
  }
}


// *************** Function Calls ***************

var productGalleryTargetUl = document.getElementById('productGallery');
productGalleryTargetUl.addEventListener('click', reactToClick);

new ProductObject('R2D2 Rolling Suitcase','img/bag.jpg');
new ProductObject('Banana Slicer','img/banana.jpg');
new ProductObject('Tablet and TP Tower','img/bathroom.jpg');
new ProductObject('Breathable Boots with no Fur','img/boots.jpg');
new ProductObject('Toast, Egg, and Coffee Maker','img/breakfast.jpg');
new ProductObject('Meatball Bubble Gum','img/bubblegum.jpg');
new ProductObject('Inverted Chair','img/chair.jpg');
new ProductObject('Cthulhu','img/cthulhu.jpg');
new ProductObject('Beak for Dog','img/dog-duck.jpg');
new ProductObject('Canned Dragon Meat','img/dragon.jpg');
new ProductObject('Utensil Converter Pack for Pens','img/pen.jpg');
new ProductObject('Sweeping Pet Booties','img/pet-sweep.jpg');
new ProductObject('Pizza Scissors','img/scissors.jpg');
new ProductObject('Shark Sleeping Bag','img/shark.jpg');
new ProductObject('Tauntaun Sleeping Bag','img/tauntaun.jpg');
new ProductObject('Canned Unicorn Meat','img/unicorn.jpg');
new ProductObject('Ever-Fill Watering Can','img/water-can.jpg');
new ProductObject('Never-Emptying Wine Glass','img/wine-glass.jpg');
new ProductObject('Sweeping Baby Onesie','img/sweep.png');
new ProductObject('Moving Octopus USB Drive','img/usb.gif');

displayItems();

// console.log(randomPicks);
