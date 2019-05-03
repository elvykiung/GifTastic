// create inital topic array

var topicsArray = ['Cat', 'Dog', 'Baby', 'Chicken'];

// create buttons from array list
function renderButtons() {
  //empty all the buttons before start to prevent duplicate
  $('#buttons').empty();
  //for loops to auto create buttons according to the number of array
  for (var i = 0; i < topicsArray.length; i++) {
    // set the button element
    var newButton = $('<button>');
    // add the text to the buttons
    newButton.text(topicsArray[i]);
    // add class to the button and color of green
    newButton.addClass('btn btn-success');
    // add attribute data for later use
    newButton.attr('data-topic', topicsArray[i]);
    // appedn the button to html
    $('#buttons').append(newButton);
  }

  // on click function get the still gifs

  $('.btn').on('click', function() {
    // set Api request

    var apiKey = 'O7LsU4jmuzvBBrDHUruHzED8Bsspqotn';
    //the search request equal to the user click data topic value
    var searchQ = $(this).attr('data-topic');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + searchQ + '&limit=10&rating=g&lang=en';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      // empty the gif element to prevent duplicate by multiple click
      $('#gifTags').empty();
      for (var i = 0; i < 10; i++) {
        var imageUrl = response.data[i].images.fixed_height_still.url;
        var p = $('<p>').text('Rating: ' + response.data[i].rating);
        var newImgTag = $('<img>');
        newImgTag.attr('src', imageUrl);
        newImgTag.addClass('gifImages');
        newImgTag.attr('alt', 'gifs image');
        newImgTag.attr('data-num', [i]);
        newImgTag.attr('data-state', 'still');
        $('#gifTags').append(p);
        $('#gifTags').append(newImgTag);
      }
      //animate the gif images
      $('.gifImages').on('click', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
          $(this).attr('src', response.data[$(this).attr('data-num')].images.fixed_height.url);
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', response.data[$(this).attr('data-num')].images.fixed_height_still.url);
          $(this).attr('data-state', 'still');
        }
      });
    });
  });
}

// function create new button from search
$('#add-search').on('click', function(event) {
  event.preventDefault();
  var search = $('#search-input')
    .val()
    .trim();

  topicsArray.push(search);

  renderButtons();
});

renderButtons();
