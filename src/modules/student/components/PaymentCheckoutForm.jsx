import { useState } from 'react';

function PayPalIcon() {
  return (
    <svg viewBox="0 0 124 33" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z"
        fill="#253B80"
      />
      <path
        d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
        fill="#253B80"
      />
      <path
        d="M23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132L6.596,26.83l-0.399,2.533c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622C24.022,8.286,23.573,7.945,23.048,7.667z"
        fill="#179BD7"
      />
    </svg>
  );
}

function ApplePayIcon() {
  return (
    <svg viewBox="0 0 512 210.2" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9C103.4,10,99.5,19.8,93.6,27.1 M102.3,40.9c-13.9-0.8-25.8,7.9-32.4,7.9c-6.7,0-16.8-7.5-27.8-7.3c-14.3,0.2-27.6,8.3-34.9,21.2c-15,25.8-3.9,64,10.6,85c7.1,10.4,15.6,21.8,26.8,21.4c10.6-0.4,14.8-6.9,27.6-6.9c12.9,0,16.6,6.9,27.8,6.7c11.6-0.2,18.9-10.4,26-20.8c8.1-11.8,11.4-23.3,11.6-23.9c-0.2-0.2-22.4-8.7-22.6-34.3c-0.2-21.4,17.5-31.6,18.3-32.2C123.3,42.9,107.7,41.3,102.3,40.9 M182.6,11.9v155.9h24.2v-53.3h33.5c30.6,0,52.1-21,52.1-51.4c0-30.4-21.1-51.2-51.3-51.2H182.6z M206.8,32.3h27.9c21,0,33,11.2,33,30.9c0,19.7-12,31-33.1,31h-27.8V32.3z" />
    </svg>
  );
}

function GooglePayIcon() {
  return (
    <svg fill="none" viewBox="0 0 80 39" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fill="#5F6368" d="M37.8 19.7V29H34.8V6H42.6C44.5 6 46.3 6.7 47.7 8C49.1 9.2 49.8 11 49.8 12.9C49.8 14.8 49.1 16.5 47.7 17.8C46.3 19.1 44.6 19.8 42.6 19.8L37.8 19.7Z" />
      <path fill="#4285F4" d="M25.9 17.7C25.9 16.8 25.8 15.9 25.7 15H13.2V20.1H20.3C20 21.7 19.1 23.2 17.7 24.1V27.4H22C24.5 25.1 25.9 21.7 25.9 17.7Z" />
      <path fill="#34A853" d="M13.2 30.6C16.8 30.6 19.8 29.4 22 27.4L17.7 24.1C16.5 24.9 15 25.4 13.2 25.4C9.8 25.4 6.8 23.1 5.8 19.9H1.4V23.3C3.7 27.8 8.2 30.6 13.2 30.6Z" />
      <path fill="#FBBC04" d="M5.8 19.9C5.2 18.3 5.2 16.5 5.8 14.8V11.4H1.4C-0.5 15.1 -0.5 19.5 1.4 23.3L5.8 19.9Z" />
      <path fill="#EA4335" d="M13.2 9.4C15.1 9.4 16.9 10.1 18.3 11.4L22.1 7.6C19.7 5.4 16.5 4.2 13.3 4.2C8.3 4.2 3.7 7 1.5 11.5L5.9 14.9C6.8 11.7 9.8 9.4 13.2 9.4Z" />
    </svg>
  );
}

export function PaymentCheckoutForm({ amount, currency = 'INR', onCheckout }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCheckout?.({
      method: selectedMethod,
      cardName,
      cardNumber,
      expiry,
      cvv,
      amount,
      currency,
    });
  };

  return (
    <div className="pm-billing-modal">
      <form className="pm-billing-form" onSubmit={handleSubmit}>
        <div className="pm-billing-form__summary">
          <span className="pm-billing-form__summary-label">Total due</span>
          <strong>
            {amount} {currency}
          </strong>
        </div>

        <div className="pm-billing-payment-options">
          <button
            type="button"
            className={selectedMethod === 'paypal' ? 'is-active' : ''}
            onClick={() => setSelectedMethod('paypal')}
            aria-label="Pay with PayPal"
          >
            <PayPalIcon />
          </button>
          <button
            type="button"
            className={selectedMethod === 'apple' ? 'is-active' : ''}
            onClick={() => setSelectedMethod('apple')}
            aria-label="Pay with Apple Pay"
          >
            <ApplePayIcon />
          </button>
          <button
            type="button"
            className={selectedMethod === 'google' ? 'is-active' : ''}
            onClick={() => setSelectedMethod('google')}
            aria-label="Pay with Google Pay"
          >
            <GooglePayIcon />
          </button>
        </div>

        <div className="pm-billing-separator">
          <hr className="pm-billing-separator__line" />
          <p>or pay using credit card</p>
          <hr className="pm-billing-separator__line" />
        </div>

        <div className="pm-billing-fields">
          <div className="pm-billing-field">
            <label htmlFor="pm-billing-card-name" className="pm-billing-field__label">
              Card holder full name
            </label>
            <input
              id="pm-billing-card-name"
              className="pm-billing-field__input"
              type="text"
              value={cardName}
              onChange={(event) => setCardName(event.target.value)}
              placeholder="Enter your full name"
              autoComplete="cc-name"
              required={selectedMethod === 'card'}
            />
          </div>

          <div className="pm-billing-field">
            <label htmlFor="pm-billing-card-number" className="pm-billing-field__label">
              Card number
            </label>
            <input
              id="pm-billing-card-number"
              className="pm-billing-field__input"
              type="text"
              inputMode="numeric"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              placeholder="0000 0000 0000 0000"
              autoComplete="cc-number"
              required={selectedMethod === 'card'}
            />
          </div>

          <div className="pm-billing-field">
            <label htmlFor="pm-billing-expiry" className="pm-billing-field__label">
              Expiry date / CVV
            </label>
            <div className="pm-billing-field__split">
              <input
                id="pm-billing-expiry"
                className="pm-billing-field__input"
                type="text"
                value={expiry}
                onChange={(event) => setExpiry(event.target.value)}
                placeholder="01/28"
                autoComplete="cc-exp"
                required={selectedMethod === 'card'}
              />
              <input
                id="pm-billing-cvv"
                className="pm-billing-field__input"
                type="password"
                inputMode="numeric"
                value={cvv}
                onChange={(event) => setCvv(event.target.value)}
                placeholder="CVV"
                autoComplete="cc-csc"
                required={selectedMethod === 'card'}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="pm-billing-checkout-btn">
          Checkout
        </button>
      </form>
    </div>
  );
}
