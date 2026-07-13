import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState("waiting");

  const request = useCallback(async (URL, method = "GET") => {
    setLoading(true);
    setProcess("loading");

    try {
      const response = await fetch(URL, { method });

      if (!response.ok) {
        throw new Error(`Could not fetch ${URL}, status: ${response.status}`);
      }

      const data = await response.json();

      setLoading(false);

      return data;
    } catch (e) {
      setLoading(false);
      setError(e.message);
      setProcess("error");

      throw e;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
    setProcess("loading");
  }, []);

  return { loading, error, request, clearError, process, setProcess };
};
