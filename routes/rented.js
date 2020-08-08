const express = require('express');
const router = express.Router();

router.get('/all-rented-books', (req, res) => {
    res.send({
        'name': 'nirdesh'
    })
})


router.get('/:id/all-rented-books', (req, res) => {
    if (req.params.id !== ':1') return res.status(404).send(`User with given ${req.params.id} is not a member`);
    else {
        res.send({
            'name': 'nirdesh'
        })
    }
})



module.exports = router;