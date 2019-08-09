var orm = require("../config/orm.js");

var SharkAttacks = {
  all: function(cb) {
    orm.selectAll("attacks", function(res) {
      cb(res);
    });
  },
  take: function(traits, desiredTraits, cb) {
    orm.selectBase("attacks", traits, desiredTraits, function(res) {
      cb(res);
    });
  },
  create: function(traits, inputTraits, cb) {
    orm.insertOne("attacks", traits, inputTraits, function(res) {
      cb(res);
    });
  },
  delete: function(trait, conditionalTrait, cb){
    orm.delete(trait, conditionalTrait, function(res) {
      cb(res);
    });
  }
};

module.exports = SharkAttacks;