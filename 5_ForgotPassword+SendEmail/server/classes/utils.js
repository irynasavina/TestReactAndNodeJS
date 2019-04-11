const crypto = require('crypto');

cryptoData = function(data) {
    return crypto.createHash('md5').update(data).digest("hex");
}

exports.cryptoData = cryptoData;