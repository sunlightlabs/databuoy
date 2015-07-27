var Config = {
  test_mode: true,
  sheet_url: 'data.csv',
  portal_name: 'Data Portal',
  init: function(callback) {
    self = this;
    // Set sheet URL
    this.googleSheetURL().done(function( data ) {
      if (data !== "") {
        self.setSheetURL(data);
      }
      //callback(Config);
    });
    // Set portal title
    this.portalName().done(function( data ) {
      self.setPortalName(data);
      Utils.setPageTitle(self.getPortalName());
    });
  },
  googleSheetURL: function() {
    return $.ajax({
             url: "google_sheet_url"
           });
  },
  portalName: function() {
    return $.ajax({
             url: "portal_name"
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
  },
  getTestMode: function() {
    return this.test_mode;
  },
  getPortalName: function() {
    return this.portal_name;
  },
  setPortalName: function(portal_name) {
    this.portal_name = portal_name;
    return this.portal_name;
  },
};
