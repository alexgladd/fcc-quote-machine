/*
 * Quote Machine javascript
 *
 * Uses http://quotes.rest/
 */

// list of categories
var quoteCategories = [
  "inspire",
  "management",
  "sports",
  "life",
  "funny",
  "love",
  "art",
  "students"
];

var lastCategory;

// jQuery start
$(document).ready(function() {
  // set current date
  var now = new Date();
  $("#date").html(now.toDateString());

  // link 'new quote' button
  $("#new-btn").on("click", loadNewQuote);

  // load first quote
  loadNewQuote();
});

// trigger load of a new quote
function loadNewQuote() {
  var category = randomQuoteCategory();
  var uri = "http://quotes.rest/qod.json?category=" + category;

  console.log("Loading new quote: " + uri);

  // request quote json
  $.getJSON(uri, function(qod) {
    console.log(qod);
    var result = qod.contents.quotes[0];
    var quote = result.quote;
    var author = result.author;

    updateQuote(quote, author);
  });

  $("#new-btn-icon").removeClass("fa-plus-circle").addClass("fa-circle-o-notch fa-spin");
}

function updateQuote(quote, author) {
  $("#quote").html(quote);
  $("#author").html("~" + author);

  $("#new-btn-icon").removeClass("fa-circle-o-notch fa-spin").addClass("fa-plus-circle");
}

// select a random category
function randomQuoteCategory() {
  var randIdx = Math.floor(Math.random() * quoteCategories.length);

  while (quoteCategories[randIdx] === lastCategory) {
    randIdx = Math.floor(Math.random() * quoteCategories.length);
  }

  lastCategory = quoteCategories[randIdx];

  return quoteCategories[randIdx];
}
