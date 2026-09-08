import React from "react";
import { Home, Keyboard, Search, Settings, Sparkles } from "lucide-react";
import { I18nKey } from "#/i18n/declaration";

const ICON_SIZE = 18;

export const COMMAND_MENU_ROUTE = {
  conversations: "/conversations",
  skills: "/skills",
  settings: "/settings",
  llmSettings: "/settings/llm",
} as const;

export type CommandMenuGroupId = "navigation" | "settings" | "actions";
export type CommandMenuItemId =
  | "new-chat"
  | "skills"
  | "settings"
  | "llm-settings"
  | "toggle-sidebar";

export interface CommandMenuItemDefinition {
  id: CommandMenuItemId;
  group: CommandMenuGroupId;
  titleKey?: I18nKey;
  descriptionKey?: I18nKey;
  keywordsKey?: I18nKey;
  title?: string;
  description?: string;
  keywords?: string;
  icon: React.ReactElement;
  to?: string;
  perform?: () => void;
}

export const commandMenuItemCopy = (
  literal: string | undefined,
  key: I18nKey | undefined,
  translate: (key: I18nKey) => string,
): string => literal ?? (key === undefined ? "" : translate(key));

export const COMMAND_MENU_GROUP_LABELS: Record<CommandMenuGroupId, I18nKey> = {
  navigation: I18nKey.COMMAND_MENU$GROUP_NAVIGATION,
  settings: I18nKey.COMMAND_MENU$GROUP_SETTINGS,
  actions: I18nKey.COMMAND_MENU$GROUP_ACTIONS,
};

export const COMMAND_MENU_GROUP_ORDER: CommandMenuGroupId[] = [
  "navigation",
  "settings",
  "actions",
];

export const createCommandMenuItems = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}): CommandMenuItemDefinition[] => [
  {
    id: "new-chat",
    group: "navigation",
    titleKey: I18nKey.COMMAND_MENU$NEW_CHAT_TITLE,
    descriptionKey: I18nKey.COMMAND_MENU$NEW_CHAT_DESCRIPTION,
    keywordsKey: I18nKey.COMMAND_MENU$NEW_CHAT_KEYWORDS,
    icon: <Home size={ICON_SIZE} />,
    to: COMMAND_MENU_ROUTE.conversations,
  },
  {
    id: "skills",
    group: "navigation",
    title: "Skills",
    description: "Manage local coding skills",
    keywords: "skills agentskill extensions",
    icon: <Sparkles size={ICON_SIZE} />,
    to: COMMAND_MENU_ROUTE.skills,
  },
  {
    id: "settings",
    group: "settings",
    titleKey: I18nKey.COMMAND_MENU$SETTINGS_TITLE,
    descriptionKey: I18nKey.COMMAND_MENU$SETTINGS_DESCRIPTION,
    keywordsKey: I18nKey.COMMAND_MENU$SETTINGS_KEYWORDS,
    icon: <Settings size={ICON_SIZE} />,
    to: COMMAND_MENU_ROUTE.settings,
  },
  {
    id: "llm-settings",
    group: "settings",
    titleKey: I18nKey.COMMAND_MENU$LLM_SETTINGS_TITLE,
    descriptionKey: I18nKey.COMMAND_MENU$LLM_SETTINGS_DESCRIPTION,
    keywordsKey: I18nKey.COMMAND_MENU$LLM_SETTINGS_KEYWORDS,
    icon: <Search size={ICON_SIZE} />,
    to: COMMAND_MENU_ROUTE.llmSettings,
  },
  {
    id: "toggle-sidebar",
    group: "actions",
    titleKey: I18nKey.COMMAND_MENU$TOGGLE_SIDEBAR_TITLE,
    descriptionKey: I18nKey.COMMAND_MENU$TOGGLE_SIDEBAR_DESCRIPTION,
    keywordsKey: I18nKey.COMMAND_MENU$TOGGLE_SIDEBAR_KEYWORDS,
    icon: <Keyboard size={ICON_SIZE} />,
    perform: toggleSidebar,
  },
];
