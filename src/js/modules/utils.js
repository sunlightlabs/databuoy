var Utils = {
  parseKeywords: function(keyword_array) {
    return keyword_array.join(", ");
  },
  parseEmail: function(email_string) {
    return email_string.replace("mailto:", "");
  },
  parseDescription: function(description) {
    return description.slice(0,137) + '...';
  },
  setPageTitle: function(page_title) {
    $('title').text(page_title);
    $('h1').text(page_title);
  }
};
