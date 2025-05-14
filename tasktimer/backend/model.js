const mongoose = require('mongoose');

const Tasks = new mongoose.Schema({
    task:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Tasks', Tasks); //exporting module