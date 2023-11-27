const Inter = require("../models/Inter");

exports.getInterList = async function () {
  const result = await Inter.findAll();
  return JSON.parse(JSON.stringify(result));
};


exports.addInterList = async function(interObj) {
  const ins = await Inter.create(interObj);
  return ins.toJSON();
}
