const Product = require('../../models/Product');



const searchProducts = async(req,res) =>{

    try {

        const {keyword} = req.params;

        if(!keyword || typeof keyword !== "string"){
            return res.status(404).json({
                success : false,
                message : "Please enter a keyword"
            })
        }

        const regEx = new RegExp(keyword.toLowerCase(), 'i');
        // const regEx = new RegExp(keyword, "i");


        const createSearchQuery = {
            $or : [
                {title : regEx},
                {description : regEx},
                {category : regEx},
                {brand : regEx}
            ]
        }

        const searchResults = await Product.find(createSearchQuery);
        console.log("searchResults" , searchResults);


        res.status(200).json({
            success : true,
            data : searchResults
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : true,
            message : "Error"
        })
    }

}

module.exports = {searchProducts}