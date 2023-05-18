const { Router } = require('express');

const router = Router();

// The following personList should really be a database, but since it is not set up, I use it instead.
const personList = [
    {
        name: 'John',
        age: 20,
    },
    {
        name: 'Paul',
        age: 22,
    },
    {
        name: 'Ringo',
        age: 25,
    },
    {
        name: 'George',
        age: 24,
    },
];

router.get('/', (req, res) => {
    res.send(personList);
});

router.get('/:name', (req, res) => {
    const { name } = req.params;
    const personName = personList.find((p) => p.name === name);
    res.send(personName);
});

router.post('/', (req, res) => {
    console.log(req.body);
    personList.push(req.body);
    res.send(201);
});

module.exports = router;