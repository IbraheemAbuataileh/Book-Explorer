import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePopularBooks } from "../Hooks/usePopularBooks";
import PaginationButtons from "./PaginationButtons";

export default function PopularBooks() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data, isLoading, error } = usePopularBooks(page);
  const [favorites, setFavorites] = useState<string[]>([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (bookId: string) => {
    let updatedFavorites: string[] = [];

    if (favorites.includes(bookId)) {
      updatedFavorites = favorites.filter((id) => id !== bookId);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      if (favorites.length >= 10) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
        return;
      }
      updatedFavorites = [...favorites, bookId];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  const books = data?.data?.items || [];
  const totalItems = data?.data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / 1000);

  const allCategories: string[] = Array.from(
    new Set(books.flatMap((book: any) => book.volumeInfo?.categories ?? []))
  );
  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book: any) =>
          book.volumeInfo?.categories?.includes(selectedCategory)
        );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.data) return <div>Failed to load book details.</div>;

  return (
    <>
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-md shadow-lg animate-bounce z-50">
          You can't add more than 10 books to your favorites list!
        </div>
      )}
      <div className="flex justify-center my-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded border dark:bg-gray-800 dark:text-white"
        >
          <option value="All">All Categories</option>
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book: any, index: number) => {
          const info = book.volumeInfo;
          const id = book.id;
          const isFavorited = favorites.includes(id);
          const imageUrl =
            info.imageLinks?.smallThumbnail ||
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80";
          const description = info.description
            ? info.description.slice(0, 100) + "..."
            : isArabic(info.title)
            ? ".لا يوجد وصف متاح"
            : "No description available.";
          return (
            <div
              key={index}
              className="flex bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <img
                src={imageUrl}
                alt={info.title}
                className="w-32 object-cover object-center"
              />
              <div className="p-4 flex flex-col justify-between w-full">
                <div>
                  <h3
                    className={`text-lg font-semibold mt-1 ${
                      isArabic(info.title) ? "text-right" : "text-left"
                    } text-gray-800 dark:text-white`}
                  >
                    {info.title || "No Title"}
                  </h3>
                  <p
                    className={`text-sm mt-2 ${
                      isArabic(description) ? "text-right" : "text-left"
                    } text-gray-600 dark:text-gray-300`}
                  >
                    {description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-gray-500 dark:text-gray-400">
                  <span className="text-sm">
                    ⭐ {Math.floor(Math.random() * 5 + 1)} / 5
                  </span>
                  <button
                    onClick={() => toggleFavorite(id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isFavorited ? "bg-red-500 text-white" : "bg-gray-300"
                    }`}
                    title={
                      isFavorited ? "Remove from Favorites" : "Add to Favorites"
                    }
                  >
                    ❤️
                  </button>
                </div>
                <div className="mt-5 flex items-center justify-center">
                  <button
                    className="bg-[#052b58] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]"
                    onClick={() => navigate(`/details/${id}`)}
                  >
                    Read
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <PaginationButtons
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
