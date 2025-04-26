import { useQuery } from "@tanstack/react-query";
import HomeData from "../services/HomeData";

export const useBookDetails = (id: string) =>
  useQuery({
    queryKey: ["bookDetails", id],
    queryFn: () => HomeData.getBookDetails(id),
    enabled: !!id,
  });
