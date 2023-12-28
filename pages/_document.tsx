import { Html, Head, Main, NextScript } from "next/document";
import User from "./user";

export default function Document() {
  return (
    <Html lang="en">
      <Head />   
      <title>NCD</title>
      <body >
        <Main />
        <NextScript />
        <div  id="modal-root"></div>
      </body>
    </Html>
  );
}

