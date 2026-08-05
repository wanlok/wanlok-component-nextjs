"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/theme";

export const ThemeRegistry = ({ children }: { children: React.ReactNode }) => (
  <AppRouterCacheProvider options={{ key: "mui" }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>
);
