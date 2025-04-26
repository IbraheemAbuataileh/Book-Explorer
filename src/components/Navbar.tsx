import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <button
        className="text-xl font-bold text-gray-800 dark:text-white"
        onClick={() => navigate(`/`)}
      >
        📚 Book Explorer
      </button>

      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />

      <div className="flex items-center justify-center">
        <button
          onClick={() => navigate(`/FavoriteBooks`)}
          className="ml-4 px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
        >
          Your Favourite Books ? ❤️
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 rounded-md text-sm bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
