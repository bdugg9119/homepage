import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  label: string;
};

function NavItem({ to, label }: NavItemProps): React.ReactElement {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
          isActive
            ? "bg-accent-500/15 text-accent-400"
            : "text-text-secondary hover:text-text-primary hover:bg-base-800",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default NavItem;
