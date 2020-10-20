const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    contact: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ]
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;