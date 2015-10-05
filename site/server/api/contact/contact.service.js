'use strict';

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'evtrs.mailservice@gmail.com',
        pass: 'evtrsSite*'
    }
});

exports.sendMessage = function (req, res) {

    var messageData = req.body;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: messageData.email,
        to: 'info@eventures.io',
        subject: messageData.subject,
        text: messageData.name + 'says: ' + messageData.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.json(500, error);
            console.log('error sending email message: ' + error);
        } else {
            //console.log('Message sent: ' + info.response);
            return res.json(200, 'message sent');
        }
    });
};


