const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CategoryIncident = new Schema({
categoryId: { type: ObjectId, ref: 'Category' },
incidentId: { type: ObjectId, ref: 'Incident' },
},
{ timestamps: true });


CategorySchema.methods.toJSON = function () {
    const categoryIncident = this._doc;
    delete categoryIncident.createdAt;
    delete categoryIncident.updatedAt;
    delete categoryIncident.__v;
    return categoryIncident;
  }; 

module.exports = mongoose.model('categoryIncident', CategoryIncident);