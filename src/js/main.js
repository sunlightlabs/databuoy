Config.init();
//React.render(
//  <App />, document.getElementById('content')
//)
    $.ajax({
      context: this,
      url: "sample-data.csv"
    }).done(function(data) {
      $("#content").text(data);
      $('#loading').css({'display':'none'});
      $('#content').css({'display':'block'});
      Data.convertCSVtoJSON(data);
    });