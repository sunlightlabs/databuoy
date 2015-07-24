spreadsheet_data = Config.init(Data.downloadSpreadsheet);
var Element = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Element.
      </div>
    );
  }
});
React.render(
  <Element />,
  document.getElementById('content')
);
