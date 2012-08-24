
var mongodb = require('mongodb');
var compile = require('./compile');

var Schema = module.exports = function() {
};

Schema.prototype.translate = function(schema, value) {

	switch(schema.type) {
	case 'UUID':
		return new mongodb.Binary(new Buffer(value, 'base64'), mongodb.Binary.SUBTYPE_UUID);

	case 'Date':
		var i = value % 1000;

		return new mongodb.Timestamp(i, Math.floor(value * 0.001));

	default:
		return value;
	}
};

Schema.prototype.getData = function(schema, value) {

	switch(schema.type) {
	case 'UUID':
		return new Buffer(value.value(), 'binary').toString('base64');

	case 'Date':
		return parseInt(value.getHighBits().toString() + value.getLowBits().toString());

	default:
		return value;
	}
};

Schema.prototype.package = function(schema, value) {
	return this.translate(schema, value);
}

Schema.prototype.unpackage = function(schema, value) {
	return this.getData(schema, value);
};
