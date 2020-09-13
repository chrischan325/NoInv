const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const eventName = req.body.eventName;
  const invited = req.body.invited;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newEvent = new Event({
    eventName,
    invited,
    description,
    date,
  });

  newEvent.save()
  .then(() => res.json('Event added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      event.eventName = req.body.eventName;
      event.invited = Number(req.body.invited);
      event.description = req.body.description;
      event.date = Date.parse(req.body.date);

      event.save()
        .then(() => res.json('event updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;