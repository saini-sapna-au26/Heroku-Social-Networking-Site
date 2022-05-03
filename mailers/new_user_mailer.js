const nodeMailer = require('../config/nodemailer');

exports.newUser = (user) => {
    let htmlString = nodeMailer.renderTemplate({user: user}, '/new_user.ejs');
    nodeMailer.transporter.sendMail({
        from: 'kanhu.kcn@gmail.com',
        to: user.email,
        subject: 'Welcome to Fakebook!',
        html: htmlString
    }, (err, info) => {
        if(err){console.log('Error in sending mail', err); return;}
        console.log('Mail sent', info);
        return;
    })
}
