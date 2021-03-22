const router = require('express').Router();
const Exercise = require('../models/exercise.model');
let User = require('../models/user.model');
const mongoose = require('mongoose');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:key').get((req, res) => {

  User.find({userKey: String(req.params.key)})
    .then(users => res.json(users))
    .catch(err => res.json(req.body))
});

router.route('/update/:id').post((req, res) => {
  
  User.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id))
    .then(users => {
      users.username = req.body.username;
      users.userKey = req.body.userKey;
      users.following = req.body.following;
      users.followers = req.body.followers;

      users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const userKey = req.body.userKey;
  const following = req.body.following;
  const followers = req.body.followers;
  const newUser = new User({username,userKey,following,followers});

  let result  = 0;

  User.find({userKey: userKey})
    .then(users => {
          result = users.length;
          if(result ==0 ){
            newUser.save()
            .then(() => res.json('ADDED INTO DATABASE'))
            .catch(err => res.status(400).json('Error: ' + err));
          }
          else{
            res.json("FOUND IN DATABSE")
          }

  })


});

module.exports = router;