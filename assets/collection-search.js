$(document).ready(function() {
  $('#collection-search-input').on('input', function() {
    var query = $(this).val();

    if (query.length > 2) { // Only search when the input has more than 2 characters
      $.ajax({
        url: '/search',
        type: 'GET',
        data: {
          q: query,
          type: 'collection'
        },
        success: function(data) {
          var results = $(data).find('.search-results .search-result');
          var suggestions = '';

          results.each(function() {
            var title = $(this).find('.search-result__title').text();
            var url = $(this).find('.search-result__link').attr('href');
            suggestions += '<div class="suggestion"><a href="' + url + '">' + title + '</a></div>';
          });

          $('#collection-search-results').html(suggestions).show();
        }
      });
    } else {
      $('#collection-search-results').hide();
    }
  });

  $(document).on('click', function(event) {
    if (!$(event.target).closest('#collection-search').length) {
      $('#collection-search-results').hide();
    }
  });
});
