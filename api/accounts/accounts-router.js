
const { checkAccountPayload, checkAccountNameUnique, checkAccountId} = require('./accounts-middleware');
const Accounts = require('./accounts-model');

const router = require('express').Router()

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(next)
});

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
});

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(newAccount => {
      res.status(201).json(newAccount)
    })
    .catch(next)
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
