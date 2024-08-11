const nodemailer = require("nodemailer");
const mongoose = require('mongoose');

const senderEmail = "zain.rehman155@gmail.com";
const senderName = "MyCompanyName";
const receiverEmail = "zain.rehman155@gmail.com";

const Canidid = require('../Models/candidate')


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "zain.rehman155@gmail.com",
        pass: "ykei lded iizl bzlg", //app password
    },
});

const sendEmail = async (item, templateType) => {
    const info = await transporter.sendMail({
        from: `${senderName} <${senderEmail}>`, // sender address
        to: receiverEmail, // list of receivers
        subject: renderEmailSubject(templateType), // Subject line
        // text: "Hello world?", // plain text body
        html: await renderHTMLTemplate(item, templateType), // html body
    });
    console.log("Message sent:", info.messageId);
}

const renderHTMLTemplate = async (item, templateType) => {
    // for offer letter template is 2

    const target = await Canidid.findOne(new mongoose.Types.ObjectId(item.allowance_for))


    let templateStr = "";

    if (templateType == 2) {
        let makeListOfOffers = [];

        for (const key in item) {

            if (Object.prototype.hasOwnProperty.call(item, key)) {

                const element = item[key];

                if (element != "") {
                    if (key == "_id" || key == "allowance_for" || key == "allowance_for"
                        || key == "allowance_for" || key == "is_offer_letter_submit" ||
                        key == "offer_letter_status"
                    ) {
                        continue;
                    }
                    makeListOfOffers.push({
                        key: key,
                        value: element
                    })
                }

            }
        }

        templateStr = `<h3>Dear ${target.full_name},</h3>
    <p style="padding-left:50px; font-size:1rem">
    We are pleased to offer you a job as a ${target.designation} at our CompanyName. We think that your experience and skills will be a valuable asset to our company.If you are to accept this offer you will be eligible to the following in accordance to our company’s policies:
    </p>
    <ul style="padding-left:150px font-size:1rem">
      ${makeListOfOffers.map(list=>{
        return(
            `<li>${list.key}: ${list.value}</li>`
        )
      })}
    </ul>
    <p style="font-size:1rem">Your expected joining date will be the ${target.joining_date}.</p>
    <p style="font-size:1rem">To accept this offer, sign and date this letter as indicated below and email it back to us by within 2 days.

We look forward to welcoming you to our team. Feel free to call if you have any questions or concerns.

</p>`
    }

    return templateStr;

}

const renderEmailSubject = (templateType) => {
    subjectStr = "";

    if (templateType == 2) {

        subjectStr = "Job Offer Letter"

    } else if (templateType == 1) {

        subjectStr = "InterView Schedule"
    }

    return subjectStr;
}



exports.sendEmail = sendEmail;