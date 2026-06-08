import React from 'react';
import { Check, Pencil, Star, Sparkles } from 'lucide-react';

export function CreativePricing({
  tag = "Simple Pricing",
  title = "Choose Your Momentum",
  description = "Connect, collaborate, and build the future together",
  tiers
}) {
  return (
    <div className="pm-creative-pricing-container">
      <div className="pm-pricing-header-handwritten">
        <div className="pm-pricing-tag">
          {tag}
        </div>
        <div className="pm-pricing-title-wrap">
          <h2 className="pm-pricing-title-handwritten">
            {title}
            <div className="pm-title-sparkle-right" aria-hidden="true">
              ✨
            </div>
            <div className="pm-title-star-left" aria-hidden="true">
              ⭐️
            </div>
          </h2>
          <div className="pm-title-underline-glow" aria-hidden="true" />
        </div>
        <p className="pm-pricing-description-handwritten">
          {description}
        </p>
      </div>

      <div className="pm-pricing-neobrutalist-grid">
        {tiers.map((tier, index) => {
          return (
            <div
              key={tier.name}
              className="pm-neobrutalist-card-wrapper"
            >
              {/* Neobrutalist background shadow */}
              <div className="pm-neobrutalist-card-shadow" />

              <div className="pm-neobrutalist-card-content">
                {tier.popular && (
                  <div className="pm-neobrutalist-popular-badge">
                    Popular!
                  </div>
                )}

                <div className="pm-card-top-section">
                  <div className={`pm-card-icon-container pm-color-${tier.color}`}>
                    {tier.icon}
                  </div>
                  <h3 className="pm-card-tier-name">
                    {tier.name}
                  </h3>
                  <p className="pm-card-tier-desc">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="pm-card-price-section">
                  <span className="pm-price-amount">
                    ${tier.price}
                  </span>
                  <span className="pm-price-period">
                    /month
                  </span>
                </div>

                {/* Features */}
                <div className="pm-card-features-list">
                  {tier.features.map((feature) => (
                    <div
                      key={feature}
                      className="pm-feature-item"
                    >
                      <div className="pm-feature-check-icon">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="pm-feature-text">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`pm-neobrutalist-btn ${tier.popular ? 'pm-btn-popular' : 'pm-btn-standard'}`}
                >
                  Get Started
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
