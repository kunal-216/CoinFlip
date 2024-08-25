import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    playerAddress: String,
    amount: Number,
    side: String,
    result: String,
},{timestamps: true});

const gameModel = mongoose.model('Game', GameSchema);
export default gameModel