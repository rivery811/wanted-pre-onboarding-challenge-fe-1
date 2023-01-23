import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath, isReady } = useRouter();
  useEffect(() => {
    if (asPath == "/" && isReady) {
      localStorage.getItem("token") == "undefined"
        ? router.push("/login")
        : router.push("/todos");
    }
  }, [asPath]);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
