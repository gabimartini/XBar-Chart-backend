let NeDB = require('nedb');
let db = new NeDB({
    filename: 'data.db',
    autoload:true
})



module.exports = app => {

    let route = app.route('/data')
    
    
   

route.get((req, res)=>{

    db.find({}).sort({name:1}).exec((err, data) => {

        if (err){
           app.uteis.error.send(err, req, res);
            
        }else{
            res.statusCode = 200;
                res.setHeader('Content-Type', 'aplication/json');
                res.json({
                    data
                });
        }

    })

    

});


route.post((req, res)=>{

   
    db.insert(req.body, (err, data)=>{
        if(err){

            app.uteis.error.send(err, req, res);

        }else{
            res.status(200).json(data)
        }
    })

});



let routeId = app.route('/data/:id');

routeId.get((req, res) => {
    db.findOne({_id:req.params.id}).exec((err, data,)=>{
        if(err){
            app.uteis.error.send(err, req, res);
        }else{
            res.status(200).json(data);
        }
    })
})

routeId.put((req, res) => {

    db.update({_id: req.params.id}, req.body, err=>{
        if(err){
            app.uteis.error.send(err, req, res);
        }else{
            res.status(200).json(Object.assign(req.params, req.body));
        }

})
});

routeId.delete((req, res) => {

    db.remove({_id: req.params.id}, req.body, err=>{
        if(err){
            app.uteis.error.send(err, req, res);
        }else{
            res.status(200).json(req.params);
        }

})
});
}


