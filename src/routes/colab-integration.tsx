import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ensureColabIntegration } from "#/api/colab-integration/colab-integration.api";

/**
 * Hidden local integration route.
 *
 * It has no UI of its own. It exists as the explicit integration entry point
 * requested by MTech: the Colab module becomes the single LLM provider.
 */
export default function ColabIntegrationRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    void ensureColabIntegration()
      .catch((error) => {
        console.error("MTech Colab integration failed:", error);
      })
      .finally(() => {
        if (!cancelled) navigate("/", { replace: true });
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return null;
}
