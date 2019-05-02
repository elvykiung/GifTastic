// 1. create buttons

var topicsArray = ['Cat', 'Dog', 'Baby', 'Chicken'];

function renderButtons() {
  $('#buttons').empty();
  for (var i = 0; i < topicsArray.length; i++) {
    var newButton = $('<button>');
    newButton.text(topicsArray[i]);
    newButton.addClass('btn btn-success');
    newButton.attr('data-topic', topicsArray[i]);
    $('#buttons').append(newButton);
  }

  // 2. on click function get the still gifs

  $('.btn').on('click', function() {
    // 3. set Api request

    var apiKey = 'O7LsU4jmuzvBBrDHUruHzED8Bsspqotn';
    var searchQ = $(this).attr('data-topic');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + searchQ + '&limit=10&rating=g&lang=en';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      // console.log(response);
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
