const { default: mongoose } = require("mongoose")
const Assets_Record = require("../models/Assets_Record")
const Categories = require("../models/Categories")
const Transaction_Record = require("../models/Transaction_Record")
var ObjectId = require('mongoose').Types.ObjectId;


const all_transaction_aggregation = async (userId, format) => {

    return await Transaction_Record.aggregate([
        { $match: { user_id: { $eq: mongoose.Types.ObjectId(userId) } } },
        { $sort: { createdAt: -1 } },
        {
            $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category_data"
            }
        },
        {
            $group: {
                // _id: { $dateToString: { date: "$createdAt", format: "%m/%Y" } },
                _id: { $dateToString: { date: "$createdAt", format: format } },
                data: {

                    $push: {
                        _id: "$_id",
                        user_id: "$user_id",
                        paid_from: "$paid_from",
                        amount: "$amount",
                        category: "$category",
                        description: "$description",
                        category_data: "$category_data",
                        createdAt: "$createdAt",
                        updatedAt: "$updatedAt",
                    }
                }
            }
        },
        {
            $project: {
                date_range: "$_id",
                data: "$data",
                _id: 0
            }
        },
        {
            $sort: {
                date_range: -1
            }
        }
    ])

}

const month_transaction_aggregation = async (userId, format) => {

    return await Transaction_Record.aggregate([

        { $match: { user_id: { $eq: mongoose.Types.ObjectId(userId) } } },
        { $sort: { createdAt: -1 } },
        {
            $project: {
                _id: { $dateToString: { date: "$createdAt", format: "%d/%m/%Y" } },
                paid_from: "$paid_from",
                amount: 1
            }
        },
        {
            $group: {
                _id: { date_range: "$_id", paid_from: "$paid_from" },
                total: { $sum: "$amount" },

            }
        },
        {
            $project: {
                data: "$_id",
                total: "$total",
                _id: 0
            }
        },
        {
            $sort: {
                date_range: 1
            }
        }
    ])

}


// const last_month_transaction_aggregation = async (userId, format) => {

//     return await Transaction_Record.aggregate(
//         {
//             $match: {
//                 $expr: {
//                     $and: [
//                         {
//                             "$eq": [
//                                 {
//                                     $month: "$createdAt"
//                                 },
//                                 {
//                                     $month: {
//                                         $dateAdd: {
//                                             startDate: new Date(),
//                                             unit: "month",
//                                             amount: -1
//                                         }
//                                     }
//                                 }
//                             ]
//                         },
                        
//                     ]
//                 }
//             }
//         }
//     )

// }



const valid_paid_from = ['cash', 'bank', 'saving']

const required_fields = ['amount', 'description', 'paid_from']

const new_transaction = async (req, res) => {
    const { userId, tokenId, body } = req

    try {
        const { amount, category_id, description, paid_from, other_category } = body

        const body_keys = Object.keys(body)

        const missing_fields = []

        required_fields.forEach(element => {
            if (!body_keys.includes(element)) {
                missing_fields.push(element)
            }
        })

        if (!other_category && !category_id) {
            missing_fields.push('category')
        }

        if (missing_fields.length) {
            return res.json({ success: false, message: 'Please fill all required fields', missing_fields }).status(422)
        }

        const payment_channel = paid_from.toLowerCase()

        if (!valid_paid_from.includes(payment_channel)) {
            return res.json({ success: false, message: 'Entered invalid payment channel' }).status(422)
        }

        let transaction_category_id
        transaction_category_id = category_id

        let new_category = null

        if (other_category) {
            new_category = await Categories.create({
                category: other_category, user_id: userId, default_category: false
            })

            transaction_category_id = await new_category.id
        }


        const update_assets = await Assets_Record.findOneAndUpdate({ user_id: userId },
            { $inc: { [payment_channel]: -amount } }, { new: true })


        const user_transaction = await Transaction_Record.create({
            amount, category: transaction_category_id, description, paid_from: payment_channel, user_id: userId
        })

        const transaction_data = await all_transaction_aggregation(userId, "%m/%Y")
        const for_chart_view_transactions = await month_transaction_aggregation(userId, "%m/%Y")


        res.json({
            data: user_transaction,
            transactions: transaction_data,
            graph_data: for_chart_view_transactions,
            new_category: new_category,
            assets: update_assets,
            success: true,
            message: 'Successfully recorded!'
        }).status(200)

    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }


}




