const users = require('../models').users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
  userlogin(req, res){
    return users.findAll({
      where:{username: {$like: req.query.username},}
    })

    .then(user => {
      if(user){
        bcrypt.compare(req.query.password, user[0].get('password'), function(reqq, ress) {
          if(ress){
            var token = jwt.sign({id: user[0].get('username')}, 'allow',{expiresIn: 86400});
            res.status(200).send({auth: true, token: token});
          }

          else{
            return res.status(200).send({message:'Password has been entered incorectly.',});
          }
        })
      }
    })
    .catch(reqq => res.status.send)
  }
};