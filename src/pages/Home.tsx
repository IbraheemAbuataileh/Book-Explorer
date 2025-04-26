import PopularBooks from "../components/PopularBooks";

export default function Home() {
  return (
    <main className="p-6 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Popular Books</h2>
      <PopularBooks />
    </main>
  );
}
