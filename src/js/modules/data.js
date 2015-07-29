var Data = {
  spreadsheet_objects: null,
  downloadSpreadsheet: function(sheet_config) {
    if (sheet_config.getTestMode() === true) {
      return $.ajax({
         url: "sample-data.json"
      });
    }
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
  		  object = objects[i];
        object['buoy_id'] = object['publisher']['name'] + "-" + object['identifier'];
        clean_datasets.push(object);
  	  }
  	}
  	return clean_datasets;
  },
  getDatasets: function(objects) {
  	return this.datasets;
  },
  makeDatasetLink: function(object) {
    return "/?id=" + object.publisher.name + "-" + object.identifier;
  },
  getDataset: function(buoy_id, dataset_array) {
    for (i = 0; i < dataset_array.length; i++) { 
      if (dataset_array[i]['buoy_id'] === buoy_id) {
        return dataset_array[i];
      }
    }
    return false;
  }
};