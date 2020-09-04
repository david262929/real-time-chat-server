const {Router} = require('express')
const router = Router()

// /
router.get('/', async (req, res) => {
    res.send('Server is up and running')
});

module.exports = router;