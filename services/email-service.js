const nodemailer = require("../config/nodemailer");

class EmailService {
    setNewPassword(user, resetLink) {

      // this is another way of exporting a method
    
        let htmlString = nodemailer.renderTemplete(
          { resetLink: resetLink,
            userName:user.name },
        
          "/email-templete/set-password.ejs"
        );
  
        nodemailer.transporter.sendMail(
          {
            from: "contactijob1@gmail.com", // sender address
            to: user.email, // list of receivers
            subject: "set your password || iJOB", // Subject line
            // text: "Hello world?", // plain text body
            html: htmlString, // html body
          },
          (err, info) => {
            if (err) {
              console.log("error in seding email ", err);
              return;
            }
            console.log("Email sent");
            return;
          }
        );
    }
  }
  
  module.exports = new EmailService();
  