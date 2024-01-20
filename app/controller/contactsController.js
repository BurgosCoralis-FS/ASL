const { ContactModel, sortContacts, filterContacts } = require("@jworkman-fs/asl/src/Model");
const Pager = require("@jworkman-fs/asl/src/Util/Pager");
const getContacts = async (req, res) => {
    try{
        const Contacts = await ContactModel.index();
        // console.log('contacts', Contacts)
        
        //filtering
        const by = req.get('X-Filter-By')
        const operator = req.get('X-Filter-Operator')
        const value = req.get('X-Filter-Value')
        const filtered = await filterContacts(by, operator, value)
        // console.log({
        //     by: by,
        //     operator: operator,
        //     value: value,
        //     filtered
        // })
        //     res.status(200).json(filtered)
        
        //sorting
        const sorted = await sortContacts(
            filtered, 
            req.query.sort, 
            req.query.direction)
            // console.log("sorted contacts", sorted)
            // res.status(200).json(sorted)

        //pagination
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const pager = new Pager( sorted, page, limit)
        res.set("X-Page-Total", pager.totalCount)
        res.set("X-Page-Next", pager.next())
        res.set("X-Page-Prev", pager.prev())
        // console.log("pager", pager)

        res.status(200).json(pager.results())
    }
    catch (error){
        console.log('contacts error', error)
        switch (typeof error) {
            case "ContactNotFoundError":
                return res.status(404).json({
                    message: error.message
                })
                break;
            case "DuplicateContactResourceError":
                return res.status(409).json({
                    message: error.message
                })
                break;
            case "InvalidContactError":
                return res.status(400).json({
                    message: error.message
                })
                break;
            case "InvalidContactFieldError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "InvalidContactSchemaError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "PagerOutOfRangeError":
                return res.status(416).json({
                    message: error.message
                })
                break;
            case "InvalidEnumError":
                return res.status(206).json({
                    message: error.message
                })
                break;
            case "PagerLimitExceededError":
                return res.status(429).json({
                    message: error.message
                })
                break;
            default:
                return res.status(500).json({
                    message: error.message
                })
                break;
        }
    }
}

//get contact by id
const contactById = async (req, res) => {
    try{
        const { id } = req.params;
        // console.log('id', id)
        const contact = await ContactModel.show(id)
        // console.log("contact by id", contact)
        res.status(200).json(contact)
    }
    catch (error){
        console.log('contacts error', error)
        switch (typeof error) {
            case "ContactNotFoundError":
                return res.status(404).json({
                    message: error.message
                })
                break;
            case "DuplicateContactResourceError":
                return res.status(409).json({
                    message: error.message
                })
                break;
            case "InvalidContactError":
                return res.status(400).json({
                    message: error.message
                })
                break;
            case "InvalidContactFieldError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "InvalidContactSchemaError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "PagerOutOfRangeError":
                return res.status(416).json({
                    message: error.message
                })
                break;
            case "InvalidEnumError":
                return res.status(206).json({
                    message: error.message
                })
                break;
            case "PagerLimitExceededError":
                return res.status(429).json({
                    message: error.message
                })
                break;
            default:
                return res.status(500).json({
                    message: error.message
                })
                break;
        }
    }
}

//create contact
const createContact = async (req, res) => {
    const { 
        fname,
        lname,
        birthday,
        phone,
        email
    } = req.body;

    try{
        const newContact = await ContactModel.create({
            fname,
            lname,
            birthday,
            phone,
            email
        })
        // console.log('newContact', newContact.id)
        res.status(303).location(`/v1/contacts/${newContact.id}`).json({
            message: 'Contact created',
            location: `/v1/contacts/${newContact.id}`
        })
    }catch(error) {
        switch (typeof error) {
            case "ContactNotFoundError":
                return res.status(404).json({
                    message: error.message
                })
                break;
            case "DuplicateContactResourceError":
                return res.status(409).json({
                    message: error.message
                })
                break;
            case "InvalidContactError":
                return res.status(400).json({
                    message: error.message
                })
                break;
            case "InvalidContactFieldError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "InvalidContactSchemaError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "PagerOutOfRangeError":
                return res.status(416).json({
                    message: error.message
                })
                break;
            case "InvalidEnumError":
                return res.status(206).json({
                    message: error.message
                })
                break;
            case "PagerLimitExceededError":
                return res.status(429).json({
                    message: error.message
                })
                break;
            default:
                return res.status(500).json({
                    message: error.message
                })
                break;
        }
    }
}

//update contact
const updateContact = async (req, res) => {
    try{
        const { id } = req.params;
        const { body } = req;
        // console.log("update id", id);
        // console.log("update body", body);
        const contact = await ContactModel.update(id, body)
        // console.log("update contact", contact)
        res.status(200).json(contact);
    }
    catch (error) {
        switch (typeof error) {
            case "ContactNotFoundError":
                return res.status(404).json({
                    message: error.message
                })
                break;
            case "DuplicateContactResourceError":
                return res.status(409).json({
                    message: error.message
                })
                break;
            case "InvalidContactError":
                return res.status(400).json({
                    message: error.message
                })
                break;
            case "InvalidContactFieldError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "InvalidContactSchemaError":
                return res.status(422).json({
                    message: error.message
                })
                break;
            case "PagerOutOfRangeError":
                return res.status(416).json({
                    message: error.message
                })
                break;
            case "InvalidEnumError":
                return res.status(206).json({
                    message: error.message
                })
                break;
            case "PagerLimitExceededError":
                return res.status(429).json({
                    message: error.message
                })
                break;
            default:
                return res.status(500).json({
                    message: error.message
                })
                break;
        }
    }
}

module.exports = { getContacts, contactById, createContact, updateContact }