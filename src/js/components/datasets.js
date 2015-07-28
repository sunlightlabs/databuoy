var App = React.createClass({
  getInitialState: function() {
    return ({route: Routes.parse_hash(window.location.hash)});
  },
  render: function() {
    return (
      <DataContainer route={this.state.route} />
    );
  }
});

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
      data = Data.cleanDatasets(data['dataset'])
    	this.setState({data: data});
      $('table').dataTable();
      $('#loading').css({'display':'none'});
      $('#content').css({'display':'block'});
    });
  },
  componentDidMount: function() {
  	this.loadData();
  },
  render: function() {
    if (this.props.route === 'dataset') {
      dataset_id = Routes.parse_dataset_id(window.location.search)
      dataset = Data.getDataset(dataset_id, this.state.data)
      r = <Dataset dataset={dataset} />
    } else {
      r = <DataList datasets={this.state.data} />
    }
    return r;
  }
});

var DataList = React.createClass({
  render: function() {
    var datasets = this.props.datasets.map(function (dataset) {
      return (
        <DatasetRow data={dataset} key={dataset.identifier} />
      );
    });
    return (
      <table className="display">
        <thead>
          <tr>
            <td className="title"><span className="label">title</span></td>
            <td className="description hidden"><span className="label">description</span></td>
            <td className="keyword"><span className="label">keyword</span></td>
            <td className="modified"><span className="label">modified</span></td>
            <td className="publisher"><span className="label">publisher</span></td>
            <td className="identifier"><span className="label">identifier</span></td>
            <td className="accessLevel"><span className="label">accessLevel</span></td>
            <td className="license conditional"><span className="label">license</span></td>
            <td className="rights conditional"><span className="label">rights</span></td>
            <td className="temporal conditional"><span className="label">temporal</span></td>
            <td className="spatial conditional"><span className="label">spatial</span></td>
            <td className="accrualPeriodicity optional"><span className="label">accrualPeriodicity</span></td>
            <td className="conformsTo optional"><span className="label">conformsTo</span></td>
            <td className="describedBy optional"><span className="label">describedBy</span></td>
            <td className="describedByType optional"><span className="label">describedByType</span></td>
            <td className="isPartOf optional"><span className="label">isPartOf</span></td>
            <td className="issued optional"><span className="label">issued</span></td>
            <td className="language optional"><span className="label">language</span></td>
            <td className="landingPage optional"><span className="label">landingPage</span></td>
            <td className="references optional"><span className="label">references</span></td>
            <td className="theme optional"><span className="label">theme</span></td>
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

var DatasetRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td className="title">{this.props.data.title}</td>
        <td className="description hidden">{Utils.parseDescription(this.props.data.description)}</td>
        <td className="keyword">{Utils.parseKeywords(this.props.data.keyword)}</td>
        <td className="modified">{this.props.data.modified}</td>
        <td className="publisher">{this.props.data.publisher}</td>
        <td className="identifier">{this.props.data.identifier}</td>
        <td className="accessLevel">{this.props.data.accessLevel}</td>
        <td className="license conditional">{this.props.data.license}</td>
        <td className="rights conditional">{this.props.data.rights}</td>
        <td className="temporal conditional">{this.props.data.temporal}</td>
        <td className="spatial conditional">{this.props.data.spatial}</td>
        <td className="accrualPeriodicity optional">{this.props.data.accrualPeriodicity}</td>
        <td className="conformsTo optional">{this.props.data.conformsTo}</td>
        <td className="describedBy optional">{this.props.data.describedBy}</td>
        <td className="describedByType optional">{this.props.data.describedByType}</td>
        <td className="isPartOf optional">{this.props.data.isPartOf}</td>
        <td className="issued optional">{this.props.data.issued}</td>
        <td className="language optional">{this.props.data.language}</td>
        <td className="landingPage optional">{this.props.data.landingPage}</td>
        <td className="references optional">{this.props.data.references}</td>
        <td className="theme optional">{this.props.data.theme}</td>
        <td className="contactPoint_fn">{this.props.data.contactPoint.fn}</td>
        <td className="contactPoint_hasEmail">{Utils.parseEmail(this.props.data.contactPoint.hasEmail)}</td>
      </tr>
    );
  }
});

var Dataset = React.createClass({
  render: function() {
    if (this.props.dataset) {
      var distributions = this.props.dataset.distribution.map(function (distribution) {
        return (
          <Distribution className="distribution" attributes={distribution} />
        );
      });
    } else {
      distributions = []
    }
    return (
      <div id="dataset">
        <h2>{this.props.dataset.title}</h2>
        <div>
          <div>
            <span className="label">Identifier:</span> {this.props.dataset.identifier}
          </div>
          <div>
            <span className="label">Publisher:</span> {this.props.dataset.publisher}
          </div>
          <div>
            <span className="label">Modified:</span> {this.props.dataset.modified}
          </div>            
        </div>
        <div>
          <span className="label">Description:</span> {this.props.dataset.description}
        </div>
        {distributions.length > 0 ?
          <div>
            {distributions}
            <div className="clear" />
          </div> : null}
        <ContactPoint contactPoint={this.props.dataset.contactPoint} />
        <div>
          <h3>Access Level:</h3>
          {this.props.dataset.accessLevel}
        </div>
      </div>
    );
  }
});

var Distribution = React.createClass({
  render: function() {
    var attributes = []
    for (var key in this.props.attributes) {
      if (this.props.attributes.hasOwnProperty(key)) {
        attributes.push(
          <div className="distribution_attribute">
            <span className="label">
              {key}: 
            </span>
            <span>
              {this.props.attributes[key]}
            </span>
          </div>
        )
      }
    }
    return (
      <div className="distribution">
        <h5>Distribution</h5>
        {attributes}
        <div className="clear" />
      </div>
    )
  }
})

var ContactPoint = React.createClass({
  render: function() {
    return (
      <div className="contact_point">
        <h3>Contact Point</h3>
        {/* The && is a pretty gross way to not error out when contactPoint hasn't yet been defined */}
        <div>
          <span className="label">Name: </span>{this.props.contactPoint && this.props.contactPoint.fn}
        </div>
        <div>
          <span className="label">Email: </span>{this.props.contactPoint && Utils.parseEmail(this.props.contactPoint.hasEmail)}
        </div>
      </div>
    )
  }
})