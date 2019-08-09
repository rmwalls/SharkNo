//This is the ORM file that interacts with the database
var connection = require("../config/connection.js");

var orm = {
    selectAll: function(table, func){
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result){
            if(err) throw err;
            func(result);
        });
    },
    selectBase: function(table, traits, desiredTraits, func){
        var conditions = [];
        for(var i = 0;i < traits.length;i++){
            if(traits[i] != "year"){
                desiredTraits[i] = "\"" + desiredTraits[i] + "\"";
            }
            var condition = traits[i] + "=" + desiredTraits[i];
            conditions.push(condition);
        }
        var conditionString = " WHERE ";
        for(var i = 0;i < conditions.length;i++){
            conditionString += conditions[i];
            if((i+1) < conditions.length){
                conditionString += " AND ";
            }
        }
        var queryString = "SELECT * FROM " + table + conditionString + ";";
        //console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err) throw err;
            func(result);
        });
    },
    insertOne: function(table, traits, inputTraits, func){
        console.log(traits);
        console.log(inputTraits);
        var traitString = "(";
        for(var i = 0;i < traits.length;i++){
            traitString += traits[i];
            if((i+1) < traits.length){
                traitString += ", "
            }
        }
        traitString += ")";

        var inputTraitString = "";
        for(var i = 0;i < inputTraits.length;i++){
            inputTraitString += "'" + inputTraits[i] + "'";
            if((i+1) < inputTraits.length){
                inputTraitString += ", "
            }
        }

        var queryString = "INSERT INTO " + table + traitString + " VALUES (" + inputTraitString + ")";
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if(err) throw err;
            func(result);
        });
    },
    delete: function(table, trait, conditionalTrait, func){
        var conditions = [];
        for(var i = 0;i < traits.length;i++){
            if(traits[i] != "year"){
                desiredTraits[i] = "\"" + desiredTraits[i] + "\"";
            }
            var condition = traits[i] + "=" + desiredTraits[i];
            conditions.push(condition);
        }
        var conditionString = " WHERE ";
        for(var i = 0;i < conditions.length;i++){
            conditionString += conditions[i];
            if((i+1) < conditions.length){
                conditionString += " AND ";
            }
        }
        var queryString = "DELETE FROM " + table + conditionString + ";";
        connection.query(queryString, function(err, result) {
            if(err) throw err;
            func(result);
        })
    }

}

module.exports = orm;