var DBHouse = require('../index');

/* Create connection with database server */
var dbHouse = new DBHouse;
dbHouse.connect();

/* Create a database operator */
var db = new DBHouse.Database(dbHouse);
db.open('dbhouse')
	.collection('users')
	.where({
		'$or': [ { name: 'Fred Chien'}, { name: 'Stacy Li' } ]
	})
	.limit(1)
	.query(function(err, data) {
		if (err)
			throw err;

		console.log(data);
	});
