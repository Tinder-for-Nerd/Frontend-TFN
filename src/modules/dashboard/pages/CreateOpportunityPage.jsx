import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Icon, Badge, Chip } from '../../../components/ui';

export function CreateOpportunityPage({ variant = 'student' }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    orgName: "St.Joseph's college of Engineering",
    type: 'Hackathons & Coding Challenges',
    subtype: 'Online Coding Challenge',
    festival: '',
    website: 'https://',
    description: '',
    skills: [],
    minTeam: 1,
    maxTeam: 2,
    mode: 'Online',
    criteria: ['Everyone can apply'],
    restrictCollege: false,
    restrictGender: false,
  });

  const [currentSkill, setCurrentSkill] = useState('');

  usePageMeta(
    'Create Opportunity | Tinder for Nerds',
    'Post a new hackathon, coding challenge, or opportunity for the community.'
  );

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(currentSkill.trim())) {
        setFormData({ ...formData, skills: [...formData.skills, currentSkill.trim()] });
      }
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  const toggleCriteria = (item) => {
    if (item === 'Everyone can apply') {
      setFormData({ ...formData, criteria: ['Everyone can apply'] });
      return;
    }
    
    let newCriteria = formData.criteria.filter(c => c !== 'Everyone can apply');
    if (newCriteria.includes(item)) {
      newCriteria = newCriteria.filter(c => c !== item);
      if (newCriteria.length === 0) newCriteria = ['Everyone can apply'];
    } else {
      newCriteria.push(item);
    }
    setFormData({ ...formData, criteria: newCriteria });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Opportunity posted successfully!');
    navigate(`/${variant}/events`);
  };

  return (
    <AppShell 
      variant={variant} 
      title="Create Opportunity"
      subtitle="Hackathons, Challenges, and more"
    >
      <div className="pm-opp-page">
        <form className="pm-opp-form" onSubmit={handleSubmit}>
          <section className="pm-panel pm-opp-section">
            <h2 className="pm-subheading">Basic Details</h2>
            
            <div className="pm-form-group">
              <label>Add Logo *</label>
              <div className="pm-logo-upload">
                <div className="pm-logo-preview">
                  <Icon name="chart" size={32} />
                </div>
                <div className="pm-logo-info">
                  <Button variant="secondary" size="sm">Upload Logo</Button>
                  <span>Supported: JPG, JPEG, PNG. Max 1 MB</span>
                </div>
              </div>
            </div>

            <div className="pm-form-group">
              <label>Opportunity Title *</label>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Enter Opportunity Title"
                maxLength={190}
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <span className="pm-input-hint">{formData.title.length}/190 characters</span>
            </div>

            <div className="pm-form-row">
              <div className="pm-form-group">
                <label>Organisation Name *</label>
                <input 
                  type="text" 
                  className="pm-input" 
                  value={formData.orgName}
                  onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                  required
                />
              </div>
              <div className="pm-form-group">
                <label>Company Website URL</label>
                <input 
                  type="url" 
                  className="pm-input" 
                  value={formData.website}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                />
              </div>
            </div>

            <div className="pm-form-row">
              <div className="pm-form-group">
                <label>Opportunity Type *</label>
                <select 
                  className="pm-input"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>Hackathons & Coding Challenges</option>
                  <option>Internships</option>
                  <option>Jobs</option>
                </select>
              </div>
              <div className="pm-form-group">
                <label>Opportunity Sub-type *</label>
                <select 
                  className="pm-input"
                  value={formData.subtype}
                  onChange={(e) => setFormData({...formData, subtype: e.target.value})}
                >
                  <option>Online Coding Challenge</option>
                  <option>On-site Hackathon</option>
                  <option>Hybrid Challenge</option>
                </select>
              </div>
            </div>

            <div className="pm-form-group">
              <label>Link Festival/Campaign</label>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Enter Festival/campaign name"
                value={formData.festival}
                onChange={(e) => setFormData({...formData, festival: e.target.value})}
              />
            </div>
          </section>

          <section className="pm-panel pm-opp-section">
            <h2 className="pm-subheading">About the Opportunity</h2>
            <div className="pm-form-group">
              <label>Opportunity Description *</label>
              <div className="pm-textarea-wrapper">
                <textarea 
                  className="pm-input" 
                  rows={8}
                  placeholder="Include Rules, Eligibility, Process, Format, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                />
                <Button variant="ghost" size="sm" className="pm-ai-gen-btn" type="button">
                  <Icon name="spark" size={14} /> Generate with AI
                </Button>
              </div>
            </div>

            <div className="pm-form-group">
              <label>Skills to be assessed</label>
              <input 
                type="text" 
                className="pm-input" 
                placeholder="Example: Photoshop, MS Office, etc. (Press Enter to add)"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleAddSkill}
              />
              <div className="pm-skill-chips">
                {formData.skills.map(skill => (
                  <Chip key={skill} onRemove={() => removeSkill(skill)}>{skill}</Chip>
                ))}
              </div>
            </div>
          </section>

          <section className="pm-panel pm-opp-section">
            <h2 className="pm-subheading">Participation & Criteria</h2>
            
            <div className="pm-form-row">
              <div className="pm-form-group">
                <label>Min Team Size</label>
                <div className="pm-number-input">
                  <input type="number" value={formData.minTeam} readOnly />
                  <div className="pm-number-controls">
                    <button type="button" onClick={() => setFormData({...formData, minTeam: formData.minTeam + 1})}><Icon name="chevron-up" size={14} /></button>
                    <button type="button" onClick={() => setFormData({...formData, minTeam: Math.max(1, formData.minTeam - 1)})}><Icon name="chevron-down" size={14} /></button>
                  </div>
                </div>
              </div>
              <div className="pm-form-group">
                <label>Max Team Size</label>
                <div className="pm-number-input">
                  <input type="number" value={formData.maxTeam} readOnly />
                  <div className="pm-number-controls">
                    <button type="button" onClick={() => setFormData({...formData, maxTeam: formData.maxTeam + 1})}><Icon name="chevron-up" size={14} /></button>
                    <button type="button" onClick={() => setFormData({...formData, maxTeam: Math.max(1, formData.maxTeam - 1)})}><Icon name="chevron-down" size={14} /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pm-form-group">
              <label>Who can register?</label>
              <div className="pm-criteria-grid">
                {['Everyone can apply', 'College Students', 'Freshers', 'Professionals', 'School Students'].map(item => (
                  <label key={item} className="pm-criteria-card">
                    <input 
                      type="checkbox" 
                      checked={formData.criteria.includes(item)}
                      onChange={() => toggleCriteria(item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pm-restriction-list">
              <div className="pm-restriction-item">
                <div>
                  <strong>College/Organization</strong>
                  <p>{formData.restrictCollege ? 'Restricted to specific organizations' : 'Default: Everyone can apply'}</p>
                </div>
                <Button variant="ghost" size="sm" type="button">Change</Button>
              </div>
              <div className="pm-restriction-item">
                <div>
                  <strong>Gender</strong>
                  <p>{formData.restrictGender ? 'Restricted to specific genders' : 'Default: Everyone can apply'}</p>
                </div>
                <Button variant="ghost" size="sm" type="button">Change</Button>
              </div>
            </div>
            <div className="pm-form-group">
              <label>Registration Questions</label>
              <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                Define questions participants must answer during registration.
              </p>
              <div className="pm-agenda-inputs">
                {(formData.questions || ['']).map((item, idx) => (
                  <div key={idx} className="pm-agenda-input-row">
                    <span className="pm-agenda-index">Q</span>
                    <input 
                      type="text" 
                      className="pm-input" 
                      placeholder="e.g. Portfolio URL or GitHub profile"
                      value={item}
                      onChange={(e) => {
                        const newQs = [...(formData.questions || [''])];
                        newQs[idx] = e.target.value;
                        setFormData({ ...formData, questions: newQs });
                      }}
                    />
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFormData({ ...formData, questions: [...(formData.questions || ['']), ''] })} 
                  type="button"
                >
                  + Add question
                </Button>
              </div>
            </div>
          </section>

          <div className="pm-form-footer">
            <Button variant="ghost" type="button" onClick={() => navigate(-1)}>Save as Draft</Button>
            <Button variant="primary" size="lg" type="submit">Post Opportunity</Button>
          </div>
        </form>
      </div>

      <style>{`
        .pm-opp-page {
          max-width: 900px;
          margin: 0 auto;
        }
        .pm-opp-form {
          display: grid;
          gap: 24px;
        }
        .pm-opp-section {
          padding: 32px;
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
        .pm-logo-upload {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: var(--bg-base);
          border-radius: 16px;
          border: 1px dashed var(--border-subtle);
        }
        .pm-logo-preview {
          width: 64px;
          height: 64px;
          background: var(--surface-container-high);
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: var(--text-tertiary);
        }
        .pm-logo-info span {
          display: block;
          font-size: 12px;
          color: var(--text-tertiary);
          margin-top: 8px;
        }
        .pm-input-hint {
          font-size: 11px;
          color: var(--text-tertiary);
          text-align: right;
        }
        .pm-textarea-wrapper {
          position: relative;
        }
        .pm-ai-gen-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: var(--bg-surface) !important;
          border: 1px solid var(--border-subtle) !important;
          color: var(--brand-teal) !important;
        }
        .pm-skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .pm-number-input {
          display: flex;
          background: var(--bg-base);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          overflow: hidden;
          width: 120px;
        }
        .pm-number-input input {
          width: 60px;
          border: none;
          background: transparent;
          text-align: center;
          font-weight: 700;
          color: var(--text-primary);
        }
        .pm-number-controls {
          display: grid;
          border-left: 1px solid var(--border-subtle);
        }
        .pm-number-controls button {
          border: none;
          background: transparent;
          padding: 4px 12px;
          cursor: pointer;
          color: var(--text-secondary);
        }
        .pm-number-controls button:hover {
          background: var(--surface-container-high);
        }
        .pm-criteria-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .pm-criteria-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--bg-base);
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pm-criteria-card:has(input:checked) {
          border-color: var(--brand-teal);
          background: var(--brand-teal-glow);
        }
        .pm-criteria-card input {
          accent-color: var(--brand-teal);
        }
        .pm-restriction-list {
          margin-top: 32px;
          display: grid;
          gap: 16px;
        }
        .pm-restriction-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: var(--bg-base);
          border-radius: 16px;
        }
        .pm-restriction-item strong {
          display: block;
          font-size: 14px;
        }
        .pm-restriction-item p {
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 4px;
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
        .pm-form-footer {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding: 40px 0;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 640px) {
          .pm-form-row {
            grid-template-columns: 1fr;
          }
          .pm-criteria-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </AppShell>
  );
}
