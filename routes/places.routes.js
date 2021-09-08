const router = require("express").Router();
const Place = require('./../models/Place.model')
const API_KEY = process.env.API_KEY


// Places list
router.get('/', (req, res) => {
  
  Place
    .find()
    .then(places => res.render('places/places-list', { places }))
    .catch(err => console.log(err))
})


// Create place: rendering
router.get('/create', (req, res) => res.render('places/new-place'))


// Create place: management
router.post('/create', (req, res) => {

  const { name, type, lat, lng } = req.body

  const location = {
    type: 'Point',
    coordinates: [lat, lng]
  }

  Place
    .create({ name, type, location })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// Edit place: rendering
router.get('/:id/edit', (req, res) => {

  const { id } = req.params

  Place
    .findById(id)
    .then(updatedPlace => {

      let isBookstore = false
      updatedPlace.type === 'bookstore' ? isBookstore = true : null
      res.render('places/edit-place', { updatedPlace, isBookstore })
    })
    .catch(err => console.log(err))
})


// Edit place: management
router.post('/:id/edit', (req, res) => {

  const { id } = req.params
  const { name, type, lat, lng } = req.body
  const location = {
    type: 'Point',
    coordinates: [lat, lng]
  }

  Place
    .findByIdAndUpdate(id, { name, type, location}, { new: true })
    .then(() => {res.redirect('/places')})
    .catch(err => console.log(err))
})


// Delete place
router.post('/:id/delete', (req, res) => {

  const { id } = req.params

  Place
      .findByIdAndRemove(id)
      .then(res.redirect('/places'))
      .catch(err => console.log(err))
})


// Places map
router.get('/map', (req, res) => res.render('places/places-map', { API_KEY }))


module.exports = router;
