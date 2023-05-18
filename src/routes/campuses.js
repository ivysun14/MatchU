const { Router } = require('express');

const router = Router();

const campusList = [
    {
        id: 1,
        campus: 'UCLA',
        miles: 12,
    },
    {
        id: 2,
        campus: 'USC',
        miles: 9,
    },
    {
        id: 3,
        campus: 'CALTECH',
        miles: 11,
    },
];
router.get('/', (req, res) => {
    const { miles } = req.query;
    const parsedMiles = parseInt(miles);
    if (!isNaN(parsedMiles)) {
        const filteredCampuses = campusList.filter((c) => c.miles <= parsedMiles);
        res.send(filteredCampuses);
    }
    else res.send(campusList);
});

module.exports = router;