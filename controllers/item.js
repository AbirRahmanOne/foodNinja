const Item = require('../models/item');


const getItems = (req, res) =>{
    Item.find().sort({createdAt: -1})
    .then((data)=>{
        res.status(200);
        res.json(data) ;
    })
    .catch((err)=>{
        res.status(404).send(err);
    })
}

module.exports = {
    getItems,
}