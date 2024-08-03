import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "daisyui/dist/full.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// console.warn = function() {};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
