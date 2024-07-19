import 'dotenv/config';
import nodemailer from 'nodemailer';

export const sendEmail = ({email, name}: {email: string, name: string}) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'You have been referred!',
        text: `Hi ${name},\n\nYou have been referred!\n\nBest regards,\nReferral Team`
    };
    
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log('Error occureed', error);
        }
        else{
            console.log('Email sent : ', info.response);
        }
    });
};