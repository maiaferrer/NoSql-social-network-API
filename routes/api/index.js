const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes')

router.use('/thoughts', thoughtRoutes);
// users

module.exports = router;
