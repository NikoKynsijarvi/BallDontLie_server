import { GamestatisticsType } from "../types"
const Gamestatistics = require("./../models/gamestatistics")

const addGamestatistics = async (entry: GamestatisticsType): Promise<GamestatisticsType> => {
    const newEntry = new Gamestatistics({entry})
    const addedEntry = await newEntry.save()
    return addedEntry
}

export default {addGamestatistics}