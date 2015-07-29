var Routes = {
  parse_search: function() {
    if (window.location.search.match(/\?id=(.*)/) !== null) {
      return 'dataset';
    } else {
      return 'index';
    }
  },
  parse_dataset_id: function(search) {
    return window.location.search.match(/\?id=(.*)/)[1];
  }
};
