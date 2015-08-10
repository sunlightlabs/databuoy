$('#header').click(function() {
  window.location = window.location.pathname;
});
$('#export').click(function() {
  Data.downloadSpreadsheet().then(function(data) {
    new_elem = $('<code>' + Data.exportDatasetAsJSON(data) + '</code>');
    $('body').html('');
    $('body').append(new_elem);
  });
});
