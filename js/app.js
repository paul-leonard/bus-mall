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
ProductObject.arrayOfProductObjects (array of ProductObjects)
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
  - Missed 0.5 point last time, understand why and fix.  <- Needed to change arrayOfProductObjects from a global variable to a property of ProductObject constructor.
  - extra: Also consider pie charts of times shown
  - extra: what is the radar chart?
  - extra: calculate chosen/shown rate.
  - extra: sort results?
  - extra: display top three
  - extra: display top three with stats
*/

// ************ Global Variables ***************
ProductObject.arrayOfProductObjects = [];
var picksAllowedPerUserSession = 25; // will be 25
var currentUserSessionClicks = 0;
var productsToShowPerScreen = 3; // will be 3
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

  ProductObject.arrayOfProductObjects.push(this);
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
    do {
      randomPicks[i] = Math.floor(Math.random() * ((ProductObject.arrayOfProductObjects.length-1) - 0 + 1)) + 0;
      var redundantFlag = 0;

      //below for loop checks current pick againist current randomPicks that are at indices less than the current number
      for (var m = 0; m < i; m++) {
        if (randomPicks[i] === randomPicks[m]) {
          redundantFlag = 1;
          // console.log('Found a REDUNDANT on SAME screen!');
          break;
        }
      }

      //below for loop checks current pick againist all of the products on the last page
      for (var n = 0; n < previousItemChoices.length; n++) {
        if (randomPicks[i] === previousItemChoices[n]) {
          redundantFlag = 1;
          // console.log('Found a REPEAT from previous screen!');
          break;
        }
      }
    } while (redundantFlag === 1);
  }
}


function displayItems() {
  var instructionsToUser = document.getElementById('userInstructions');
  instructionsToUser.textContent = 'Please click on the product that is most interesting to you:';

  //clear previous choices
  var productGalleryTargetUl = document.getElementById('productGallery');
  productGalleryTargetUl.innerHTML = '';

  //call function to determine which random products
  pickItemChoices();

  //rely on methods to produce HTML to get each product on the page
  for (var i = 0; i < productsToShowPerScreen; i++) {
    ProductObject.arrayOfProductObjects[randomPicks[i]].displayProduct();
    previousItemChoices[i] = randomPicks[i];
  }
}


function reactToClick(event) {
  //if an image was clicked on, increase the total click count
  if (event.target.tagName === 'IMG') {
    currentUserSessionClicks++;

    //figure out which product was clicked on and give it credit
    for (var j= 0; j < ProductObject.arrayOfProductObjects.length; j++) {
      if (ProductObject.arrayOfProductObjects[j].src === event.target.getAttribute('src')) {
        ProductObject.arrayOfProductObjects[j].timesChosenThisSession++;
      }
    }

    if(currentUserSessionClicks >= picksAllowedPerUserSession) {

      var instructionsToUser = document.getElementById('userInstructions');
      instructionsToUser.textContent = 'Results:';

      //remove product images
      var productGalleryTargetUl = document.getElementById('productGallery');
      productGalleryTargetUl.innerHTML = '';

      //remove listener
      productGalleryTargetUl.removeEventListener('click', reactToClick);

      //display list
      var targetEl = document.getElementById('surveyResults');
      for (var k = 0; k < ProductObject.arrayOfProductObjects.length; k++) {
        var eachLiEl = document.createElement('li');
        eachLiEl.textContent = ProductObject.arrayOfProductObjects[k].productName + ' had ' + ProductObject.arrayOfProductObjects[k].timesChosenThisSession + ' votes and was shown ' + ProductObject.arrayOfProductObjects[k].timesShownThisSession + ' times.';
        targetEl.appendChild(eachLiEl);
      }

      renderGraphs();

    } else {
      //display new set of products
      displayItems();
    }
  } else {
    alert('Please click on an image.');
  }
}


function renderGraphs() {

  var productNameForGraph = [];
  var voteDataForGraph = [];
  var shownDataForGraph = [];

  for (var i = 0; i < ProductObject.arrayOfProductObjects.length; i++) {
    productNameForGraph.push(ProductObject.arrayOfProductObjects[i].productName);
    voteDataForGraph.push(ProductObject.arrayOfProductObjects[i].timesChosenThisSession);
    shownDataForGraph.push(ProductObject.arrayOfProductObjects[i].timesShownThisSession);
  }

  var ctx1 = document.getElementById('votesBarGraph').getContext('2d');

  var votesBarGraph = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: productNameForGraph,
      datasets: [{
        label: '# of Votes',
        data: voteDataForGraph,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


  var ctx2 = document.getElementById('shownBarGraph').getContext('2d');

  var votesBarGraph = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: productNameForGraph,
      datasets: [{
        label: '# of Times Shown',
        data: shownDataForGraph,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


  var ctx3 = document.getElementById('integratedGraph').getContext('2d');

  var votesBarGraph = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: productNameForGraph,
      datasets: [{
        label: '# of Times Shown',
        data: shownDataForGraph,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Votes',
        data: voteDataForGraph,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          stacked: false,
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          stacked: true
        }]
      }
    }
  });

} //end of renderGraphs function


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
