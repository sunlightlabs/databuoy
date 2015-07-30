var Data = {
  spreadsheet_objects: null,
  csv_keyname_overrides: {
    "contactPoint:fn": 'contactPoint',
    "contactPoint:hasEmail": 'contactPoint',
  },
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
  	  if (objects[i].issued !== "Date of formal issuance.") { //We have an explainer row that we need to ignore
  		  object = objects[i];
        object.buoy_id = object.publisher.name + "-" + object.identifier;
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
      if (dataset_array[i].buoy_id === buoy_id) {
        return dataset_array[i];
      }
    }
    return false;
  },
  convertCSVtoJSON: function(csv) {
    parsed_csv = Papa.parse(csv, {header: true});
    dataset = [];
    if (parsed_csv.errors.length === 0) {
      cache_row = {};
      for (i = 0; i < parsed_csv.data.length; i++) { 
        if (parsed_csv.data[i].title === "") { // in this case, we will assume the row is a distribution of the last title-having row
          distribution = this.convertDistribution(key, parsed_csv.data[i], cache_row);
          cache_row.distribution = this.packDistributions(distribution, row_obj);
          dataset[dataset.length - 1] = cache_row;
        } else {
          row_obj = {}; // Build a new row from scratch
          row_distribution_processed = false;
          for (var key in parsed_csv.data[i]) {
            if (parsed_csv.data[i].hasOwnProperty(key)) {
              if (this.isDistributionColumn(key) && !row_distribution_processed) {
                distribution = this.convertDistribution(key, parsed_csv.data[i], cache_row);
                row_obj.distribution = this.packDistributions(distribution, row_obj);
                row_distribution_processed = true;
              } else {
                new_value = this.convertCSVAttrToJSON(key, parsed_csv.data[i], cache_row);
                row_obj[key] = new_value;
              }
            }
          }
          dataset.push(row_obj);
          cache_row = row_obj;
        }
      }
      console.log(dataset);
    } else {
      console.error('error parsing csv...');
    }
  },
  convertCSVAttrToJSON: function(key, current_row_obj, cache_row) {
    csv_conversion_overrides = {
      keyword: this.convertCSVStringToArray,
      references: this.convertCSVStringToArray,
      theme: this.convertCSVStringToArray,
      language: this.convertCSVStringToArray,
      publisher: this.convertPublisher,
      contactPoint: this.convertContactPoint,
    };
    conversion_method = csv_conversion_overrides[key];
    if (conversion_method !== undefined) {
      return conversion_method(key, current_row_obj, cache_row);
    } else {
      return current_row_obj[key];
    }
  },
  convertCSVKeyname: function(key) {
    key_override = this.csv_keyname_overrides[key];
    r = key_override === undefined ? key : key_override;
    return r;
  },
  convertPublisher: function(key, current_row_obj, cache_row) {
    return {
      "@type": "org:Organization",
      "name": current_row_obj.publisher
    };
  },
  convertContactPoint: function(key, current_row_obj, cache_row) {
    return {
      "@type": "vcard:Contact",
      "fn": current_row_obj["contactPoint:fn"],
      "hasEmail": current_row_obj["contactPoint:hasEmail"]
    };
  },
  convertDistribution: function(key, current_row_obj, cache_row) {
    distribution = {};
    for (var k in current_row_obj) {
      if (this.isDistributionColumn(k)) {
        distribution_key = k.replace('distribution:', '');
        distribution[distribution_key] = current_row_obj[k]; 
      }
    }
    return distribution;
  },
  convertCSVStringToArray: function(key, current_row_obj, cache_row) {
    return Utils.parseStringToArray(current_row_obj[key]);
  },
  isDistributionColumn: function(key) {
    return key.match('distribution') !== null;
  },
  packDistributions: function(distribution, current_row_obj) {
    if (current_row_obj.distribution === undefined) {
      return [distribution];
    } else {
      current_row_obj.distribution.push(distribution);
      return current_row_obj.distribution;
    }
  }
};