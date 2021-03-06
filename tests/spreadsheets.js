var gsheets = require('../index'),
	async = require('async');

var theSheet = null, theWorksheet = null;

module.exports = {

	setUp: function(callback) {
		gsheets.auth({
			email: process.env.GSHEETS_USER,
			password: process.env.GSHEETS_PASS
		}, function(err) {		
			if (err) {
				throw err;
			}
			callback();
		});
	},
	tearDown: function(callback) {
		// cleanup?
		gsheets.logout();
		callback();
	},

	"list spreadsheets": function(test) {
		test.expect(2);
		gsheets.list(function(err, sheets) {
			test.ifError(err);
			test.ok(sheets.length > 0, 'Found ' + sheets.length + ' spreadsheets in account, should be at least 1');
			test.done();
		});
	},

	"get spreadsheets": function(test) {
		test.expect(2);
		gsheets.getSpreadsheet(process.env.GSHEETS_TEST_KEY, function(err, sheet) {
			test.ifError(err);
			test.ok(sheet, 'Found a spreadsheet');
			test.done();
		});
	},

	"get invalid spreadsheet": function(test) {
		test.expect(2);
		gsheets.getSpreadsheet('invalidsheetkey', function(err, sheet) {
			test.ok(err, 'Should throw an error for invalid sheet');
			test.ok(!sheet, 'Sheet should be null or undefined');
			test.done();
		});
	}

};