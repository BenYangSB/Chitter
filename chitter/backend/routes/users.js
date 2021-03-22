const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const userKey = req.body.userKey;
  const following = req.body.following;
  const newUser = new User({username,userKey, following});


  let result  = 0;

  User.find({userKey: userKey})
    .then(users => {
          result = users.length;
          if(result ==0 ){
            newUser.save()
            .then(() => res.json('ADDED INTO DATABASE'))
            .catch(err => res.status(400).json('Error: ' + err));
          }else{
            res.json("FOUND IN DATABSE")
          }
  })


});

module.exports = router;