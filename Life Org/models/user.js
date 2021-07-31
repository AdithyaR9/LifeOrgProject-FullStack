const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String
    },
    password: {
        type: String
    },

        budget: {
            income: {
                type: Number,
                default: 1000
            },
            savings: {
                type: Number,
                default: 10
            },
            groceries: {
                type: Number,
                default: 12
            },
            utilities: {
                type: Number,
                default: 15
            },
            missallaneous: {
                type: Number,
                default: 5
            }
        },
        financesWorth: {
            netWorth: {
                type: Number,
                default: 0
            }
        },

    toDo: [String],

        basic: {
            age: {
                type: Number,
                default: 25
            },
            gender: {
                type: String,
                enum: ["male", "female"],
                default: "male"
            },
            height: {
                type: Number,
                default: 72
            },
            weight: {
                type: Number,
                default: 175
            }
        },
        vitals: {
            heartRate: {
                type: Number,
                default: 80
            },
            systolic: {
                type: Number,
                default: 120
            },
            dystolic: {
                type: Number,
                default: 80
            }
            
        }
    

});

const User = mongoose.model('User', userSchema);

module.exports = User;