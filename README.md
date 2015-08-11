~ Note: this project is still in development ~

# Databuoy

![Harbor Buoy](https://farm4.staticflickr.com/3532/3832384357_bb2e224f77_z.jpg)

_Image courtesy of Isaac Wedin under the Creative Commons [Attribution 2.0 Generic](https://creativecommons.org/licenses/by/2.0/) license_

Databuoy is a spreadsheet-backed data catalog that anyone can put online for free. It helps organizations compile a machine-readable data inventory while simultaneously creating a public website that presents it.  With Databuoy, [this spreadsheet](https://docs.google.com/spreadsheets/d/16bk6mScsXWpd-KX80Jn2Qzj1q_vyeFfCQBeWMdBi2nE/edit#gid=0) turns into [this website](http://sunlightlabs.github.io/databuoy/).

If you're a developer, you can read about deployment [here](https://github.com/sunlightlabs/databuoy/wiki/Setup-(for-developers)). If not, you can deploy the site too! Read on!

### What does it mean that Databuoy is spreadsheet-backed?

Databuoy draws its data from a publicly viewable spreadsheet. Whenever that spreadsheet is updated, the website will be updated as well. That spreadsheet can either be in the form of a [Google Sheet](https://www.google.com/sheets/about/) (which updates automatically) or a `.csv` file (which must be manually updated on GitHub). 

### How does the website get online?

Databuoy uses [GitHub Pages](https://pages.github.com/) to _automatically_ provide a free, publicly-accessible website. By copying Databuoy's open-source code on GitHub ("[forking](https://help.github.com/articles/fork-a-repo/)" it) and pasting your spreadsheet's URL into the `google_sheet_url` file, you'll have a website at `https://your_github_username.github.io/databuoy`. You can even [set up](https://help.github.com/articles/setting-up-a-custom-domain-with-github-pages/) a custom domain name!

### Does my spreadsheet need a particular format?

Yes! You should just make a copy [this example spreadsheet](https://docs.google.com/spreadsheets/d/16bk6mScsXWpd-KX80Jn2Qzj1q_vyeFfCQBeWMdBi2nE/edit#gid=0) whose columns are based on the US Federal Government's [Project Open Data Metadata Schema v1.1](https://project-open-data.cio.gov/v1.1/schema).

### Do datasets need to be online for them to be in Databuoy?

No! The schema allows for datasets that are not public, so people can know about a dataset, even if they don't have access to its contents (that way, we can know that the police has a `list_of_criminals_unfit_for_public_circulation.xls` file, even if we can't see who's in it).

### How do I start?

Check out our setup guides for [developers](https://github.com/sunlightlabs/databuoy/wiki/Setup-(for-developers)) and [non-developers](https://github.com/sunlightlabs/databuoy/wiki/Setting-up-a-catalog-with-Databuoy-and-Google-Sheets).

### Exports

Databuoy can export to the [Project Open Data Metadata Schema (v1.1)](https://project-open-data.cio.gov/v1.1/schema/), but the [official converters](http://labs.data.gov/dashboard/datagov/csv_to_json) are a better route.
