import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  links: any;
  c_page: any;
  setPageIndex: any;
};

const Pager: React.FC<Props> = ({ links, c_page, setPageIndex }) => {
  return (
    <nav>
      <ul>
        {links.map((link: any, index: number) => {
          return (
            //  バックエンドで日本語かする必要あり
            <li
              key={index}
              className="{c_page inline-block mt-3 mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500}"
            >
              <button onClick={() => setPageIndex(link.url.slice(-1))}>
                {link.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pager;
