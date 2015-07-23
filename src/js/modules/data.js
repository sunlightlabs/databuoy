var Data = {
  spreadsheet_objects: null,
  downloadSpreadsheet: function(sheet_config) {
    if (sheet_config.isGoogleSheet()) {
    	return Tabletop.init({
    			 key: sheet_config.getSheetURL(),
                 callback: (function(data, tabletop) { Data.setDatasets(data); }),
                 simpleSheet: true });
    } else {
    	console.log('This has not been implemented yet');
    }
  },
  setDatasets: function(objects) {
  	this.datasets = this.cleanDatasets(objects);
  	return this.datasets;
  },
  cleanDatasets: function(objects) {
  	clean_datasets = [];
	for (i = 0; i < objects.length; i++) { 
	  if (objects[i]['issued**'] !== "Date of formal issuance.") { //We have an explainer row that we need to ignore
		clean_datasets.push(objects[i]);
	  }
	}
	return clean_datasets;
  },
  getDatasets: function(objects) {
  	return this.datasets;
  }
};