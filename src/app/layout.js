
import ReduxProvider from "@/lib/Provider";
import "./globals.css";

export const metadata = {
  title: "AI Analytics Dashboard",
  description: "An analytics dashboard with AI capabilities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
