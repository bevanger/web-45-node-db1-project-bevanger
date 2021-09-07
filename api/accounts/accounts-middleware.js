const Accounts = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if(name === undefined || budget === undefined) {
    next({message: 'name and budget are required', status: 400})
  } else if(typeof name !== 'string') {
    next({message: 'name of account must be a string', status: 400})
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    next({ message: 'name of account must be between 3 and 100', status: 400})
  } else if(typeof budget !== 'number') {
    next({ message: 'budget of account must be a number', status: 400})
  } else if (budget < 0 || budget > 1000000) {
    next({ message: 'budget of account is too large or too small', status: 400})
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  const { name } = req.body;

  Accounts.getByName(name)
    .then((nameInUse) => {
      if(nameInUse.length > 0) {
        next( { message: 'that name is taken', status: 400 })
      } else {
        next();
      }
    })
}

exports.checkAccountId = (req, res, next) => {
  const { id } = req.params;
  Accounts.getById(id)
    .then(account => {
      if(account) {
        req.account = account
        next()
      } else {
        next({ message: 'account not found', status: 404 })
      }
    })
    .catch(next)
}