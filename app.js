var express = require('express');
var bodyParser = require('body-parser');
var jsonexport = require('jsonexport');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
MongoClient.connect(url,{ useNewUrlParser: true },function(err, client){
    console.log("successfully connected to server");
   

    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
        app.listen(3000, () => {
        console.log('Server is running on PORT3000');
    });

    app.post('/adduser', function(req, res){
        console.log(req.body);
        var rbody = req.body;
        rbody.status = "N";
        let dbName = "project385";
        let db = client.db(dbName);
        let collection = db.collection('reports');
            collection.insertMany([req.body], function(err, result) {
            console.log("data insertion has been done to collection");
            res.send(result);    
        
    



    app.get('/getstatus', (req, res, next)=>{
        console.log(req.query);
        let dbName = "project385";
        let db = client.db(dbName);
        let collection = db.collection('reports');
        collection.findOne((req.query),function(err, docs){    
            console.log("search done");
           console.log(docs);
    
                let task = docs.Sdate;
                let task2 = docs.Edate;
                let task3 = docs.SC.catagory;
                console.log("task is = " + task3);
            
                
    
                db.collection('transactions').find({category: 902 , date: { $in: [ task, task2 ]}}, {projection: {_id:0}}).toArray (function(err, scresult){
                    console.log("search done");
                    console.log(scresult);
                    
                       
                       
        
                        jsonexport(scresult,function(err, csv){
                            if(err) return console.log(err);
                            console.log(csv);
                            fs.writeFile('Resultcsv460.csv',csv,(err,csvres) => {
                                if (err) {
                                    return;
                                } 
                                //rbody.status = 'Y';
                                res.send(scresult);
                             
                            })
                        })
                   })        
            
                
                });
            });
        }); 
          
    });
});
