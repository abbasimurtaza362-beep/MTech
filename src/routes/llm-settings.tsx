import React from "react";
import { useSaveSettings } from "#/hooks/mutation/use-save-settings";
import { useSettings } from "#/hooks/query/use-settings";
import { SettingsInput } from "#/components/features/settings/settings-input";
import { BrandButton } from "#/components/features/settings/brand-button";

const DEFAULT_MODEL = "openai/deepseek-coder-6.7b-instruct";
const DEFAULT_BASE_URL = "http://127.0.0.1:8100/v1";

export default function LlmSettingsScreen() {
  const { data: settings } = useSettings();
  const { mutateAsync: saveSettings, isPending } = useSaveSettings();

  const current = settings?.agent_settings?.llm;
  const [model, setModel] = React.useState(current?.model ?? DEFAULT_MODEL);
  const [baseUrl, setBaseUrl] = React.useState(current?.base_url ?? DEFAULT_BASE_URL);
  const [apiKey, setApiKey] = React.useState("");
  const [saved, setSaved] = React.useState(false);

  React.useEffect(() => {
    if (!current) return;
    setModel(current.model ?? DEFAULT_MODEL);
    setBaseUrl(current.base_url ?? DEFAULT_BASE_URL);
  }, [current?.model, current?.base_url]);

  const handleSave = async () => {
    setSaved(false);
    await saveSettings({
      agent_settings_diff: {
        agent_kind: "openhands",
        llm: {
          model: model.trim() || DEFAULT_MODEL,
          base_url: baseUrl.trim() || DEFAULT_BASE_URL,
          ...(apiKey.trim() ? { api_key: apiKey.trim() } : {}),
        },
      },
    });
    setApiKey("");
    setSaved(true);
  };

  return (
    <section className="flex max-w-3xl flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Local LLM</h2>
        <p className="mt-1 text-sm text-white/60">MTech is locked to a local OpenAI-compatible model server. No cloud providers or third-party API integrations are used here.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-5">
          <SettingsInput
            label="Model"
            type="text"
            value={model}
            onChange={setModel}
            description="Example: openai/deepseek-coder-6.7b-instruct"
          />
          <SettingsInput
            label="Local Base URL"
            type="url"
            value={baseUrl}
            onChange={setBaseUrl}
            description="Colab/local OpenAI-compatible endpoint"
          />
          <SettingsInput
            label="Local API Key"
            type="password"
            value={apiKey}
            onChange={setApiKey}
            placeholder="replitclone-local"
            description="Optional when the local gateway does not require a key."
          />
        </div>
        <div className="mt-6 flex items-center gap-3">
          <BrandButton onClick={handleSave} disabled={isPending}>
            {isPending ? "Saving…" : "Save local model"}
          </BrandButton>
          {saved ? <span className="text-sm text-emerald-300">Saved</span> : null}
        </div>
      </div>
    </section>
  );
}
