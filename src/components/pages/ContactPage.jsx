import { useState } from 'react';
import { Button } from '../ui';
import '../../styles/contact.css';

export function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', form);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="pm-contact-page">
      <section className="pm-contact-hero">
        <h1>Get in touch</h1>
        <p>Have questions? We'd love to hear from you.</p>
      </section>

      <div className="pm-contact-container">
        <div className="pm-contact-info">
          <h2>Contact information</h2>
          
          <div className="pm-info-item">
            <h3>Email</h3>
            <a href="mailto:hello@promatch.app">hello@promatch.app</a>
          </div>

          <div className="pm-info-item">
            <h3>Social</h3>
            <div className="pm-social-links">
              <a href="#">Twitter</a>
              <a href="#">LinkedIn</a>
              <a href="#">Discord</a>
            </div>
          </div>

          <div className="pm-info-item">
            <h3>Response time</h3>
            <p>We typically respond within 24 hours</p>
          </div>
        </div>

        <form className="pm-contact-form" onSubmit={handleSubmit}>
          <h2>Send us a message</h2>

          <div className="pm-form-group">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="pm-form-input"
            />
          </div>

          <div className="pm-form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="pm-form-input"
            />
          </div>

          <div className="pm-form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="pm-form-input"
            />
          </div>

          <div className="pm-form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="6"
              className="pm-form-textarea"
            ></textarea>
          </div>

          <Button variant="primary" size="lg">
            Send message
          </Button>
        </form>
      </div>
    </div>
  );
}
