import { SearchIcon } from "@/components/icons";

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
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}
