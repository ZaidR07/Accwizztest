import express from 'express';
import nodemailer from 'nodemailer';
import { LoginModel } from '../models/Login.js';
import { randomInt } from 'crypto';



const Loginrouter = express.Router();
let globalOtp = null;



Loginrouter.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {

        const admin = await LoginModel.findOne({ username });
        if (admin && admin.password === password) {
            return res.json({
                status: true,
                message: "Login Succesfull",
                admin : admin.username,
            });
        } else {
            return res.json({
                status: false,
                message: "Login Unsuccesfull"
            });
        }

    }
    catch (error) {
        console.error("Error in Login:", error);
        return res.status(500).json({ message: "Error in Login " });
    }
})

Loginrouter.post('/Forgot_password', async (req, res) => {
    const { username } = req.body;
    const otp = randomInt(100000, 1000000)

    try {
        const user = await LoginModel.findOne({ username });
        if (!user) {
            return res.json({ message: "Invalid User" })
        }


        user.resetPasswordOTP = {
            otp,
            timestamp: Date.now()
        };
        await user.save();


        setTimeout(async () => {
            user.resetPasswordOTP = undefined;
            await user.save();
            console.log("OTP expired for user:", user.username);
        }, 60000);

        globalOtp = otp;


        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'zaidstudy342@gmail.com',
                pass: 'uist aurq lwod izrb',
            }
        });

        var mailOptions = {
            from: 'zaidstudy342@gmail.com',
            to: username,
            subject: 'Reset Password',
            text: `Your OTP to reset password is ${otp}`,
        };


        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ status: true, message: "Email Sent Succesfully" })
            }
        });
    }
    catch (err) {
        console.log(err);
    }



})
Loginrouter.post('/SetNewpassword', async (req, res) => {
    const { username, otp, newpass } = req.body;
    if (otp == globalOtp) {
        try {

            const user = await LoginModel.findOne({ username });


            user.password = newpass;

            await user.save();

            return res.json({ message: "Password updated successfully" });
        }
        catch (error) {
            console.error("Error updating password:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    else {
        return res.json({ message: "Invalid OTP" });
    }
});

export { Loginrouter };

