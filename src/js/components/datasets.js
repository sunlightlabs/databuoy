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
        <thead>
          <tr>
            <td className="title"><span className="label">title</span></td>
            <td className="description"><span className="label">description</span></td>
            <td className="keyword"><span className="label">keyword</span></td>
            <td className="modified"><span className="label">modified</span></td>
            <td className="publisher"><span className="label">publisher</span></td>
            <td className="identifier"><span className="label">identifier</span></td>
            <td className="accessLevel"><span className="label">accessLevel</span></td>
            <td className="license"><span className="label">license</span></td>
            <td className="rights"><span className="label">rights</span></td>
            <td className="temporal"><span className="label">temporal</span></td>
            <td className="spatial"><span className="label">spatial</span></td>
            <td className="accrualPeriodicity"><span className="label">accrualPeriodicity</span></td>
            <td className="conformsTo"><span className="label">conformsTo</span></td>
            <td className="describedBy"><span className="label">describedBy</span></td>
            <td className="describedByType"><span className="label">describedByType</span></td>
            <td className="isPartOf"><span className="label">isPartOf</span></td>
            <td className="issued"><span className="label">issued</span></td>
            <td className="language"><span className="label">language</span></td>
            <td className="landingPage"><span className="label">landingPage</span></td>
            <td className="references"><span className="label">references</span></td>
            <td className="theme"><span className="label">theme</span></td>
            <td className="contactPoint_fn">contactPoint: full name</td>
            <td className="contactPoint_hasEmail">contactPoint: hasEmail</td>
          </tr>
        </thead>
        <tbody className="pure-table">
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
        <td className="title">{this.props.data.title}</td>
        <td className="description">{this.props.data.description}</td>
        <td className="keyword">{Utils.parseKeywords(this.props.data.keyword)}</td>
        <td className="modified">{this.props.data.modified}</td>
        <td className="publisher">{this.props.data.publisher}</td>
        <td className="identifier">{this.props.data.identifier}</td>
        <td className="accessLevel">{this.props.data.accessLevel}</td>
        <td className="license">{this.props.data.license}</td>
        <td className="rights">{this.props.data.rights}</td>
        <td className="temporal">{this.props.data.temporal}</td>
        <td className="spatial">{this.props.data.spatial}</td>
        <td className="accrualPeriodicity">{this.props.data.accrualPeriodicity}</td>
        <td className="conformsTo">{this.props.data.conformsTo}</td>
        <td className="describedBy">{this.props.data.describedBy}</td>
        <td className="describedByType">{this.props.data.describedByType}</td>
        <td className="isPartOf">{this.props.data.isPartOf}</td>
        <td className="issued">{this.props.data.issued}</td>
        <td className="language">{this.props.data.language}</td>
        <td className="landingPage">{this.props.data.landingPage}</td>
        <td className="references">{this.props.data.references}</td>
        <td className="theme">{this.props.data.theme}</td>
        <td className="contactPoint_fn">{this.props.data.contactPoint}</td>
        <td className="contactPoint_hasEmail">{this.props.data.contactPoint}</td>
      </tr>
    );
  }
});