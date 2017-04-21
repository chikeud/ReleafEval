/**
 * Created by ChikeUdenze on 4/18/17.
 */
/**
 * @author Chike Udenze
 * @since 12/29/16
 */

var express = require("express");
var apiRouter = express.Router();
var Company = require('../models/company');

var config = require('../config');

module.exports = function () {
    apiRouter.get("/", function (req, res) {
        res.send("api");
    });

    var companyRouter = express.Router();

    apiRouter.use("/company", companyRouter);

    companyRouter.post("/", function (req, res){
        var name = req.body.name.trim();
        var num_employees = req.body.num_employees;
        var contact_email = req.body.contact_email;
        var year_founded = req.body.year_founded;
        var contact_name = req.body.contact_name;
        var rankings = {
            financials: req.body.rankings_financials
            ,team: req.body.rankings_team
            ,idea: req.body.rankings_idea
        };

        if(!(name && num_employees && contact_email && year_founded && contact_email && rankings && contact_name && rankings.financials && rankings.team && rankings.idea)){
            res.status(400);
            return res.json({
                success: false
                ,message: " All fields need to be filled out in order to form company "
            });
        }

        var companyInst = new Company();
        companyInst.name = name;
        companyInst.query_name = name.split(" ").join("_");
        companyInst.num_employees = num_employees;
        companyInst.contact_email = contact_email;
        companyInst.year_founded = year_founded;
        companyInst.contact_name = contact_name;
        companyInst.rankings = rankings;


        companyInst.save(function (err,comp) {
            if(err){
                var status = 400;
                var message ="Error in forming Company. Please check that fields are of specified types and that all keys are exactly as specified in ReadMe"  ;
                if(err.code == config.DUP_ERR){
                    status = 409;
                    message = "Cannot have two companies with the same Name or query name. Please change Company Name"
                }

                res.status(status);
                return res.json({
                    success: false
                    ,message : message
                });
            }

            res.status(200);
            return res.json({
                success: true
                ,result: comp
            })

        })

    });

    companyRouter.delete("/", function(req, res){
        var name = req.body.name;

        Company.remove({name :name}, function (err, company){
            if(err){
                res.status(400);
                return res.json({
                    success: false
                    ,message: " Can't delete" + name +" Please ensure this is the name of an actual company"
                })

            }

            res.status(200);
            res.json({
                success: true
                ,message: name + " has been deleted."
                ,result: company

            });
        });
    });

    companyRouter.get("/:name", function(req,res){
        var name1 = req.params.name;

        // console.log(name);
        Company.findOne({ query_name: name1 }, function (err, comp) {
            if(err){
                res.status(400);
                return res.json({
                    success:false
                    ,message: " Can't get" + name1 +". Error Occured "
                });
            }

            res.status(200);
            res.json({
                success: true
                ,result: comp ? comp : "Company not found. Please ensure this is the name of an actual company"
            });
        });
    });

    companyRouter.put("/", function (req, res) {
        var queryName = req.body.query_name;

        console.log(req.body);

        Company.findOne({ query_name: queryName },function (err, comp) {
            if(err){
                res.status(400);
                return res.json({
                    success:false
                    ,message: " Can't update" + name1 +". Error Occured "
                });
            }

            if (!comp){
                res.status(200);
                return res.json({
                    success: false
                    ,result: "Company not found. Please ensure this is the name of an actual company"
                });
            }

            Object.keys(req.body)
                .forEach(function(key){
                    var qName = "query_name";
                    var name = "name";

                    if(key.startsWith("rankings_")){
                        rKey = key.split("_")[1];

                        if(comp.rankings[rKey]) {
                            comp.rankings[rKey] = req.body[key]
                        }
                    }

                    else if (comp[key] && key !== qName) {
                        comp[key] = req.body[key];

                        if(key == name){
                            comp[qName] = comp[name].split(" ").join("_");
                        }
                    }
                });

            comp.save(function(err, savedComp){
                if(err){
                    var status = 400;
                    var message = " Can't update" + name1 +". Error Occured ";
                    if(err.code == config.DUP_ERR){
                        status = 409;
                        message = "Cannot have two companies with the same Name or query name. Pls change Company Name"
                    }
                    res.status(status);
                    return res.json({
                        success:false
                        ,message: message
                    });
                }

                res.status(200);
                return res.json({
                    success: true
                    ,result: savedComp
                })
            });
        });

    });

    companyRouter.get("/:ranking_name/:count", function (req,res){
        var criterion = req.params.ranking_name;
        var count = req.params.count;
        var sortObj = {};

        sortObj["rankings." + criterion] = -1;

        Company.find({})
            .limit(parseInt(count))
            .sort(sortObj)
            .exec(function(err, result){
                if(err) {
                    res.status(400);
                    return res.json({
                        success:false
                        ,message: "Can't get requested Companies. Please ensure that the ranking name follows guidelines as detailed in Readme"
                    })
                }
                res.status(200);
                return res.json({
                    success: true
                    ,result: result
                })


            });


    });

    return apiRouter;

};