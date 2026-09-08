import CircuitIcon from "#/icons/u-circuit.svg?react";

export interface SettingsNavItem {
  icon: React.ReactElement;
  to: string;
  text: string;
  subtitle: string;
}

/** MTech intentionally exposes one settings surface: the local LLM. */
export const OSS_NAV_ITEMS: SettingsNavItem[] = [
  {
    icon: <CircuitIcon width={16} height={16} />,
    to: "/settings/llm",
    text: "SETTINGS$NAV_LLM",
    subtitle: "SETTINGS$PAGE_LLM_SUBLINE",
  },
];

export const LOCKED_CLOUD_SETTINGS_NAV_PATH = "/settings/llm";
