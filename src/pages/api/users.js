// pages/api/users.js
import pool from '../../lib/mysql';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, query } = req.body;

      // Save to MySQL
      const [result] = await pool.query(
        'INSERT INTO users (name, email, query) VALUES (?, ?, ?)',
        [name, email, query]
      );

      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Query Submission Confirmation',
        text: `Dear ${name},\n\nThank you for your query: \n\n${query}\n\nWe'll get back to you soon!`,
        html: `<p>Dear ${name},</p><p>Thank you for your query:</p><p>${query}</p><p>We'll get back to you soon!</p>`,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({
        success: true,
        data: { id: result.insertId, name, email, query },
      });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      const [rows] = await pool.query('SELECT * FROM users');
      res.status(200).json({ success: true, data: rows });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}