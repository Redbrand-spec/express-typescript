const { Router } = require('express')
const router = Router()
const passport = require('passport')

const ModelReg = require('./modules/register')
const ModelAuth = require('./modules/auth')
const ModelCategory = require('./modules/category')
const Modeluserdata = require('./modules/userdata')
const ModelEvent = require('./modules/event')
const ModelParsing = require('./modules/parsing')

router.post('/api/register', ModelReg.register)
router.post('/api/auth', ModelAuth.auth)
router.post('/api/category', passport.authenticate('jwt', {session: false}), ModelCategory.category)
router.post('/api/userdata', passport.authenticate('jwt', {session: false}), Modeluserdata.userdata)
router.post('/api/event', passport.authenticate('jwt', {session: false}), ModelEvent.event)
router.get('/api/parsing', passport.authenticate('jwt', {session: false}), ModelParsing.parsing)

module.exports = router