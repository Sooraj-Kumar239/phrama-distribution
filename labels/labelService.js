const labels = require('./labels.json'); 
module.exports = {
  get: (key) => labels[key] || `MISSING_LABEL: ${key}`
};