import * as React from "react";
import Layout from "../components/Layout";
// import { NextPage } from "next";
// import Link from "next/link";
import { Stack } from "../styles/components/stack";

const Index = () => (
  <Layout>
    <Stack>
      <h1 className="font-bold text-4xl">Overview</h1>
      <article className="p-4 rounded shadow-md md:w-1/2">
        <h1>Balance</h1>
        <p className="font-bold text-4xl">£32,000</p>
      </article>
    </Stack>
  </Layout>
);

// Index.getInitialProps = async ({ req }) => {
//   const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   const data = await res.json();
//   const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;

//   console.log(`Show data fetched. Count: ${data.length}`);

//   return {
//     userAgent,
//     // @ts-ignore
//     shows: data.map(entry => entry.show)
//   };
// };

export default Index;
