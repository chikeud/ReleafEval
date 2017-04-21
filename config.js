/**
 * Created by ChikeUdenze on 4/18/17.
 */
/**
 * Contains constant attributes that are used throughout
 * the program. The attributes are here so that they can be
 * easily changed if need be.
 * @type {{port: (*|number), database: string, secret: string}}
 */

module.exports = {
    PORT: process.env.PORT || 8280 //server runs on this PORT
    , DATABASE: 'mongodb://127.0.0.1:27017/ReleafTest_DB' //DATABASE url
    , SECRET: 'blah' //SECRET for signing tokens
    , DEFAULT_ERR_MSG: "oops!! something broke"
    , DUP_ERR: 11000
};