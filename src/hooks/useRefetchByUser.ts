import { useState } from "react";

export function useRefreshByUser(refetch: () => Promise<unknown>, timeoutMs = 5000) {
  const [isRefreshing, setIsRefetchingByUser] = useState(false);

  async function refresh() {
    setIsRefetchingByUser(true);

    try {
      await Promise.race([
        refetch(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Refetch timeout exceeded")), timeoutMs)
        ),
      ]);
    } finally {
      setIsRefetchingByUser(false);
    }
  }

  function cancelRefresh() {
    setIsRefetchingByUser(false);
  }

  return {
    isRefreshing,
    refresh,
    cancelRefresh,
  };
}
