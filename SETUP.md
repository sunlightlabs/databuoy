# Development Setup

This project uses npm for package management and Grunt for task running. The project has [ReactJS](https://facebook.github.io/react/index.html) written in [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html), which Grunt turns into JavaScript with [Babel](https://babeljs.io/). Here's how to get up and running:

```
# Assumes you've got npm installed:
git clone https://github.com/sunlightlabs/databuoy.git
cd databuoy
sudo npm install -g grunt-cli
npm install
grunt
```

Open up http://localhost:8000/index.html, and you should see a freshly-built version of the site! When you edit files in `src`, Grunt will make sure that your changes are reflected in the `dist` directory, which is where `index.html` gets its JavaScript and CSS.
