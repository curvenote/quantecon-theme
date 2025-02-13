import { Link } from '@remix-run/react';

export function QuantEconButton() {
  return (
    <Link to="https://quantecon.org/">
      <img
        className="duration-300 cursor-pointer transition-scale hover:scale-110 h-7 dark:invert"
        src="/logos/qemb-logo.png"
        alt="QuantEcon Logo"
      />
    </Link>
  );
}
