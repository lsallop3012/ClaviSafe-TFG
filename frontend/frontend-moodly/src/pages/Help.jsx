import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/paths';
import explore from '../assets/icons/ix_explore-filled.png';
import heart from '../assets/icons/icon-park-solid_like.png';
import publish from '../assets/icons/streamline-sharp_buttons-all-remix.png';
import save from '../assets/icons/meteor-icons_images.png';
import './StaticPage.css';

const FAQS = [
  {
    q: 'How do I create an account?',
    a: 'On the homepage, you will find the registration form. Enter your name, email address, and password. You will have your account active in less than a minute.',
  },
  {
    q: 'How do I upload an image?',
    a: 'Once logged in, go to the "Create" section from the menu. You can drag a file from your computer or paste a URL of an external image.',
  },
  {
    q: 'How do I create a board?',
    a: 'Access your profile and click "+ New board". Give it a name and optional description. You can then save images from the Explore section to this board.',
  },
  {
    q: 'How do I save an image to a board?',
    a: 'In the Explore section, hover over any image and click the bookmark icon. A selector with your boards will open; choose the one you prefer.',
  },
  {
    q: 'How do I remove an image from a board?',
    a: 'Yes. Enter the details of the board and hover over the image you want to remove. A ✕ button will appear in the top right corner.',
  },
  {
    q: 'How do I delete an image I have uploaded?',
    a: 'Go to your profile → "My images" tab, hover over the image, and click the trash icon. The image will be permanently deleted.',
  },
  {
    q: 'Can I change my password?',
    a: 'Yes. In your profile, click "Edit profile". You will see a field for the new password; leave it blank if you don\'t want to change it.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 16, marginBottom: 16 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'none', border: 'none', width: '100%', textAlign: 'left',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 12, padding: 0,
        }}
      >
        <span style={{ fontSize: '0.97rem', fontWeight: 600, color: 'var(--color-text)' }}>{q}</span>
        <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ margin: '12px 0 0', fontSize: '0.93rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">Support</span>
          <h1 className="static-page__title">Help Center</h1>
          <p className="static-page__lead">
            Find answers to the most frequently asked questions or discover how to get the most out of Moodly.
          </p>
        </div>

        {/* Feature cards */}
        <div className="static-page__section">
          <h2 className="static-page__section-title">Getting Started</h2>
          <div className="static-page__cards">
            <div className="static-page__card">
              <img src={explore} alt="Explore" className="static-page__card-icon" />
              <p className="static-page__card-title">Explore</p>
              <p className="static-page__card-desc">Browse the Explore section and use the search bar to find images by name or description.</p>
            </div>
            <div className="static-page__card">
              <img src={save} alt="Save" className="static-page__card-icon" />
              <p className="static-page__card-title">Save</p>
              <p className="static-page__card-desc">Create themed boards and save the images that inspire you most.</p>
            </div>
            <div className="static-page__card">
              <img src={publish} alt="Publish" className="static-page__card-icon" />
              <p className="static-page__card-title">Publish</p>
              <p className="static-page__card-desc">Upload your own images from a file or using an external URL.</p>
            </div>
            <div className="static-page__card">
              <img src={heart} alt="Likes" className="static-page__card-icon" />
              <p className="static-page__card-title">Likes</p>
              <p className="static-page__card-desc">Give likes to the images you like and find them all in the Liked tab of your profile.</p>
            </div>
          </div>
        </div>

        <hr className="static-page__divider" />

        {/* FAQ */}
        <div className="static-page__section">
          <h2 className="static-page__section-title">Frequently Asked Questions</h2>
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <hr className="static-page__divider" />

        <div className="static-page__section">
          <h2 className="static-page__section-title">Still have questions?</h2>
          <p className="static-page__text">
            If you haven't found what you were looking for, you can create an account and explore the platform
            on your own. It's designed to be intuitive from the very first moment.
          </p>
          <button
            type="button"
            onClick={() => navigate(ROUTES.HOME)}
            style={{
              marginTop: 8, background: 'var(--color-accent)', color: 'var(--color-bg-dark)',
              border: 'none', borderRadius: 12, padding: '10px 24px',
              fontWeight: 700, fontSize: '0.92rem', fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            Go to Home
          </button>
        </div>

      </div>
    </div>
  );
}
