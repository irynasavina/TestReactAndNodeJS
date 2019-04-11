const email = require("emailjs/email");

const server = email.server.connect({
   user: "hotelnoreply72@gmail.com", 
   password:"Vjhlfcbr", 
   host: "smtp.gmail.com", 
   posrt: 465,
   ssl: true
});

sendEMail = function (to, subject, text) {
    return new Promise(async (resolve, reject) => {
        server.send({
            text: text, 
            from: "Mailer <hotelnoreply72@gmail.com>",
            to: to,
            subject: subject
            }, function(err, message) {
                if (!err) {
                    console.log(message)
                    resolve({ error: false });
                } else {
                    resolve({ error: true, err: err });
                }
            });
    });
}

exports.sendEMail = sendEMail;