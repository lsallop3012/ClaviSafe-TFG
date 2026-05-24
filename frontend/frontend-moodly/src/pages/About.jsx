import './StaticPage.css';

export default function About() {
  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">About Moodly</span>
          <h1 className="static-page__title">Your Visual Inspiration Space</h1>
          <p className="static-page__lead">
            Moodly is a platform for discovering, saving, and organizing images that inspire you.
            Create themed boards, collect what moves you, and share your aesthetic vision with the world.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">What is Moodly?</h2>
          <p className="static-page__text">
            Moodly was born from the idea that everyone has their own unique visual universe. A place where
            colors, textures, shapes, and moments tell a story. Our mission
            is to give you the tools to capture that story and make it your own.
          </p>
          <p className="static-page__text">
            Whether you're a designer looking for references, a creative building a moodboard, or simply
            someone who collects beautiful images, Moodly is made for you.
          </p>
        </div>

        <hr className="static-page__divider" />

        <div className="static-page__section">
          <h2 className="static-page__section-title">What can you do?</h2>
          <ul className="static-page__list">
            <li>Explore thousands of images uploaded by the community</li>
            <li>Like the images you like the most</li>
            <li>Create themed boards and save images in them</li>
            <li>Upload your own photographs and illustrations</li>
            <li>Manage your profile and collections from a single place</li>
          </ul>
        </div>

        <hr className="static-page__divider" />

        <div className="static-page__section">
          <h2 className="static-page__section-title">Technology</h2>
          <p className="static-page__text">
            Moodly is built with modern technologies: a backend in <strong>Laravel</strong> with
            secure authentication via Sanctum tokens, and a frontend in <strong>React + Vite</strong>
             designed to provide a fast and fluid experience. Everything deployed in a containerized environment with <strong>Docker</strong>.
          </p>
        </div>

        <hr className="static-page__divider" />

        <p className="static-page__note">Moodly · Final Project · 2025</p>
      </div>
    </div>
  );
}
