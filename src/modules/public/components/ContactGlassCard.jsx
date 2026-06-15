export function ContactGlassCard() {
  return (
    <div className="pm-contact-card-3d" aria-label="Contact information">
      <div className="pm-contact-card-3d__card">
        <div className="pm-contact-card-3d__logo" aria-hidden="true">
          <span className="pm-contact-card-3d__circle pm-contact-card-3d__circle--1" />
          <span className="pm-contact-card-3d__circle pm-contact-card-3d__circle--2" />
          <span className="pm-contact-card-3d__circle pm-contact-card-3d__circle--3" />
          <span className="pm-contact-card-3d__circle pm-contact-card-3d__circle--4" />
          <span className="pm-contact-card-3d__circle pm-contact-card-3d__circle--5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="pm-contact-card-3d__icon" aria-hidden="true">
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
          </span>
        </div>

        <div className="pm-contact-card-3d__glass" aria-hidden="true" />

        <div className="pm-contact-card-3d__content">
          <span className="pm-contact-card-3d__title">Contact us</span>
          <span className="pm-contact-card-3d__text">
            Questions about Tinder for Nerds? Reach out anytime — we typically respond within 24 hours.
          </span>
          <a className="pm-contact-card-3d__email" href="mailto:tinderfornerds@gmail.com">
            tinderfornerds@gmail.com
          </a>
        </div>

        <div className="pm-contact-card-3d__bottom">
          <a className="pm-contact-card-3d__cta" href="mailto:tinderfornerds@gmail.com">
            <span>Send email</span>
            <svg className="pm-contact-card-3d__cta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
