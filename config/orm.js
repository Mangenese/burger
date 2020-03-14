var connection = require("../config/connection.js");

function printQuestionMarks(num){
	var arr = [];

	for (var i=0; i<num; i++){
		arr.push("?");
	}
	return arr.toString();

}

function objToSql(ob){
	var arr = [];

	for(var key in ob){
		var value = ob[key];
		if(Object.hasOwnProperty.call(ob, key)){
			if(typeof value === "string" && value.indexOf("") >= 0){
				value = " '" + value + "' ";
			}
			arr.push(key + " =" + value);
		}
	}
	return arr.toString();
}

var orm = {
	selectAll: function(tableInput, cb){
		var queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, function(err,results){
			if(err){
				throw err;
			}
			cb(results);
		});
	},

insertOne: function(table,cols,vals,cb){
	var queryString = "INSERT INTO " + table;

	queryString += "(";
	queryString += cols.toString();
	queryString += ")";
	queryString += "VALUES (";
	queryString += printQuestionMarks(vals.length);
	queryString += ")";

	console.log(queryString);

	connection.query(queryString,vals, function(err, results){
		if(err){
			throw err;
		}
		cb(results);
    });
    

},

updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
        if (err) {
            throw err;
        }
        cb(result);
        //I need to fix up the following code to make it to where it can not give an error for returning a "Incorrect integer value: 'true' for column 'devoured' at row 1". 
    //Now I need to return strict mode back to MySQL however that has been giving issues on that front.
    //Once I can fix that  then this app should be running and good to go. 
    //Before it was giving an error API POST error.
        //If you look in the terminal you will see that devoured now shows up with a 0 
    });
}}

module.exports = orm;