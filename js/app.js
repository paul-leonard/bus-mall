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

// ************ Global Variables ***************
var arrayOfProductObjects = [];
var picksAllowedPerUserSession = 2; //per Lab11 will be 25
var currentUserSessionClicks = 0;
var productsToShowPerScreen = 3; //per Lab11 will be 3
var randomPicks = [];

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
};



function pickItemChoices() {
  for (var i = 0; i < productsToShowPerScreen; i++) {
    // while () come back and make a function to prevent double occurances
    randomPicks[i] = Math.floor(Math.random() * ((arrayOfProductObjects.length-1) - 0 + 1)) + 0;
  }
}


function displayItems() {
  //clear previous choices
  var productGalleryTargetUl = document.getElementById('productGallery');
  productGalleryTargetUl.innerHTML = '';

  //call function to determine which random products
  pickItemChoices();

  //rely on methods to produce HTML to get each product on the page
  for (var i = 0; i < productsToShowPerScreen; i++) {
    arrayOfProductObjects[randomPicks[i]].displayProduct();
  }
}



// use while loops to find 3 random integers that are all unique)
    // renderImagesToDisplay
    // endSession (removes EventListener and displays results)
    // generate listener?  or have this as part of display render?


// *************** Function Calls ***************

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

//while loop to go around the below

displayItems();

console.log(randomPicks);