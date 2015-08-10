~ Note: this project is still in development ~

# Databuoy

![Harbor Buoy](https://farm4.staticflickr.com/3532/3832384357_bb2e224f77_z.jpg)

_Image courtesy of Isaac Wedin under the Creative Commons [Attribution 2.0 Generic](https://creativecommons.org/licenses/by/2.0/) license_


Databuoy is a free, spreadsheet-backed data catalog that's easy for anyone to put online. It helps governments compile machine-readable data inventories while simultaneously creating a lightweight data catalog.

It:

* uses [Google Sheets](https://www.google.com/sheets/about/) (free!) to store information about a government's data inventory (it can also read in data from a CSV)
* uses [GitHub Pages](https://pages.github.com/) (free!) to serve that spreadsheet's contents in a searchable website that anyone can use (it can also be deployed to a private server).
* is designed to work off of the United States Federal Government's [Project Open Data Metadata Schema v1.1](https://project-open-data.cio.gov/v1.1/schema/)

It doesn't:

* host your datasets
* replace fuller-fledged data portals like [CKAN](http://ckan.org/) (not even close!)

## Exports

Databuoy can export to the [Project Open Data Metadata Schema (v1.1)](https://project-open-data.cio.gov/v1.1/schema/), but the [official converters](http://labs.data.gov/dashboard/datagov/csv_to_json) should be regarded as canonical.
