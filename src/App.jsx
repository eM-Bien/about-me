import { useEffect, useState } from "react";

import Intro from "./components/intro/Intro";
import Discover from "./components/discover/Discover";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentView, setCurrentView] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setCurrentView("discover");
    }, 6100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = currentView === "about" ? "About 😁" : "Discover 🚀";
  });

  const toggleView = () =>
    setCurrentView((prev) => (prev === "discover" ? "about" : "discover"));

  const navText = currentView === "discover" ? "about" : "discover";

  return (
    <>
      {!showIntro && <Nav text={navText} onClick={toggleView} />}

      {showIntro ? (
        <Intro />
      ) : currentView === "discover" ? (
        <Discover onElementClick={toggleView} />
      ) : (
        <About />
      )}
    </>
  );
}
