const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
    token: { 
        type: String, 
        required: true,
        unique: true 
    },
    createdAt: { 
        type: Date, 
        expires: 86400, 
        default: Date.now 
    } // 24 hours expiry
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
