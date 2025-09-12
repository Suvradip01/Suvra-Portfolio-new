import { useState, useEffect } from "react";

const TypingText = ({ words, typingSpeed = 60, deletingSpeed = 50, pause = 1500, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const newText = isDeleting
        ? currentWord.substring(0, displayText.length - 1)
        : currentWord.substring(0, displayText.length + 1);

      setDisplayText(newText);

      if (!isDeleting && newText === currentWord) {
        timer = setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && newText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timer = setTimeout(handleTyping, speed);

    return () => clearTimeout(timer);
  }, [wordIndex, isDeleting, displayText, words, typingSpeed, deletingSpeed, pause]);

  // CSS keyframes for the blinking cursor
  const cursorStyle = `
    animation: blink 1.2s steps(1, end) infinite;
    display: inline-block;
  `;

  return (
    <span className={className}>
      {displayText}
      <span
        style={{ animation: 'blink 1.2s steps(1, end) infinite', display: 'inline-block' }}
      >|</span>
    </span>
  );
};

export default TypingText;