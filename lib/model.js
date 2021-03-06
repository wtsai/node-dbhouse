
var Model = module.exports = function(schema, index) {
	this.schema = schema || null;
	this.index = index || [];
	this.paths = {};
};

Model.prototype.init = function() {
	var self = this;

	self.configure('', self.schema);
};

Model.prototype.configure = function(prefix, schema) {
	var self = this;

	for (var key in schema.schema) {
		var obj = schema.schema[key];
		var new_prefix = (prefix) ? prefix + '.' + key : key;

		self.paths[new_prefix] = obj;
		if (obj.type == 'Schema') {
			self.configure(new_prefix, obj.schema);

		} else if (obj.type == 'Array') {
			if (obj.subtype == 'Schema') {
				self.configure(new_prefix, obj.schema);
				self.configure(new_prefix + '.$', obj.schema);
			}

		} else if (obj.type == 'Dict') {
			if (obj.subtype == 'Schema') {
				self.configure(new_prefix + '{}', obj.schema);
			}
		}
	}
};

Model.prototype.getInfo = function(path) {
	if (!this.paths.hasOwnProperty(path))
		return null;

	return this.paths[path];
};
