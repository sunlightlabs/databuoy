var Data = {
  spreadsheet_objects: null,
  csv_keyname_overrides: {
    "contactPoint:fn": 'contactPoint',
    "contactPoint:hasEmail": 'contactPoint',
  },
  datasets: [],
  downloadSpreadsheet: function() {
    var promise = new Promise(function(resolve, reject) {
      spreadsheet_data = null;
      if (Config.isGoogleSheet()) {
        tabletop = Tabletop.init({
                    key: Config.getDataLocation(),
                         callback: (function(data, tabletop) {
                            data_csv = Data.transformGoogleSheet(data);
                            data_json = Data.convertCSVtoJSON(data_csv);
                            clean_data = Data.cleanDatasets(data_json);
                            resolve(clean_data);
                          }),
                         simpleSheet: true });
      } else {
        $.ajax({
          context: this,
          url: Config.getDataLocation()
        }).done(function(data) {
          data_json = Data.convertCSVtoJSON(data);
          clean_data = Data.cleanDatasets(data_json);
          resolve(clean_data);
        });
      }
    });
    return promise;
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
  makeDatasetLink: function(object) {
    return window.location.href + "?id=" + object.publisher.name + "-" + object.identifier;
  },
  getDataset: function(buoy_id, dataset_array) {
    for (i = 0; i < dataset_array.length; i++) { 
      if (dataset_array[i].buoy_id === decodeURIComponent(buoy_id)) {
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
          distribution = this.convertKeyGroupToJson('distribution', parsed_csv.data[i], cache_row);
          cache_row.distribution.push(distribution);
          dataset[dataset.length - 1] = cache_row;
        } else {
          row_obj = {}; // Build a new row from scratch
          row_distribution_processed = false;
          for (var key in parsed_csv.data[i]) {
            if (parsed_csv.data[i].hasOwnProperty(key)) {
              if (this.keyGroup(key) && this.keyGroupHasNotBeenProcessed(key, row_obj)) {
                row_obj[this.keyGroup(key)] = this.convertKeyGroupToJson(this.keyGroup(key), parsed_csv.data[i], cache_row);
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
      return dataset;
    } else {
      console.error(parsed_csv.errors);
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
  convertKeyGroupToJson: function(key_group, current_row_obj, cache_row) {
    key_group_obj = {};
    for (var k in current_row_obj) {
      is_in_key_group = this.keyGroup(k) === key_group;
      if (is_in_key_group) {
        new_key = k.split(":")[1];
        key_group_obj[new_key] = current_row_obj[k];
      }
    }
    if (key_group === 'distribution' && current_row_obj.title !== "") {
      return [key_group_obj];
    } else {
      return key_group_obj;
    }
  },
  isDistributionColumn: function(key) {
    return key.match('distribution') !== null;
  },
  keyGroupHasNotBeenProcessed: function(key, current_row_obj) {
    return current_row_obj[key] === undefined;
  },
  keyGroup: function(key) {
    key = key.split(":");
    if (key.length > 1) {
      return key[0];
    } else {
      return false;
    }
  },
  transformGoogleSheet: function(data) {
    return Papa.unparse(data);
  },
  exportDatasetAsJSON: function(data) {
    catalog = {
                dataset: this.prepareDatasetsForExport(data),
                conformsTo: "https://project-open-data.cio.gov/v1.1/schema",
                "@type": "dcat:Catalog",
                "@context": "https://project-open-data.cio.gov/v1.1/schema/catalog.jsonld"
              };
    return JSON.stringify(catalog);
  },
  prepareDatasetsForExport: function(datasets) {
    exportable_datasets = [];
    for (i = 0; i < datasets.length; i++) {
      exportable_dataset = this.deleteEmptyProperties(datasets[i]);
      exportable_dataset = this.adjustDataFieldsForExport(exportable_dataset);
      exportable_datasets.push(exportable_dataset);
    }
    return exportable_datasets;
  },
  adjustDataFieldsForExport: function(dataset) {
    email = dataset.contactPoint.hasEmail;
    dataset.contactPoint.hasEmail = 'mailto:' + email;
    delete dataset.buoy_id;
    return dataset;
  },
  deleteEmptyProperties: function(dataset) {
    for (var key in dataset) {
      if (dataset[key] instanceof Array) {
        if (dataset[key].length === 1 && dataset[key][0] === "") {
          delete dataset[key];
        } else {
          this.deleteEmptyProperties(dataset[key]);
        }
      }
      else if (dataset[key] instanceof Object) {
        dataset[key] = this.deleteEmptyProperties(dataset[key]);
      }
      else if (dataset.hasOwnProperty(key)); {
        if (dataset[key] === "" || dataset[key] === [] ) {
          delete dataset[key];
        }
      }
    }
    return dataset;
  }
};