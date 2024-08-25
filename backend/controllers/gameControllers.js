import gameModel from "../models/gameModels.js"

const saveResult = async (req, res) => {
    const {playerAddress, amount, side, result} = req.body;
    try {
        if(!playerAddress || !amount || !side || !result){
            return res.status(400).json({message: "All fields are not filled"})
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }

        const newGame = new gameModel({
            playerAddress, amount, side, result
        })
        
        await newGame.save();
        res.status(201).json({message: "Game saved successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: error })
    }
}

export { saveResult }