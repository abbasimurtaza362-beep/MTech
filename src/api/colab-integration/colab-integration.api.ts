import { getEffectiveLocalBackend } from "#/api/backend-registry/active-store";
import SettingsService from "#/api/settings-service/settings-service.api";

/**
 * The single local LLM integration used by MTech.
 *
 * The Colab module exposes an OpenAI-compatible API. The agent-server remains
 * the execution layer; this adapter only installs the Colab model/base URL
 * into the active local agent-server settings.
 */
export const MTECH_COLAB_DEFAULT_MODEL =
  "openai/deepseek-coder-6.7b-instruct";

export const MTECH_COLAB_DEFAULT_BASE_URL =
  "http://127.0.0.1:8100/v1";

export const MTECH_COLAB_DEFAULT_API_KEY =
  "replitclone-local";

const getConfigured = () => {
  const env = import.meta.env as Record<string, string | undefined>;

  return {
    model:
      env.VITE_COLAB_MODEL?.trim() ||
      MTECH_COLAB_DEFAULT_MODEL,
    baseUrl:
      env.VITE_COLAB_LLM_URL?.trim() ||
      MTECH_COLAB_DEFAULT_BASE_URL,
    apiKey:
      env.VITE_COLAB_API_KEY?.trim() ||
      MTECH_COLAB_DEFAULT_API_KEY,
  };
};

export interface ColabIntegrationResult {
  integrated: boolean;
  backendId: string;
  model: string;
  baseUrl: string;
}

let integrationPromise: Promise<ColabIntegrationResult> | null = null;

/**
 * Configure the currently active local agent-server to use the Colab model.
 *
 * This is intentionally idempotent and does not touch the UI. A single
 * in-flight promise also prevents duplicate PATCH requests when React mounts
 * the root more than once during development.
 */
export function ensureColabIntegration(): Promise<ColabIntegrationResult> {
  if (integrationPromise) return integrationPromise;

  integrationPromise = (async () => {
    const backend = getEffectiveLocalBackend();

    if (!backend) {
      throw new Error("No active local agent-server backend.");
    }

    const configured = getConfigured();

    await SettingsService.saveSettings({
      agent_settings_diff: {
        llm: {
          model: configured.model,
          api_key: configured.apiKey,
          base_url: configured.baseUrl,
        },
      },
    });

    return {
      integrated: true,
      backendId: backend.id,
      model: configured.model,
      baseUrl: configured.baseUrl,
    };
  })().catch((error) => {
    integrationPromise = null;
    throw error;
  });

  return integrationPromise;
}

/**
 * Force a fresh integration attempt after the local agent-server becomes
 * available again.
 */
export function resetColabIntegration(): void {
  integrationPromise = null;
}
