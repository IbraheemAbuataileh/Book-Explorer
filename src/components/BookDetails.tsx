import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomeData from "../services/HomeData";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: () => HomeData.getBookDetails(id || ""),
    enabled: !!id,
  });

  const goHome = () => {
    navigate("/");
  };

  if (isLoading) return <div>Loading book details...</div>;
  if (error || !data?.data) return <div>Failed to load book details.</div>;

  const book = data.data.volumeInfo;

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <img
            src={
              book.imageLinks?.thumbnail || "https://via.placeholder.com/150"
            }
            alt={book.title}
            className="w-48 h-72 mx-auto mb-6 object-cover rounded-md"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">{book.title}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
            {book.authors ? book.authors.join(", ") : "Unknown Author"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-justify mb-6">
            {book.description
              ? book.description
              : "No description available for this book."}
          </p>

          {book.publisher && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Publisher: {book.publisher}
            </p>
          )}
          {book.publishedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published Date: {book.publishedDate}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 mt-4 mb-5">
        <button
          onClick={goHome}
          className="bg-[#052b58] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[300px]"
        >
          Home Page
        </button>
      </div>
    </>
  );
}
