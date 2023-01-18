const Categories = require("../models/Categories")

const add_category = async (req, res) => {
    const { userId, tokenId, body, admin } = req

    const { category} = body

    if (!category) {
        return res.status(422).send({ success: false, message: "category string not found!" })
    }

    const create_category = await Categories.create({
        category, default_category: admin ? true : false,user_id:userId
    })

    res.json({
        success:true,
        create_category,
        message: 'Category succesfully added!'
    }).status(200)

}

const get_category = async (req, res) => {
    const { userId, tokenId, admin } = req


    let find_categories = []

    if(admin){
        find_categories = await Categories.find({})
    }
    
    else{
        find_categories = await Categories.find({$or:[{user_id:userId},{default_category:true}]})
    }

    res.json({
        success:true,
        data:find_categories
    
    }).status(200)

}


module.exports = { add_category,get_category }