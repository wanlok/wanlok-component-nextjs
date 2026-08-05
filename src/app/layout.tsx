import { ReactNode } from "react";
import { ThemeRegistry } from "@/components/ThemeRegistry";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body style={{ height: "100dvh" }}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
};

export default Layout;
