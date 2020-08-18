const path = require('path');

module.exports = config => {
  config.resolve.alias['@common'] = path.join(__dirname, './src/components/common');
  config.resolve.alias['@layouts'] = path.join(__dirname, './src/components/layouts');
  config.resolve.alias['@templates'] = path.join(__dirname, './src/components/templates');
  config.resolve.alias['@actions'] = path.join(__dirname, './src/redux/Actions');
  config.resolve.alias['@reducers'] = path.join(__dirname, './src/redux/Reducers');

  // Removes warning from pdfjs
  config.module.rules[0].parser.requireEnsure = true;

  return config;
};
