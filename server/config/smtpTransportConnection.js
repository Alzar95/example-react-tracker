import nodemailer from 'nodemailer';
import transport from "nodemailer-smtp-transport";

export default function smtpTransportConnection() {
    return nodemailer.createTransport(transport({
        service: 'gmail',
        host: 'localhost:7000',
        auth: {
            user: 'developertest1007@gmail.com',
            pass: '67b1x4z5f'
        }
    }));
}