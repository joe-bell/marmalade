import * as React from "react";
import Link from "next/link";

const Header: React.FC = () => (
  <header className="p-4 border-b border-green-700">
    <ul className="flex">
      <li className="flex-1 lg:flex-none lg:mr-4">
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="block text-center">Overview</a>
        </Link>
      </li>
      <li className="flex-1 lg:flex-none">
        <Link href="/about">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="block text-center">Activity</a>
        </Link>
      </li>
    </ul>
  </header>
);

export default Header;
