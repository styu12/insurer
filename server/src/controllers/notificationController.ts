import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import nodemailer from 'nodemailer';

export const notificationRoutes = async(server: FastifyInstance, options: FastifyPluginOptions)=> {

    interface NotificationEmailBody {
        to: string;
        subject: string;
        content: string;
    }
    server.post('/email', async (request, reply) => {
        const { to, subject, content } = request.body as NotificationEmailBody;

        const html = `<div>
                <h1>Insurer 메일이 도착했습니다.</h1>
                <h2>${subject}</h2>
                <p>본문: ${content}</p>
            </div>
        `;

        // 이메일 전송 설정
        const transporter = nodemailer.createTransport({
            service: 'naver',
            host: 'smtp.naver.com',  // SMTP 서버명
            port: 587,  // SMTP 포트
            auth: {
                user: process.env.NAVER_USER,
                pass: process.env.NAVER_PASS
            }
        });

        const mailOptions = {
            from: process.env.NAVER_EMAIL,
            to: to,
            subject: subject,
            html: html,
        };

        try {
            await transporter.sendMail(mailOptions);
            reply.send({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            reply.status(500).send({ success: false, message: 'Failed to send email', error: error });
        }
    });
}