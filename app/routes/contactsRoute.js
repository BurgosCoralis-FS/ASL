const router = require('express').Router();
const { 
    getContacts, 
    contactById, 
    createContact, 
    updateContact } = require('../controller/contactsController')

//get all contacts
router.get('/', getContacts);

//get contact by id
router.get('/:id', contactById)

//create contact
router.post('/', createContact)

//update contact
router.put('/:id', updateContact)

module.exports = router;