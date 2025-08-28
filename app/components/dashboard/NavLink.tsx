import Link from "next/link";

export const NavLink = ({
  href,
  currentPath,
  children,
  Icon,
}: {
  href: string;
  currentPath: string;
  children: React.ReactNode;
  Icon?: React.ElementType;
}) => {
  // Determine if the link is active based on the currentPath matching
  // the last segment of the href.
  const isActive = href.endsWith(currentPath);

  // Construct the CSS classes dynamically using Tailwind CSS.
  // The link will have a different background and text color if it's active.
  const linkClasses = `
    px-4 py-2 rounded-md text-sm font-medium focus:outline-none
    transition-colors duration-200 flex items-center space-x-2
    ${
      isActive
        ? "bg-indigo-600 text-white shadow" // Active state styles
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700" // Inactive state styles
    }
  `;

  return (
    <Link href={href} className={linkClasses}>
      {/* Render the icon if provided */}
      {Icon && <Icon size={16} />}
      {/* Render the children (text content) */}
      <span>{children}</span>
    </Link>
  );
};
