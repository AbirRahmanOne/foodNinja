const Product = require('../models/product');

const loadProduct = (products)=>{
    const productArray= [] ;
    for (const product in products ){
        productArray.push({
            id: product.id,
            title: product.title,
            price: product.price,
            inStock: product.inStock,
            description: product.description,
            menu: product.menu,
            type: product.type,
        });
    }
    return productArray ;
}


const getProducts = (req, res) =>{
    Product.find().exec( (error, data) => {
        if(error) return res.status(401).json({
            message: "Prodcut not found!"
        });

        if(data){
            const products = loadProduct(data) ;
            res.status(200).json({
                products
            });
        }
    })
}

const createProducts = (req, res)=>{
    const{
        id,
        title,
        price,
        inStock,
        description,
    }= req.body ;

    const product = new Product({
        id: id,
        title,
        price,
        inStock,
        description,
    });

    product.save( (error, product)=>{
        if(error) return res.status(400).json( {
            error
        });

        res.status(201).json({
            product 
        })

    });

;}


module.exports = {
    getProducts,
    createProducts,
}



