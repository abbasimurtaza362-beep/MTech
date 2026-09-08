import { type RouteConfig, layout, index, route } from "@react-router/dev/routes";

export default [
  layout("routes/root-layout.tsx", [
    index("routes/index-home.tsx"),
    route("conversations", "routes/home.tsx"),
    route("conversations/:conversationId/panel", "routes/conversation-panel.tsx"),
    route("conversations/:conversationId", "routes/conversation.tsx"),
    route("skills", "routes/skills-settings.tsx"),
    route("settings", "routes/settings.tsx", [
      index("routes/llm-settings.tsx"),
      route("llm", "routes/llm-settings.tsx"),
    ]),
    route("shared/conversations/:conversationId", "routes/shared-conversation.tsx"),
  ]),
] satisfies RouteConfig;
