const Router = require('express')
const router = new Router()
const entryController = require('../controllers/entry.controller')

router.post('/entry', entryController.createEntry)
router.post('/filter', entryController.filterTable)
router.get('/table', entryController.showTable)

module.exports = router 