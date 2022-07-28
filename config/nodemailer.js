const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
    
let mailOptions = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
       user : 'ijob.portal7@gmail.com',
       pass : 'rgohofdlpvvmzyxs'
    }
}


// setup mailer
let transporter = nodemailer.createTransport(mailOptions);

// render html templete
let renderTemplete = (data , relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname, '../views/' , relativePath),
        data,
        function(err , templete) {
            if(err) {
                console.log("Error in rendering templete" , err);
                return;
            }
            mailHtml = templete;
        }
    );
    return mailHtml;
}

module.exports = {
    transporter,
    renderTemplete
}