const edit_transaction = async (req, res) => {
    const { userId, tokenId, body, params } = req

    try {
        const check_params_id = ObjectId.isValid(params.id)

        if (!check_params_id) {
            return res.json({ success: false, message: 'Invalid Transaction id!' }).status(400)
        }


        const find_transaction = await Transaction_Record.findById(params.id)

        if (!find_transaction) {
            return res.json({ success: false, message: 'No transaction found!' }).status(404)
        }



        let transaction_category_id
        transaction_category_id = body?.category_id

        const update_data = {
            ...body
        }

        let new_category = null

        if (body.other_category) {
            new_category = await Categories.create({
                category: body.other_category, user_id: userId, default_category: false
            })

            transaction_category_id = await new_category.id

        }

        update_data.category = transaction_category_id

        const body_keys = Object.keys(body)

        let update_assets = null




        if (body_keys.includes('paid_from') || body_keys.includes('amount')) {

            await Assets_Record.findOneAndUpdate({ user_id: userId },
                { $inc: { [find_transaction.paid_from]: find_transaction.amount } }, { new: true })


            const update_amount = body_keys.includes('amount') ? body.amount : find_transaction.amount
            const payment_channel = body_keys.includes('paid_from') ? body.paid_from.toLowerCase() : find_transaction.paid_from


            update_assets = await Assets_Record.findOneAndUpdate({ user_id: userId },
                { $inc: { [payment_channel]: -parseInt(update_amount) } }, { new: true })
        }


        await Transaction_Record.findByIdAndUpdate(find_transaction._id, { ...update_data }, { new: true })

        const transaction_data = await all_transaction_aggregation(userId, "%m/%Y")
        const for_chart_view_transactions = await month_transaction_aggregation(userId, "%m/%Y")

        res.json({
            assets: update_assets,
            transactions: transaction_data,
            graph_data: for_chart_view_transactions,
            new_category: new_category,
            success: true,
            message: 'Successfully updated!'
        }).status(200)



    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}


const delete_transaction = async (req, res) => {
    const { userId, tokenId, params } = req

    try {
        const check_params_id = ObjectId.isValid(params.id)


        if (!check_params_id) {
            return res.json({ success: false, message: 'Invalid Transaction id!' }).status(400)
        }


        const find_transaction = await Transaction_Record.findOne({ _id: params.id, user_id: userId })

        if (!find_transaction) {
            return res.json({ success: false, message: 'No transaction found!' }).status(404)
        }

        let update_assets = await Assets_Record.findOneAndUpdate({ user_id: userId },
            { $inc: { [find_transaction.paid_from]: find_transaction.amount } }, { new: true })

        await Transaction_Record.findByIdAndRemove(find_transaction._id)

        const transaction_data = await all_transaction_aggregation(userId, "%m/%Y")
        const for_chart_view_transactions = await month_transaction_aggregation(userId, "%m/%Y")


        return res.json({
            assets: update_assets,
            transactions: transaction_data,
            graph_data: for_chart_view_transactions,
            success: true,
            message: 'Successfully deleted!'
        }).status(200)

    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}

const get_all_transactions = async (req, res) => {
    const { userId, tokenId } = req
    try {
        const al_transactions = await all_transaction_aggregation(userId, "%m/%Y")
        const for_chart_view_transactions = await month_transaction_aggregation(userId, "%m/%Y")




        res.json({ success: true, data: al_transactions, graph_data: for_chart_view_transactions })

    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}








module.exports = { new_transaction, get_all_transactions, edit_transaction, delete_transaction }