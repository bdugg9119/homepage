import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";

function Navbar(): React.ReactElement {
  return (
    <nav className="sticky top-0 z-50 border-b border-base-800 bg-base-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="text-lg font-bold tracking-tight text-text-primary transition-colors hover:text-accent-400"
        >
          Brian Duggan
        </NavLink>

        <div className="flex items-center gap-1">
          <NavItem to="/" label="Home" />
          <NavItem to="/resume" label="Resume" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
