import { GamestatisticsType } from "../types"
import {Gamestatistics} from "./../models/gamestatistics"

const addGamestatistics = async (entry: GamestatisticsType): Promise<GamestatisticsType> => {
    const newEntry = new Gamestatistics({entry})
    const addedEntry = await newEntry.save()
    return addedEntry
}