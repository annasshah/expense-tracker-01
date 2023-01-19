const Assets_Record = require("../models/Assets_Record")
const User = require("../models/User")

const is_empty_check = ['', undefined, null]


const get_user_assets = async (req, res) => {
    const { userId, tokenId } = req

    try {

        const find_user_assets = await Assets_Record.findOne({ user_id: userId })

        return res.status(200).json({ success: true, data: find_user_assets })


    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}

const record_assets = async (req, res) => {
    const { cash, bank, saving, currency } = req.body
    const { userId, tokenId } = req
    try {
        const is_record_exist = await Assets_Record.exists({ user_id: userId })

        if (is_record_exist) {

            return res.status(409).json({ success: false, message: 'User assets are already recorded!' })
        }

        const save_asset_record = await Assets_Record.create({
            cash, bank, saving, currency, user_id: userId
        })

        const update_user_details = await User.findByIdAndUpdate(userId, { complete_asset_details: true }, { new: true })

        return res.status(200).json({ success: true, data: save_asset_record, complete_asset_details: update_user_details.complete_asset_details })
    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }
}


const update_user_assets = async (req, res) => {
    const { userId, tokenId } = req

    try {
        const find_user_assets = await Assets_Record.findOne({ user_id: userId })


        if (!find_user_assets) {

            return res.status(422).json({ success: false, message: 'No user user asset found!' })

        }

        const update_record = req.body

        const save_asset_record = await Assets_Record.findByIdAndUpdate(find_user_assets.id, {
            ...update_record
        }, { new: true })


        return res.status(200).json({
            success: true,
            data: save_asset_record,
        })

    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}





// total: new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency }).format(save_asset_record.cash + save_asset_record.bank + save_asset_record.saving) 




module.exports = { get_user_assets, record_assets, update_user_assets }