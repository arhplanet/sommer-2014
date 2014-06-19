var db = require("./db");
var ut = require("./utilities");


/*Old method, used to return the JSON object directly.
We are now using readAllAnswers instead

function readAnswers(req, res) {
	db.readAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(JSON.stringify(rows));
		}
	});
}
*/

//Used to get all rows from the database and return them in a HTML table
function readAllAnswers(req, res) {
	db.readAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(ut.printTableHtml(rows));
		}
	});
}

/*Old method, used to hardcode an alternative into the db.
We are now using insertAnswerDb

function insertPredefAnswerDb(req, res) {
	db.insertAnswer(['"singel"'], function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Your insert was successfull. You inserted:\n " + JSON.stringify(rows));
		}
	});
}
*/

/*Used to insert the answers received from the form into the database.
Fix the "hardcoding" of the values?
Is called when the user presses submit (http post action)
*/
function insertAnswerDb(req, res) {
	values = [req.body.sivilstatus, req.body.pa_hodet];
	db.insertAnswer(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Your insert was successful. You inserted:\n " + JSON.stringify(rows));
		}
	});
}

//Used to fetch insertAnswer.hmtl that shows the form to the user
function insertAnswerPage(req,res) {
	res.sendfile("html/insertAnswer.html");
}

//Used to fetch menuButtons.html that shows the menu with buttons
function menu(req, res) {
	res.sendfile("html/menuButtons.html");
}

//Used to truncate (clear/delete) the table. Returns a message to the user if successful
function deleteAll(req, res) {
	db.deleteAll(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
		res.send("Successfully deleted all answers");
		}
	});
}

//Used to handle errors. Look into the error handler provided by express.js?
function errorHandler(error, response) {
			console.log("There has been an error:");
			console.log(error);
			response.send("There has been an error with the database, check the console for details...");
}



exports.insertAnswerPage = insertAnswerPage;
exports.insertAnswerDb = insertAnswerDb;
exports.menu = menu;
exports.deleteAll = deleteAll;
exports.readAllAnswers = readAllAnswers;

//Old exports, methods now commented out
//exports.insertPredefAnswerDb = insertPredefAnswerDb;
//exports.readAnswers = readAnswers;