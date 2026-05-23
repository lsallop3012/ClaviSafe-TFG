import './ScrollDownButton.css';

export default function ScrollDownButton({ targetId }) {
  const handleClick = () => {
    if (!targetId) {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button
      type="button"
      className="scroll-down"
      aria-label="Scroll to next section"
      onClick={handleClick}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 9l6 6 6-6"
        />
      </svg>
    </button>
  );
}
