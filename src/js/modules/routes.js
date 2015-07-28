var Routes = {
  parse_hash: function(url_hash) {
    if (url_hash === "#dataset") {
      return 'dataset';
    } else {
      return 'index';
    }
  },
  parse_dataset_id: function(search) {
    return window.location.search.match(/\?id=(.*)/)[1];
  },
};
