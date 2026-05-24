import './StaticPage.css';

export default function Terms() {
  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">Legal</span>
          <h1 className="static-page__title">Terms and Conditions</h1>
          <p className="static-page__lead">
            By using Moodly, you agree to these Terms and Conditions. Please read them carefully before registering
            or publishing content on the platform.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">1. Acceptance of Terms</h2>
          <p className="static-page__text">
            Accessing and using Moodly implies full acceptance of these Terms and Conditions.
            If you do not agree with any of them, you should refrain from using the platform.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">2. Registration and Account</h2>
          <p className="static-page__text">
            To access the main features of Moodly, you need to create an account. You are
            responsible for maintaining the confidentiality of your credentials and all activities
            conducted under your account.
          </p>
          <p className="static-page__text">
            Moodly reserves the right to suspend or delete accounts that violate these terms.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">3. Published Content</h2>
          <p className="static-page__text">
            By uploading images to Moodly, you declare that you have the necessary rights to do so and
            that the content does not infringe upon the rights of third parties or contain illegal, offensive
            or inappropriate material.
          </p>
          <p className="static-page__text">
            Moodly reserves the right to remove any content that it deems to violate these terms without
            prior notice.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">4. Intellectual Property</h2>
          <p className="static-page__text">
            The design, code, and brand of Moodly are the property of their creators. The images
            published by users retain the rights of their respective authors.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">5. Limitation of Liability</h2>
          <p className="static-page__text">
            Moodly is provided "as is" and does not guarantee the continuous availability of the service.
            We will not be liable for any data loss or damages arising from the use of the platform.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">6. Modifications</h2>
          <p className="static-page__text">
            We reserve the right to update these terms at any time. Changes will be notified on the platform and will take effect from their publication.
          </p>
        </div>

        <hr className="static-page__divider" />
        <p className="static-page__note">Last updated: May 2025 · Moodly</p>
      </div>
    </div>
  );
}
