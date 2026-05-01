import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { Button, Avatar, Chip, Icon, Badge } from '../../../components/ui';
import { Brand, SectionHeader } from '../../../components/common';
import { onboardingSteps, skillTags, domainTags, intentTags, workStyleTags, commitmentTags, socialTypes } from '../../../data/mockData';

export function OnboardingPage() {
  const { step = 'step-1' } = useParams();
  const navigate = useNavigate();
  const currentIndex = onboardingSteps.findIndex((item) => item.id === step);
  const isValidStep = currentIndex !== -1;

  const [role, setRole] = useState('student');
  const [name, setName] = useState('Alex Kumar');
  const [location, setLocation] = useState('Singapore | Open to remote opportunities');
  const [headline, setHeadline] = useState('Driving FinTech innovation with ML & front-end expertise');
  const [profilePic, setProfilePic] = useState('/src/assets/alex-kumar.png');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedIntents, setSelectedIntents] = useState(['Co-founder']);
  const [commitment, setCommitment] = useState('Flexible');
  const [workStyle, setWorkStyle] = useState('Hybrid');
  const [experience, setExperience] = useState(3);
  const [bio, setBio] = useState('Developing ML-powered FinTech apps to solve real-world problems. Passionate about building projects, collaborating with peers, and scaling solutions.');
  const [preferredSkills, setPreferredSkills] = useState(['React', 'ML']);
  const [preferredDomains, setPreferredDomains] = useState(['FinTech']);
  const [socialType, setSocialType] = useState('LinkedIn');
  const [socialUrl, setSocialUrl] = useState('https://linkedin.com/in/');

  usePageMeta('ProMatch | Onboarding', 'Complete the four-step ProMatch onboarding flow and prepare your profile for discovery.');

  if (!isValidStep) {
    return <Navigate to="/onboarding/step-1" replace />;
  }

  const toggleValue = (current, setter, value) => {
    setter((items) => (items.includes(value) ? items.filter((item) => item !== value) : [...items, value]));
  };

  const nextStep = onboardingSteps[currentIndex + 1]?.id;
  const prevStep = onboardingSteps[currentIndex - 1]?.id;

  const finishRoute = role === 'student' ? '/student/home' : '/pro/overview';

  return (
    <div className="pm-onboarding-shell">
      <div className="pm-onboarding-shell__glow pm-onboarding-shell__glow--one" />
      <div className="pm-onboarding-shell__glow pm-onboarding-shell__glow--two" />
      <div className="pm-onboarding-shell__grain" />
      <header className="pm-onboarding-header">
        <Brand compact />
        <div className="pm-onboarding-header__progress">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Step {currentIndex + 1} of 4</span>
            <strong>{onboardingSteps[currentIndex].label}</strong>
          </div>
          <div className="pm-progress-bar" aria-hidden="true">
            <span style={{ width: `${((currentIndex + 1) / onboardingSteps.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <main className="pm-onboarding-main">
        <aside className="pm-onboarding-preview pm-card">
          <p className="pm-kicker">Profile preview</p>
          <div className="pm-profile-preview">
            <Avatar name={name} initials="AK" src={profilePic} tone="teal" size="xl" />
            <div className="pm-profile-preview__info">
              <strong>{name}</strong>
              <span>{role === 'student' ? 'Student profile' : 'Professional profile'}</span>
            </div>
          </div>
          
          <div className="pm-preview-content">
            <p className="pm-preview-headline">{headline || 'Your headline will appear here'}</p>
            
            <div className="pm-badge-stack">
              {selectedSkills.length > 0 && (
                <div className="pm-badge-row">
                  {selectedSkills.slice(0, 4).map((item) => (
                    <Badge tone="violet" key={item}>{item}</Badge>
                  ))}
                </div>
              )}
              {selectedDomains.length > 0 && (
                <div className="pm-badge-row">
                  {selectedDomains.slice(0, 2).map((item) => (
                    <Badge tone="teal" key={item}>{item}</Badge>
                  ))}
                </div>
              )}
            </div>

            <p className="pm-preview-bio">{bio || 'Your bio will appear here to tell your story to other builders.'}</p>
          </div>
        </aside>

        <section className="pm-card pm-onboarding-card">
          {step === 'step-1' ? (
            <>
              <SectionHeader eyebrow="Step 1 of 4" title="Let's set up your profile" description="This is how other builders will find you." />
              <div className="pm-upload-zone" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                <Avatar name={name} initials="AK" src={profilePic} tone="teal" size="xl" />
                <div>
                  <strong>Upload photo</strong>
                  <p>Drag and drop or click to upload a profile image.</p>
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
                <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  Change
                </Button>
              </div>
              <div className="pm-form-grid">
                <label className="pm-field">
                  <span>Role</span>
                  <div className="pm-chip-row">
                    {['student', 'professional'].map((item) => (
                      <Chip key={item} tone="muted" active={role === item} onClick={() => setRole(item)}>
                        {item === 'student' ? 'Student' : 'Professional'}
                      </Chip>
                    ))}
                  </div>
                </label>
                <label className="pm-field">
                  <span>Full name</span>
                  <input className="pm-input" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label className="pm-field">
                  <span>City / location</span>
                  <input className="pm-input" value={location} onChange={(event) => setLocation(event.target.value)} />
                </label>
                <label className="pm-field">
                  <span>Headline</span>
                  <input className="pm-input" maxLength={80} value={headline} onChange={(event) => setHeadline(event.target.value)} />
                  <small>{headline.length}/80</small>
                </label>
              </div>
            </>
          ) : null}

          {step === 'step-2' ? (
            <>
              <SectionHeader eyebrow="Step 2 of 4" title="What do you bring to the table?" description="Add skills and domain so the matching feed can stay focused." />
              <div className="pm-chip-stack">
                <strong>Skills</strong>
                <div className="pm-chip-row">
                  {skillTags.map((item) => (
                    <Chip key={item} tone="muted" active={selectedSkills.includes(item)} onClick={() => toggleValue(selectedSkills, setSelectedSkills, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-chip-stack">
                <strong>Domain / industry</strong>
                <div className="pm-chip-row">
                  {domainTags.map((item) => (
                    <Chip key={item} tone="violet" active={selectedDomains.includes(item)} onClick={() => toggleValue(selectedDomains, setSelectedDomains, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <label className="pm-field">
                <span>Experience</span>
                <input className="pm-input" min="0" max="10" type="range" value={experience} onChange={(event) => setExperience(Number(event.target.value))} />
                <small>{experience} years of experience</small>
              </label>
            </>
          ) : null}

          {step === 'step-3' ? (
            <>
              <SectionHeader eyebrow="Step 3 of 4" title="What are you looking for?" description="Tell us who and how you want to work with." />
              <div className="pm-choice-grid">
                {intentTags.map((item) => (
                  <button
                    className={cx('pm-choice-card', selectedIntents.includes(item) && 'is-active')}
                    key={item}
                    type="button"
                    onClick={() => toggleValue(selectedIntents, setSelectedIntents, item)}
                  >
                    <strong>{item}</strong>
                    <span>{item === 'Co-founder' ? 'Build a company' : item === 'Tech collab' ? 'Project partner' : item === 'Advisor' ? 'Mentor or guide' : 'Experiment together'}</span>
                  </button>
                ))}
              </div>
              <div className="pm-chip-stack">
                <strong>Commitment</strong>
                <div className="pm-chip-row">
                  {commitmentTags.map((item) => (
                    <Chip key={item} tone="amber" active={commitment === item} onClick={() => setCommitment(item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <label className="pm-field">
                <span>Bio</span>
                <textarea className="pm-textarea" maxLength={280} rows={4} value={bio} onChange={(event) => setBio(event.target.value)} />
                <small>{bio.length}/280</small>
              </label>
            </>
          ) : null}

          {step === 'step-4' ? (
            <>
              <SectionHeader eyebrow="Step 4 of 4" title="Who do you want to meet?" description="Set the last few filters that guide the recommendation feed." />
              <div className="pm-chip-stack">
                <strong>Preferred skills</strong>
                <div className="pm-chip-row">
                  {skillTags.map((item) => (
                    <Chip key={item} tone="teal" active={preferredSkills.includes(item)} onClick={() => toggleValue(preferredSkills, setPreferredSkills, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-chip-stack">
                <strong>Preferred domain</strong>
                <div className="pm-chip-row">
                  {domainTags.slice(0, 6).map((item) => (
                    <Chip key={item} tone="violet" active={preferredDomains.includes(item)} onClick={() => toggleValue(preferredDomains, setPreferredDomains, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-chip-stack">
                <strong>Work style</strong>
                <div className="pm-chip-row">
                  {workStyleTags.map((item) => (
                    <Chip key={item} tone="muted" active={workStyle === item} onClick={() => setWorkStyle(item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-form-grid pm-form-grid--compact">
                <label className="pm-field">
                  <span>Social link</span>
                  <select className="pm-input" value={socialType} onChange={(event) => setSocialType(event.target.value)}>
                    {socialTypes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="pm-field">
                  <span>URL</span>
                  <input className="pm-input" value={socialUrl} onChange={(event) => setSocialUrl(event.target.value)} />
                </label>
              </div>
            </>
          ) : null}

          <div className="pm-form-actions">
            <Button to={prevStep ? `/onboarding/${prevStep}` : '/login'} variant="secondary">
              Back
            </Button>
            <Button
              to={nextStep ? `/onboarding/${nextStep}` : finishRoute}
              onClick={nextStep ? undefined : () => navigate(finishRoute)}
            >
              {nextStep ? 'Continue' : 'Finish and find matches'}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}