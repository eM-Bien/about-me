import styles from "./Arrow.module.css";

function Arrow({ className = [], onClick }) {
  const classNames = [...className.map((cls) => styles[cls])].join(" ");

  return (
    <svg
      onClick={onClick}
      className={classNames}
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.6697 41.266L25.6697 9.03362"
        stroke="white"
        strokeWidth="2.08134"
        strokeLinejoin="round"
      />
      <path
        d="M31.9083 36.0673C29.472 38.5036 28.106 39.8695 25.6697 42.3058L19.4312 36.0673"
        stroke="white"
        strokeWidth="2.08134"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Arrow;
