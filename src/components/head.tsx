import * as React from "react";
import NextHead from "next/head";
import { meta } from "../../marmalade.config";

export type MetaProps = {
  title?: string;
  description?: string;
  imagePath?: string;
  path?: string;
  twitterCard?: "summary" | "summary_large_image" | "player" | "app";
};

export const Head: React.FC<MetaProps> = ({
  children,
  description = meta.description,
  imagePath,
  title,
  twitterCard = "summary",
  path,
}) => (
  <NextHead>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <title>{title ? `${title} | ${meta.title}` : meta.title}</title>
    {/* @TODO Analytics */}
    {/**
     * Twitter & Open Graph
     */}
    {meta.social?.twitter && (
      <>
        <meta name="twitter:site" content={meta.social.twitter} />
        <meta name="twitter:creator" content={meta.social.twitter} />
      </>
    )}
    <meta name="twitter:card" content={twitterCard} />
    <meta property="og:url" content={path ? `${meta.url}/${path}` : meta.url} />
    <meta property="og:title" content={title || meta.title} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={`${meta.url}/${imagePath || meta.avatar}`}
    />
    {/**
     * Feeds
     */}
    {/* @TODO Add XML */}
    <link
      rel="alternate"
      title={meta.title}
      type="application/json"
      href={`${meta.url}/feed.json`}
    />
    {/* @TODO Favicons */}
    {/**
     * Description
     */}
    <meta name="description" content={description} />
    {/**
     * Canonical
     */}
    <link rel="canonical" href={meta.url} />
    {/* @TODO Theme Color */}
    {/* Manifest */}
    <link rel="manifest" href="/manifest.webmanifest"></link>
    {children}
  </NextHead>
);
