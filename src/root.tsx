import { Links, LinksFunction, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./tailwind.css";
import "./index.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { AgentServerUIRoot } from "#/components/providers";
import { buildAgentCanvasPath } from "#/utils/base-path";
import { TOAST_OPTIONS } from "#/utils/custom-toast-handlers";
import { LoadingSpinner } from "#/components/shared/loading-spinner";
import { useConfig } from "#/hooks/query/use-config";
import { applyColorTheme, readPersistedColorTheme } from "#/themes/color-themes";

function ColorThemeApplier() {
  React.useEffect(() => {
    applyColorTheme(readPersistedColorTheme());
  }, []);
  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body data-agent-server-ui="" className="m-0">
        <AgentServerUIRoot contentClassName="min-h-screen">
          <ColorThemeApplier />
          {children}
          <Toaster toastOptions={TOAST_OPTIONS} />
          <div id="modal-portal-exit" />
        </AgentServerUIRoot>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "icon", type: "image/svg+xml", href: buildAgentCanvasPath("/favicon.svg") },
];

export const meta: MetaFunction = () => [
  { title: "MTech" },
  { name: "description", content: "Local AI coding workspace" },
];

export default function App() {
  const config = useConfig();
  if (config.isPending || config.isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base">
        <LoadingSpinner size="large" />
      </main>
    );
  }
  if (config.isError) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-base text-white px-6">
        <div className="max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-xl font-semibold">MTech local backend unavailable</h1>
          <p className="mt-2 text-sm text-white/60">Start the MTech Colab/local backend and refresh this page.</p>
        </div>
      </main>
    );
  }
  return <Outlet />;
}
