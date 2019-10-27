const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');
router.get('/', (req, res) => res.json(members));
router.get('/:id', (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(m => m.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `The member with id:${req.params.id} doesn't exist`});
  }
});
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }
  if(!newMember.email || !newMember.name) {
    return res.status(400).json({ msg: 'Please include an email and name'});
  }
  
  members.push(newMember);
  res.json(members);
});
router.put('/:id', (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));

  if (found) {
    const updateMember = req.body;
    members.forEach(m => {
      if(m.id === parseInt(req.params.id)) {
        m.name = updateMember.name ? updateMember.name : m.name;
        m.email = updateMember.email ? updateMember.email : m.email;
        res.json( {msg: 'Member updated', member:m})
      }
    })
    res.json(members.filter(m => m.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `The member with id:${req.params.id} doesn't exist`});
  }
});
router.delete('/:id', (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Member has been deleted',
      members: members.filter(m => m.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({ msg: `The member with id:${req.params.id} doesn't exist`});
  }
});

module.exports = router;