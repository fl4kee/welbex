const moment = require('moment')
const db = require('../db');

function convertTime(data){
    for(let element of data['rows']){
        element.date_ = moment(element.date_).format('DD-MM-YYYY');
    }
    return data
}

class entryController{
    async createEntry(req, res){
        const {date_, title, qty, distance} = req.body
        try{
            await db.query("INSERT INTO welbext(date_, title, qty, distance) VALUES($1,$2,$3,$4) RETURNING *", [date_, title, qty, distance])
            const data = await db.query("SELECT * FROM welbext")
            convertTime(data)
            res.json(data)
        }
        catch(e){
            res.status(400).send()
        }
    }
    async filterTable(req, res) {
        try{
            let { column, condition, value } = req.body
            if(condition == 'like'){
                value = "'%" + value + "%'"
            }
            const data = await db.query(`SELECT * FROM welbext WHERE ${column} ${condition} ${value}`)
            convertTime(data)
            res.json(data)
        }
        catch(e){
            res.status(400).send()
        }
    }

    async showTable(req, res){
        try{   
            const data = await db.query("SELECT * FROM welbext")
            convertTime(data)
            res.json(data)
        }
        
        catch(e){
            res.status(400).send()
        }
    }
    

}
module.exports = new entryController;
