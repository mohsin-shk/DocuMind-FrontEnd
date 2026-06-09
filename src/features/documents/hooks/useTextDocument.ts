import {
  useQuery,
} from "@tanstack/react-query";

export const useTextDocument = (
  url: string
) => {
  return useQuery({
    queryKey: [
      "text-document",
      url,
    ],

    queryFn: async () => {
      const response =
        await fetch(url);

      return response.text();
    },

    enabled: !!url,
  });
};