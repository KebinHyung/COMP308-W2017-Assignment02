/*
Kevin Luu
Feb 25,2017
Purpose: Functionality for CRUD using mongoose and MongoDB
Added Functionality: Authentication
*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the contact model
let contact = require('../models/contacts');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET contacts List page. READ */
router.get('/', requireAuth,  (req, res, next) => {
  // find all contacts in the contacts collection
  contact.find( (err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
       contacts.sort(function (a, b) {
         let nameA = a.name.toUpperCase(); // ignore upper and lowercase
         let nameB = b.name.toUpperCase(); // ignore upper and lowercase
         if (nameA < nameB) {
           return -1;
         }
         if (nameA > nameB) {
           return 1;
         }
         // names must be equal
         return 0;
       });
      res.render('contacts/index', {
        title: 'Contacts',
        contacts: contacts
      });
    }
  });

});



//  GET the contact Details page in order to add a new contact
router.get('/add', requireAuth,  (req, res, next) => {

   res.render('contacts/details', {
    title: "Add a new contact",
    contacts: '',
});
});

// POST process the contact Details page and create a new contact - CREATE
router.post('/add', requireAuth,  (req, res, next) => {

    let newcontact = contact({
      "Name": req.body.name,
      "PhoneNum": req.body.PhoneNum,
      "Email": req.body.Email
  });
      contact.create(newcontact, (err, contact) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/contacts');
      }
    });
});

// GET the contact Details page in order to edit an existing contact
router.get('/:id', requireAuth, (req, res, next) => {
try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one game by its id
      contact.findById(id, (err, contacts) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the contacts details view
          res.render('contacts/details', {
              title: 'Contact Details',
              contacts: contacts,
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth,  (req, res, next) => {
// get a reference to the id from the url
    let id = req.params.id;

     let updatedcontact = contact({
       "_id": id,
      "Name": req.body.name,
      "PhoneNum": req.body.PhoneNum,
      "Email": req.body.Email
    });

    contact.update({_id: id}, updatedcontact, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the contact List
        res.redirect('/contacts');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
// get a reference to the id from the url
    let id = req.params.id;

    contact.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the contact list
        res.redirect('/contacts');
      }
    });
});


module.exports = router;
