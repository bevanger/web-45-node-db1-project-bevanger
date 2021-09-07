
const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('returns an array of accounts (or an empty array if there aren't any)')
});

router.get('/:id', (req, res, next) => {
  res.json(' returns an account by the given id')
});

router.post('/', (req, res, next) => {
  res.json('returns the created account. Leading or trailing whitespace on budget name should be trimmed before saving to db.')
});

router.put('/:id', (req, res, next) => {
  res.json('returns the updated account. Leading or trailing whitespace on budget name should be trimmed before saving to db' )
});

router.delete('/:id', (req, res, next) => {
  res.json('returns the deleted account')
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: 'Something bad inside the accounts router'
  })
});

module.exports = router;
