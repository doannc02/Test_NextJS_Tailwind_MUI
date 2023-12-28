import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from "next/app";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress color="black" stopDelayMs={500} options={{
    showSpinner: true,
  }}/>
   <ToastContainer
          containerId='a-toast'
          position='top-center'
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          limit={3}
        />
       <Component {...pageProps} />
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
