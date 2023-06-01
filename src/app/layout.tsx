"use client";
import { AuthenticationForm } from "./providers";
import NavBar from "../components/NavBar";
import { Box } from "@mui/material";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body suppressHydrationWarning={true}>
        <AuthenticationForm>
          <Box
            sx={{
              backgroundColor: "#F7F7F7",
              minHeight: "100vh",
              height: "max-content",
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavBar />
            {children}
          </Box>
        </AuthenticationForm>
      </body>
    </html>
  );
}
