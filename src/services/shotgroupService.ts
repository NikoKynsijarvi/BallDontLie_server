import { ShotgroupEntry, ShotgroupStatistics, ShotsPerMonth} from "../types"
const Shotgroup = require('./../models/shotGroup')

interface ShotTotals{
    total_made:number,
    total_threes_made:number,
    total_fts_made:number,
    total_fg:number,
    total_three_fg: number,
    total_ft_percentage:number,
}

const getTotals = (array:[ShotgroupEntry]):ShotTotals => {
    let total_made = 0;
    let total_threes_made = 0;
    let total_fts_made = 0;

    let total_attempted = 0;
    let total_threes_attempted = 0;
    let total_fts_attempted = 0;

    array.map((a) => {
       total_made += a.shotsmade
       total_attempted += a.shotsattempted
       if(a.type === "ft"){
        total_fts_made += a.shotsmade
        total_fts_attempted += a.shotsattempted
       }
       if(a.type === "3p"){
        total_threes_made += a.shotsmade
        total_threes_attempted += a.shotsattempted
       }
       return;
    })

    const total_fg = parseInt(((total_made / total_attempted) * 100).toFixed(0))
    const total_three_fg = parseInt(((total_threes_made/total_threes_attempted)*100).toFixed(0))
    const total_ft_percentage = parseInt(((total_fts_made/total_fts_attempted)*100).toFixed(0))

    return {
        total_made,
        total_fts_made,
        total_threes_made,
        total_fg,
        total_three_fg,
        total_ft_percentage
    }
}

const sortByMonth = (_array:[ShotgroupEntry], year:number) => {
    let months = new Array<ShotsPerMonth>(12).fill({
        month: 0,
        year: year,
        month_total:0,
        month_threes:0,
        month_fts:0
    })
    
    // const filteredByYear = array.filter((a) => {
    //     const date = a.date.split("-")
    //     const log_year = date[0];
    //     if(parseInt(log_year) !== year){
    //         return;
    //     }
    //     return a
    // })
    months.map((_month, index) => {
      return  months[index] = {
            month: index+1,
            year: year,
            month_total:0,
            month_threes:0,
            month_fts:0
        }
      
    })

   
    return months
}

const formatStatistics = async(entry:string): Promise<ShotgroupStatistics> => {
    const date = new Date();
    const shotgroups = await Shotgroup.find({user:entry})    
    const totals = getTotals(shotgroups)
    const monthly_totals = sortByMonth(shotgroups, date.getFullYear())
    
    const statistics = {
    user_id: entry,
    total: totals.total_made,
    total_threes:totals.total_threes_made,
    total_fts:totals.total_fts_made,
    total_fg:totals.total_fg,
    total_three_fg: totals.total_three_fg,
    total_ft_percentage:totals.total_ft_percentage,
    this_year_monthly: monthly_totals
    }

    return statistics
}


//TODO: Make the search based on id !!
const findAll = async(entry:string): Promise<[ShotgroupEntry]> => {
    const shotgroups = await Shotgroup.find({user:entry})    
    return shotgroups
}

const addShotgroup = async (entry:ShotgroupEntry): Promise<ShotgroupEntry> => {

    const newShotgroup = new Shotgroup({
        username:entry.username,
        type: entry.type,
        shotsmade: entry.shotsmade,
        shotsattempted: entry.shotsattempted,
        date: entry.date,
        user: entry.user_id
    })    
    const savedShotgroup =  await newShotgroup.save()
    return savedShotgroup
}

export default {addShotgroup, findAll, formatStatistics}