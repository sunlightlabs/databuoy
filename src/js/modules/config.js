var Config = {
  sheet_url: 'data.csv',
  init: function(callback) {
    self = this;
    sheet_call = this.googleSheetURL().done(function( data ) {
      if (data !== "") {
        self.setSheetURL(data);
      }
      callback(Config);
    });
  },
  googleSheetURL: function() {
    return $.ajax({
             url: "google_sheet_url"
           });
  },
  isGoogleSheet: function() {
    return this.getSheetURL().match('.csv') === null;
  },
  setSheetURL: function(url) {
    this.sheet_url = url;
    return this.sheet_url;
  },
  getSheetURL: function() {
    return this.sheet_url;
  }
};
