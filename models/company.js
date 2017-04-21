/**
 * Created by ChikeUdenze on 4/19/17.
 */
/**
 * @author Chike Udenze
 *
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    name: {type: String, required: true,unique:true}
    , query_name: {type: String, required: true, unique: true}
    , num_employees: {type: Number, required: true}
    , contact_email: {type: String, required: true}
    , year_founded: {type: Number, required: true}
    , contact_name: {type: String, required: true}
    , rankings: {
            financials:{type: Number, required: true},
            team: {type: Number, required: true},
            idea: {type: Number, required: true}
    }
});

var Company = mongoose.model("Company", CompanySchema);

module.exports = Company;