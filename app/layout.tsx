import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FetchLayoutQuery, FetchLayoutDocument } from "@/generated/graphql";

import { apiRequest } from "@/utils/api-request";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Furnitut: Furniture for the future",
  description:
    "Furnitut is a boilerplate created by Crystallize using Next.js.",
};

const fetchLayout = async <Result, Variables>(
  query: TypedDocumentNode<Result, Variables>,
  variables?: Variables
) => {
  const response = (await apiRequest(query, variables)) as {
    data: FetchLayoutQuery;
  };

  return {
    header: response.data.browse?.header?.hits?.[0]?.children?.hits,
    footer: null,
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const layout = await fetchLayout(FetchLayoutDocument);
  return (
    <html lang="en">
      <body className={`${manrope.className} bg-soft`}>
        <Header navigation={layout.header} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
