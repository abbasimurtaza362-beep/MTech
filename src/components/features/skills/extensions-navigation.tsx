import React from "react";
import { useTranslation } from "react-i18next";
import SkillsIcon from "#/icons/skills.svg?react";
import { NavigationLink } from "#/components/shared/navigation-link";
import { cn } from "#/utils/utils";
import { SIDEBAR_ROW_INTERACTIVE_CLASS, sidebarNavRowClassName } from "#/components/features/sidebar/sidebar-layout";
import { I18nKey } from "#/i18n/declaration";

/** MTech local-only build: Skills is the only extension surface kept. */
export function ExtensionsNavigation() {
  const { t } = useTranslation("openhands");
  return (
    <aside
      data-testid="extensions-navbar-desktop"
      className="hidden md:flex md:w-[260px] md:shrink-0 md:flex-col md:gap-2 md:sticky md:top-8 md:self-start"
    >
      <span className="px-2 text-sm font-normal text-white">
        {t(I18nKey.NAV$CUSTOMIZE)}
      </span>
      <div className="flex flex-col gap-0.5 pt-0.5">
        <NavigationLink
          to="/skills"
          end
          data-testid="sidebar-extensions-/skills"
          className={({ isActive }) =>
            cn(
              sidebarNavRowClassName(),
              "truncate",
              isActive
                ? SIDEBAR_ROW_INTERACTIVE_CLASS.active
                : SIDEBAR_ROW_INTERACTIVE_CLASS.idle,
            )
          }
        >
          <span className="shrink-0 flex items-center justify-center">
            <SkillsIcon width={16} height={16} aria-hidden="true" />
          </span>
          <span className="truncate">Skills</span>
        </NavigationLink>
      </div>
    </aside>
  );
}
