/* eslint-disable prettier/prettier */
import { SearchIcon } from "@/components/icons";

/** * SearchInput component for searching products
 * - Displays a search input field with an icon
 * * Props:
 * - value: Current search term
 * - onChange: Function to handle input changes
 * - placeholder: Placeholder text for the input
 * - className: Additional CSS classes for styling
 * * Returns:
 * - JSX element with a search input field
 * */
export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <SearchIcon className="absolute left-3 text-base text-gray-400 pointer-events-none" />
      <input
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent dark:bg-gray-700 dark:text-white"
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
