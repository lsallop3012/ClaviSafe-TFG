import './StaticPage.css';

export default function Policies() {
  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">Privacy</span>
          <h1 className="static-page__title">Privacy Policy</h1>
          <p className="static-page__lead">
            At Moodly, we take the protection of your data seriously. This policy explains what
            information we collect, how we use it, and what rights you have over it.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">1. Data We Collect</h2>
          <p className="static-page__text">When you register and use Moodly, we may collect:</p>
          <ul className="static-page__list">
            <li>Username and email address</li>
            <li>Password (stored encrypted, never in plain text)</li>
            <li>Images you upload to the platform</li>
            <li>Interactions: likes, created boards, and saved images</li>
            <li>Session data and authentication tokens</li>
          </ul>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">2. How We Use Your Data</h2>
          <p className="static-page__text">The collected data is used exclusively for:</p>
          <ul className="static-page__list">
            <li>Managing your account and authentication</li>
            <li>Showing you personalized content based on your interactions</li>
            <li>Improving the functionality and security of the platform</li>
          </ul>
          <p className="static-page__text">
            We do not sell or share your personal data with third parties under any circumstances.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">3. Cookies</h2>
          <p className="static-page__text">
            Moodly utilizes the browser's local storage to maintain your
            session active using a secure authentication token. We do not use tracking cookies or advertising.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">4. Your Rights</h2>
          <p className="static-page__text">You have the right to:</p>
          <ul className="static-page__list">
            <li>Access the data we have about you</li>
            <li>Modify your profile information at any time</li>
            <li>Request the deletion of your account and associated data</li>
          </ul>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">5. Security</h2>
          <p className="static-page__text">
            We implement technical measures to protect your data: passwords encrypted with bcrypt,
            authentication via Bearer tokens (Laravel Sanctum), and communications over HTTPS
            in production environments.
          </p>
        </div>

        <hr className="static-page__divider" />
        <p className="static-page__note">Last updated: May 2025 · Moodly</p>
      </div>
    </div>
  );
}
