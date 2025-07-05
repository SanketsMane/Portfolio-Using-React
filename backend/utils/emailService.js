import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email function
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const transporter = createTransporter();

    // Verify connection
    await transporter.verify();

    const mailOptions = {
      from: {
        name: 'Sanket Mane Portfolio',
        address: process.env.EMAIL_USER
      },
      to,
      subject,
      text,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };

  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send contact form notification
export const sendContactNotification = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field label {
          font-weight: bold;
          color: #555;
          display: block;
          margin-bottom: 5px;
        }
        .field value {
          background: white;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ddd;
          display: block;
          width: 100%;
        }
        .message-content {
          background: white;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #667eea;
          margin-top: 10px;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 12px;
        }
        .button {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>💌 New Contact Form Submission</h1>
        <p>You have received a new message from your portfolio website</p>
      </div>
      
      <div class="content">
        <div class="field">
          <label>👤 Name:</label>
          <div class="field-value">${name}</div>
        </div>
        
        <div class="field">
          <label>📧 Email:</label>
          <div class="field-value">${email}</div>
        </div>
        
        <div class="field">
          <label>📝 Subject:</label>
          <div class="field-value">${subject}</div>
        </div>
        
        <div class="field">
          <label>💬 Message:</label>
          <div class="message-content">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="text-align: center;">
          <a href="mailto:${email}" class="button">Reply to ${name}</a>
        </div>
      </div>
      
      <div class="footer">
        <p>📅 Received on: ${new Date().toLocaleString()}</p>
        <p>🌐 Portfolio Website Contact Form</p>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: process.env.EMAIL_USER,
    subject: `🚀 New Contact: ${subject}`,
    html
  });
};

// Send auto-reply to contact form submitter
export const sendAutoReply = async (contactData) => {
  const { name, email, subject, message } = contactData;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Message</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 0 0 10px 10px;
        }
        .message-box {
          background: white;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          color: #666;
          font-size: 12px;
        }
        .social-links {
          margin-top: 20px;
        }
        .social-links a {
          color: #667eea;
          text-decoration: none;
          margin: 0 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🙏 Thank You, ${name}!</h1>
        <p>I've received your message and will get back to you soon</p>
      </div>
      
      <div class="content">
        <p>Hi ${name},</p>
        
        <p>Thank you for reaching out! I appreciate you taking the time to contact me through my portfolio website.</p>
        
        <div class="message-box">
          <h3>📩 Your Message:</h3>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <p>I'll review your message and get back to you as soon as possible, typically within 24-48 hours.</p>
        
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>🔗 Connect with me on <a href="https://linkedin.com/in/sanket-mane-b16a35238" target="_blank">LinkedIn</a></li>
          <li>🚀 Check out my projects on <a href="https://github.com/SanketsMane" target="_blank">GitHub</a></li>
          <li>📱 Follow me on social media for updates</li>
        </ul>
        
        <p>Best regards,<br>
        <strong>Sanket Mane</strong><br>
        Full Stack Developer</p>
        
        <div class="social-links">
          <a href="https://linkedin.com/in/sanket-mane-b16a35238" target="_blank">LinkedIn</a>
          <a href="https://github.com/SanketsMane" target="_blank">GitHub</a>
          <a href="mailto:contactsanket1@gmail.com">Email</a>
        </div>
      </div>
      
      <div class="footer">
        <p>📧 This is an automated response. Please do not reply to this email.</p>
        <p>💻 Sent from Sanket Mane's Portfolio Website</p>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: email,
    subject: `✅ Thank you for contacting me, ${name}!`,
    html
  });
};

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email configuration is valid');
    return true;
  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return false;
  }
};

export default {
  sendEmail,
  sendContactNotification,
  sendAutoReply,
  testEmailConfig
};
