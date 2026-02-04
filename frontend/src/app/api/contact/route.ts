
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // 1. Input Validation & Security Limits
        if (!name || !email || !message) {
            return NextResponse.json(
                { message: 'Name, email, and message are required.' },
                { status: 400 }
            );
        }

        if (name.length > 100) return NextResponse.json({ message: 'Name too long.' }, { status: 400 });
        if (subject && subject.length > 200) return NextResponse.json({ message: 'Subject too long.' }, { status: 400 });
        if (message.length > 5000) return NextResponse.json({ message: 'Message too long.' }, { status: 400 });

        // Helper: Basic HTML escaping to prevent injection in email body
        const escapeHtml = (str: string) => {
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        const safeName = escapeHtml(name);
        const safeSubject = subject ? escapeHtml(subject) : 'New Inquiry';
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        // 2. Configure Transporter (Gmail default, but works with any SMTP)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER, // e.g. nanda.pandu5@gmail.com
                pass: process.env.SMTP_PASS, // App Password
            },
        });

        // 3. Email Content (Admin Notification)
        const mailOptionsFn = {
            from: process.env.SMTP_USER,
            to: process.env.TARGET_EMAIL || process.env.SMTP_USER, // Send to Target or Self
            subject: `Portfolio Contact: ${safeSubject}`,
            html: `
                <h3>New Message from Portfolio</h3>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <div style="background:#f4f4f4; padding:15px; border-radius:5px;">
                    <p><strong>Message:</strong></p>
                    <p>${safeMessage}</p>
                </div>
            `,
            replyTo: email,
        };

        // 4. Send Email
        await transporter.sendMail(mailOptionsFn);

        // 5. Auto-Reply (Optional but nice)
        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: 'Thank you for contacting Nanda Kishore',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                        <p>Dear ${name},</p>
                        <p>Thank you for reaching out. I have received your message and will review it shortly.</p>
                        <br>
                        <p>Best regards,</p>
                        <p><strong>Nanda Kishore</strong><br>Senior Cloud Solution Architect</p>
                    </div>
                `
            });
        } catch (replyError) {
            console.error("Auto-reply failed:", replyError);
            // Don't fail the main request if auto-reply fails
        }

        return NextResponse.json(
            { message: 'Transmission received. Secure channel established.' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { message: 'Failed to transmit message.' },
            { status: 500 }
        );
    }
}
