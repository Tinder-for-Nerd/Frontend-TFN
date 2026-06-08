import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Icon, Badge } from '../../../components/ui';

export function HostEventPage({ variant = 'student' }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    format: 'Virtual',
    domain: 'Product',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    duration: '60',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    summary: '',
    description: '',
    capacity: '100',
    ticketType: 'Free',
    ticketPrice: '',
    venue: '',
    address: '',
    city: '',
    meetingLink: '',
    hostName: '',
    hostEmail: '',
    hostPhone: '',
    coHosts: '',
    tags: [],
    visibility: 'Public',
    ageRestriction: 'None',
    language: 'English',
    socialShare: true,
    recordSession: false,
    autoReminders: true,
    agenda: ['', '', ''],
  });
  const [currentTag, setCurrentTag] = useState('');

  usePageMeta(
    'Host an Event | Tinder for Nerds',
    'Create and host your own community event on Tinder for Nerds.'
  );

  const handleAgendaChange = (index, value) => {
    const newAgenda = [...formData.agenda];
    newAgenda[index] = value;
    setFormData({ ...formData, agenda: newAgenda });
  };

  const addAgendaItem = () => {
    setFormData({ ...formData, agenda: [...formData.agenda, ''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    alert('Event created successfully! It will appear in the feed once verified.');
    navigate(`/${variant}/events`);
  };

  return (
    <AppShell 
      variant={variant} 
      title="Host an Event"
      subtitle="Share your knowledge with the community"
    >
      <div className="pm-host-page">
        <div className="pm-two-column">
          <div className="pm-host-form-container">
            <form className="pm-panel pm-host-form" onSubmit={handleSubmit}>
              <h2 className="pm-subheading">Event Details</h2>
              
              <div className="pm-form-group">
                <label>Event Title</label>
                <input 
                  type="text" 
                  className="pm-input" 
                  placeholder="e.g. Founder Coffee Chat"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Format</label>
                  <select 
                    className="pm-input"
                    value={formData.format}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                  >
                    <option>Virtual</option>
                    <option>In-person</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label>Primary Domain</label>
                  <select 
                    className="pm-input"
                    value={formData.domain}
                    onChange={(e) => setFormData({...formData, domain: e.target.value})}
                  >
                    <option>Product</option>
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Strategy</option>
                  </select>
                </div>
              </div>

              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Date</label>
                  <input 
                    type="date" 
                    className="pm-input"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="pm-form-group">
                  <label>Time</label>
                  <input 
                    type="time" 
                    className="pm-input"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="pm-form-group">
                <label>Short Summary <span style={{color:'var(--error)',fontWeight:400}}>*</span></label>
                <textarea 
                  className="pm-input" 
                  placeholder="Brief one-line summary (shown in event cards)"
                  rows={2}
                  maxLength={200}
                  value={formData.summary}
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  required
                />
                <span style={{fontSize:'11px',color:'var(--text-tertiary)',textAlign:'right'}}>{formData.summary.length}/200</span>
              </div>

              <div className="pm-form-group">
                <label>Full Description</label>
                <textarea 
                  className="pm-input" 
                  placeholder="Detailed description: rules, eligibility, what attendees will learn, prerequisites, etc."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="pm-form-group">
                <label>Event Banner</label>
                <div className="pm-upload-zone">
                  <Icon name="chart" size={32} style={{ opacity: 0.3 }} />
                  <div>
                    <strong>Upload a banner image</strong>
                    <span>JPG, PNG or WebP · Recommended 1200×400px · Max 5MB</span>
                  </div>
                  <input type="file" className="pm-file-input" accept="image/jpeg,image/png,image/webp" />
                </div>
              </div>

              {/* ── Duration & Timezone ── */}
              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Schedule Details</h2>
              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>End Date</label>
                  <input type="date" className="pm-input" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} />
                </div>
                <div className="pm-form-group">
                  <label>End Time</label>
                  <input type="time" className="pm-input" value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} />
                </div>
              </div>
              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Duration (minutes)</label>
                  <select className="pm-input" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}>
                    <option value="30">30 min</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                    <option value="180">3 hours</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label>Timezone</label>
                  <select className="pm-input" value={formData.timezone} onChange={(e) => setFormData({...formData, timezone: e.target.value})}>
                    <option>Asia/Kolkata</option>
                    <option>America/New_York</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Asia/Singapore</option>
                    <option>Australia/Sydney</option>
                  </select>
                </div>
              </div>

              {/* ── Venue / Meeting Link ── */}
              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>
                {formData.format === 'Virtual' ? 'Meeting Details' : 'Venue Details'}
              </h2>
              {formData.format === 'Virtual' ? (
                <div className="pm-form-group">
                  <label>Meeting Link (Zoom, Google Meet, etc.)</label>
                  <input type="url" className="pm-input" placeholder="https://meet.google.com/abc-defg-hij" value={formData.meetingLink} onChange={(e) => setFormData({...formData, meetingLink: e.target.value})} />
                  <span style={{fontSize:'11px',color:'var(--text-tertiary)'}}>Link will be shared with registered attendees only</span>
                </div>
              ) : (
                <>
                  <div className="pm-form-group">
                    <label>Venue Name <span style={{color:'var(--error)',fontWeight:400}}>*</span></label>
                    <input type="text" className="pm-input" placeholder="e.g. WeWork Galaxy, Residency Road" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} />
                  </div>
                  <div className="pm-form-row">
                    <div className="pm-form-group">
                      <label>Full Address</label>
                      <input type="text" className="pm-input" placeholder="Street address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    </div>
                    <div className="pm-form-group">
                      <label>City</label>
                      <input type="text" className="pm-input" placeholder="e.g. Bengaluru" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    </div>
                  </div>
                </>
              )}

              {/* ── Capacity & Tickets ── */}
              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Capacity & Tickets</h2>
              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Max Attendees</label>
                  <input type="number" className="pm-input" min="1" max="10000" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                </div>
                <div className="pm-form-group">
                  <label>Ticket Type</label>
                  <select className="pm-input" value={formData.ticketType} onChange={(e) => setFormData({...formData, ticketType: e.target.value})}>
                    <option>Free</option>
                    <option>Paid</option>
                    <option>Donation-based</option>
                  </select>
                </div>
              </div>
              {formData.ticketType === 'Paid' && (
                <div className="pm-form-group">
                  <label>Ticket Price (₹)</label>
                  <input type="number" className="pm-input" min="0" placeholder="499" value={formData.ticketPrice} onChange={(e) => setFormData({...formData, ticketPrice: e.target.value})} />
                </div>
              )}

              {/* ── Host Information ── */}
              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Host Information</h2>
              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Host Name <span style={{color:'var(--error)',fontWeight:400}}>*</span></label>
                  <input type="text" className="pm-input" placeholder="Your full name" value={formData.hostName} onChange={(e) => setFormData({...formData, hostName: e.target.value})} required />
                </div>
                <div className="pm-form-group">
                  <label>Contact Email <span style={{color:'var(--error)',fontWeight:400}}>*</span></label>
                  <input type="email" className="pm-input" placeholder="host@example.com" value={formData.hostEmail} onChange={(e) => setFormData({...formData, hostEmail: e.target.value})} required />
                </div>
              </div>
              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Phone (optional)</label>
                  <input type="tel" className="pm-input" placeholder="+91 9876543210" value={formData.hostPhone} onChange={(e) => setFormData({...formData, hostPhone: e.target.value})} />
                </div>
                <div className="pm-form-group">
                  <label>Co-hosts (comma separated)</label>
                  <input type="text" className="pm-input" placeholder="name1, name2" value={formData.coHosts} onChange={(e) => setFormData({...formData, coHosts: e.target.value})} />
                </div>
              </div>

              {/* ── Tags ── */}
              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Tags & Discovery</h2>
              <div className="pm-form-group">
                <label>Tags (press Enter to add)</label>
                <input type="text" className="pm-input" placeholder="e.g. AI, Hackathon, Networking" value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && currentTag.trim()) { e.preventDefault(); if (!formData.tags.includes(currentTag.trim())) setFormData({...formData, tags: [...formData.tags, currentTag.trim()]}); setCurrentTag(''); }}}
                />
                {formData.tags.length > 0 && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginTop:'8px'}}>
                    {formData.tags.map(tag => (
                      <span key={tag} style={{padding:'4px 10px',background:'var(--brand-teal-subtle)',color:'var(--brand-teal)',borderRadius:'16px',fontSize:'12px',fontWeight:600,display:'flex',alignItems:'center',gap:'6px'}}>
                        {tag}
                        <button type="button" onClick={() => setFormData({...formData, tags: formData.tags.filter(t => t !== tag)})} style={{background:'none',border:'none',cursor:'pointer',color:'inherit',fontSize:'14px',lineHeight:1}}>×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="pm-form-row">
                <div className="pm-form-group">
                  <label>Visibility</label>
                  <select className="pm-input" value={formData.visibility} onChange={(e) => setFormData({...formData, visibility: e.target.value})}>
                    <option>Public</option>
                    <option>Invite Only</option>
                    <option>Unlisted</option>
                  </select>
                </div>
                <div className="pm-form-group">
                  <label>Language</label>
                  <select className="pm-input" value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})}>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Tamil</option>
                    <option>Telugu</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* ── Settings ── */}
              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Event Settings</h2>
              <div style={{display:'grid',gap:'14px'}}>
                <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',fontSize:'14px'}}>
                  <input type="checkbox" checked={formData.autoReminders} onChange={(e) => setFormData({...formData, autoReminders: e.target.checked})} style={{accentColor:'var(--brand-teal)'}} />
                  Send automatic reminders (24h and 1h before event)
                </label>
                <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',fontSize:'14px'}}>
                  <input type="checkbox" checked={formData.recordSession} onChange={(e) => setFormData({...formData, recordSession: e.target.checked})} style={{accentColor:'var(--brand-teal)'}} />
                  Record session and share replay with attendees
                </label>
                <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',fontSize:'14px'}}>
                  <input type="checkbox" checked={formData.socialShare} onChange={(e) => setFormData({...formData, socialShare: e.target.checked})} style={{accentColor:'var(--brand-teal)'}} />
                  Allow attendees to share event on social media
                </label>
              </div>

              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Agenda</h2>
              <div className="pm-agenda-inputs">
                {formData.agenda.map((item, idx) => (
                  <div key={idx} className="pm-agenda-input-row">
                    <span className="pm-agenda-index">{idx + 1}</span>
                    <input 
                      type="text" 
                      className="pm-input" 
                      placeholder="Agenda item description"
                      value={item}
                      onChange={(e) => handleAgendaChange(idx, e.target.value)}
                    />
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={addAgendaItem} type="button">
                  + Add agenda item
                </Button>
              </div>

              <h2 className="pm-subheading" style={{ marginTop: '32px' }}>Registration Questions</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Add questions you want attendees to answer when they RSVP.
              </p>
              <div className="pm-agenda-inputs">
                {formData.questions?.map((item, idx) => (
                  <div key={idx} className="pm-agenda-input-row">
                    <span className="pm-agenda-index">Q</span>
                    <input 
                      type="text" 
                      className="pm-input" 
                      placeholder="e.g. What is your experience level?"
                      value={item}
                      onChange={(e) => {
                        const newQs = [...formData.questions];
                        newQs[idx] = e.target.value;
                        setFormData({ ...formData, questions: newQs });
                      }}
                    />
                  </div>
                )) || (
                  <div className="pm-agenda-input-row">
                    <span className="pm-agenda-index">Q</span>
                    <input 
                      type="text" 
                      className="pm-input" 
                      placeholder="e.g. Why do you want to join?"
                      onChange={(e) => setFormData({ ...formData, questions: [e.target.value] })}
                    />
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFormData({ ...formData, questions: [...(formData.questions || []), ''] })} 
                  type="button"
                >
                  + Add question
                </Button>
              </div>

              <div className="pm-form-actions" style={{ marginTop: '40px' }}>
                <Button variant="primary" size="lg" type="submit" style={{ width: '100%' }}>
                  Create Event
                </Button>
                <Button variant="ghost" onClick={() => navigate(-1)} type="button" style={{ width: '100%', marginTop: '12px' }}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          <aside className="pm-host-sidebar">
            <div className="pm-panel pm-host-tip-card">
              <Icon name="spark" size={24} style={{ color: 'var(--brand-teal)', marginBottom: '16px' }} />
              <h3 className="pm-subheading">Hosting Tips</h3>
              <ul className="pm-tip-list">
                <li>
                  <strong>Be specific</strong>
                  <span>Events with a clear focus attract 2x more RSVPs.</span>
                </li>
                <li>
                  <strong>Time zones</strong>
                  <span>Virtual events are shown in attendee's local time.</span>
                </li>
                <li>
                  <strong>Add an agenda</strong>
                  <span>Structured events have 40% higher attendance.</span>
                </li>
                <li>
                  <strong>Banner image</strong>
                  <span>Events with banners get 3x more clicks in the feed.</span>
                </li>
              </ul>
            </div>

            <div className="pm-panel pm-host-tip-card" style={{ marginTop: '20px' }}>
              <h3 className="pm-subheading">Checklist</h3>
              <div className="pm-checklist">
                {[
                  { label: 'Event title', done: !!formData.title },
                  { label: 'Date & time', done: !!formData.date && !!formData.time },
                  { label: 'Description', done: !!formData.summary },
                  { label: 'Banner image', done: false },
                  { label: 'Host info', done: !!formData.hostName && !!formData.hostEmail },
                  { label: 'Agenda items', done: formData.agenda.some(a => a.trim()) },
                ].map(item => (
                  <div key={item.label} style={{display:'flex',alignItems:'center',gap:'10px',padding:'6px 0',fontSize:'13px'}}>
                    <span style={{width:'18px',height:'18px',borderRadius:'50%',display:'grid',placeItems:'center',background: item.done ? 'var(--brand-teal)' : 'var(--surface-container-high)',color:'#fff',fontSize:'10px',flexShrink:0}}>
                      {item.done ? '✓' : ''}
                    </span>
                    <span style={{color: item.done ? 'var(--text-primary)' : 'var(--text-tertiary)', textDecoration: item.done ? 'line-through' : 'none'}}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pm-panel pm-preview-card">
              <h3 className="pm-subheading">Preview</h3>
              <article className="pm-card pm-event-preview">
                <div className="pm-event-preview-img">
                  <Badge tone={formData.format === 'Virtual' ? 'teal' : 'violet'}>{formData.format}</Badge>
                  {formData.ticketType !== 'Free' && <Badge tone="amber" style={{marginLeft:'6px'}}>{formData.ticketType}</Badge>}
                </div>
                <div className="pm-event-preview-body">
                  <span className="pm-preview-date">{formData.date || 'TBD'} • {formData.time || '--:--'}</span>
                  <h4>{formData.title || 'Your Event Title'}</h4>
                  <p>{formData.summary || 'Your summary will appear here...'}</p>
                  {formData.tags.length > 0 && (
                    <div style={{display:'flex',gap:'4px',flexWrap:'wrap',marginTop:'8px'}}>
                      {formData.tags.slice(0,3).map(t => (
                        <span key={t} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'12px',background:'var(--surface-container-high)',color:'var(--text-secondary)'}}>{t}</span>
                      ))}
                    </div>
                  )}
                  <div style={{marginTop:'10px',fontSize:'11px',color:'var(--text-tertiary)',display:'flex',gap:'12px'}}>
                    <span>👤 {formData.hostName || 'Host TBD'}</span>
                    <span>👥 {formData.capacity} spots</span>
                  </div>
                </div>
              </article>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .pm-upload-zone {
          border: 2px dashed var(--outline-variant);
          border-radius: 12px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pm-upload-zone:hover {
          border-color: var(--brand-teal);
          background: var(--brand-teal-glow);
        }
        .pm-file-input {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }
        .pm-host-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        .pm-form-group {
          margin-bottom: 24px;
          display: grid;
          gap: 8px;
        }
        .pm-form-group label {
          font-weight: 700;
          font-size: 14px;
          color: var(--text-secondary);
        }
        .pm-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .pm-agenda-inputs {
          display: grid;
          gap: 12px;
        }
        .pm-agenda-input-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .pm-agenda-index {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          background: var(--brand-teal-glow);
          color: var(--brand-teal);
          border-radius: 50%;
          font-size: 12px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .pm-tip-list {
          display: grid;
          gap: 24px;
          margin-top: 20px;
        }
        .pm-tip-list li strong {
          display: block;
          margin-bottom: 4px;
        }
        .pm-tip-list li span {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .pm-event-preview {
          padding: 0;
          overflow: hidden;
          margin-top: 20px;
          opacity: 0.8;
        }
        .pm-event-preview-img {
          height: 100px;
          background: var(--brand-violet-glow);
          padding: 12px;
        }
        .pm-event-preview-body {
          padding: 16px;
        }
        .pm-preview-date {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--brand-teal);
        }
        .pm-event-preview-body h4 {
          margin: 8px 0;
          font-family: var(--font-display);
        }
        .pm-event-preview-body p {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 920px) {
          .pm-form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>
    </AppShell>
  );
}
