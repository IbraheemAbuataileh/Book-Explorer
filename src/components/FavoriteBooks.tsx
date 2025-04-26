import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePopularBooks } from "../Hooks/usePopularBooks";
import PaginationButtons from "./PaginationButtons";

export default function FavoriteBooks() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = usePopularBooks(page);
  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const books = data?.data?.items || [];
  const favoriteBooks = books.filter((book: any) =>
    favorites.includes(book.id)
  );

  const totalPages = Math.ceil(favoriteBooks.length / itemsPerPage);
  console.log("totalPages", totalPages);
  const startIndex = (page - 1) * itemsPerPage;
  const currentFavorites = favoriteBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (isLoading) return <div>Loading favorites...</div>;
  if (error || !data?.data) return <div>Failed to load favorites.</div>;

  if (favoriteBooks.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No favorite books yet!
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {currentFavorites.map((book: any, index: number) => {
          const info = book.volumeInfo;
          const id = book.id;
          const description = info.description
            ? info.description.slice(0, 100) + "..."
            : isArabic(info.title)
            ? ".لا يوجد وصف متاح"
            : "No description available.";
          const imageUrl =
            info.imageLinks?.smallThumbnail ||
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80";

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
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {info.title || "No Title"}
                </h3>
                <p
                  className={`text-sm mt-2 ${
                    isArabic(description) ? "text-right" : "text-left"
                  } text-gray-600 dark:text-gray-300`}
                >
                  {description}
                </p>
                <button
                  className="mt-4 bg-[#052b58] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => navigate(`/details/${id}`)}
                >
                  Read
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* {totalPages > 1 && ( */}
      <div className="mt-8 flex justify-center">
        <PaginationButtons
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
      {/* )} */}
    </div>
  );
}
