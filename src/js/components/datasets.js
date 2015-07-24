var DataContainer = React.createClass({
  getInitialState: function() {
  	return ({data: []});
  },
  loadData: function() {
  	// load sample data for now
  	$.ajax({
      context: this,
      url: "sample-data.json"
    }).done(function(data) {
    	this.setState({data: data['dataset']});
    });
  },
  componentDidMount: function() {
  	this.loadData();
  },
  render: function() {
    return (
    	<DataList datasets={this.state.data} />
    );
  }
});

var DataList = React.createClass({
  render: function() {
    var datasets = this.props.datasets.map(function (dataset) {
      return (
        <Dataset data={dataset} key={dataset.identifier} />
      );
    });
    return (
      <table className="data_list">
        <tbody>
          {datasets}
        </tbody>
      </table>
    );
  }
});

var Dataset = React.createClass({
  render: function() {
    return (
      <tr>
        <td className="title"><span className="label">title: </span>{this.props.data.title}</td>
        <td className="description"><span className="label">description: </span>{this.props.data.description}</td>
        <td className="keyword"><span className="label">keyword: </span>{this.props.data.keyword}</td>
        <td className="modified"><span className="label">modified: </span>{this.props.data.modified}</td>
        <td className="publisher"><span className="label">publisher: </span>{this.props.data.publisher}</td>
        <td className="identifier"><span className="label">identifier: </span>{this.props.data.identifier}</td>
        <td className="accessLevel"><span className="label">accessLevel: </span>{this.props.data.accessLevel}</td>
        <td className="license"><span className="label">license: </span>{this.props.data.license}</td>
        <td className="rights"><span className="label">rights: </span>{this.props.data.rights}</td>
        <td className="temporal"><span className="label">temporal: </span>{this.props.data.temporal}</td>
        <td className="spatial"><span className="label">spatial: </span>{this.props.data.spatial}</td>
        <td className="accrualPeriodicity"><span className="label">accrualPeriodicity: </span>{this.props.data.accrualPeriodicity}</td>
        <td className="conformsTo"><span className="label">conformsTo: </span>{this.props.data.conformsTo}</td>
        <td className="describedBy"><span className="label">describedBy: </span>{this.props.data.describedBy}</td>
        <td className="describedByType"><span className="label">describedByType: </span>{this.props.data.describedByType}</td>
        <td className="isPartOf"><span className="label">isPartOf: </span>{this.props.data.isPartOf}</td>
        <td className="issued"><span className="label">issued: </span>{this.props.data.issued}</td>
        <td className="language"><span className="label">language: </span>{this.props.data.language}</td>
        <td className="landingPage"><span className="label">landingPage: </span>{this.props.data.landingPage}</td>
        <td className="references"><span className="label">references: </span>{this.props.data.references}</td>
        <td className="theme"><span className="label">theme: </span>{this.props.data.theme}</td>
      </tr>
    );
  }
});