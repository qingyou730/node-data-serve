const Inter = require("../models/Inter");

exports.getInterList = async function () {
  const result = await Inter.findAll();
  return JSON.parse(JSON.stringify(result));
};


exports.addInterList = async function(interObj) {
  const ins = await Inter.create(interObj);
  return ins.toJSON();
}

exports.getInterOne = async function(ip) {
  const result = await Inter.findOne({
    where: {
      ip: ip
    }
  });
  return JSON.parse(JSON.stringify(result));
}

exports.updateInterList = async function(id, interObj) {
  const result = await Inter.update(interObj, {
    where: {
      id: id
    }
  });
  return JSON.parse(JSON.stringify(result));
}