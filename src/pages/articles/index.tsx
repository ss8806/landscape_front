import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import type { Category } from "../../types/Category";
import type { Article } from "../../types/Article";
import useSWR from "swr";
import moment from "moment";
import React, { SyntheticEvent, useState, useEffect, useMemo } from "react";

const Articles = () => {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";

  const fetcher = () =>
    axios
      .get("http://localhost:/api/articles/")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data, error }: any = useSWR(
    "http://localhost:/api/articles/",
    fetcher
  );

  const [filterQuery, setFilterQuery] = useState<any>({});
  // ソート条件
  const [sort, setSort] = useState<any>({});

  let [isSorted, setSorted] = useState<boolean>(true);

  const filteredTask = useMemo(() => {
    let filteredTask = data;

    // 入力した文字は小文字にする
    const filterTitle = filterQuery.title && filterQuery.title.toLowerCase();

    // 絞り込み検索
    filteredTask = filteredTask.filter((row: Article) => {
      // タイトルで絞り込み
      if (
        filterQuery.title &&
        String(row.title).toLowerCase().indexOf(filterTitle) === -1
      ) {
        return false;
      }

      // カテゴリーで絞り込み
      if (filterQuery.c_id && row.c_id !== parseInt(filterQuery.c_id)) {
        return false;
      }
      return row;
    });

    // ソート
    if (sort.key) {
      filteredTask = filteredTask.sort((a: any, b: any) => {
        a = a[sort.key];
        b = b[sort.key];
        return (a === b ? 0 : a > b ? 1 : -1) * sort.order;
      });
    }

    return filteredTask;
    //第2引数の配列を指定することで、この変数の変化がある度にこの部分の処理が実行されます。
  }, [filterQuery, sort]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="min-h-screen  text-center pb-10  ">
        <input
          type="text"
          name="title"
          className="m-4 border-solid border border-black"
          placeholder="タイトル"
          // value={filterQuery.title || ""}
          // onChange={handleFilter}
        />
        <select
          name="c_id"
          className="m-4 border-solid border border-black"
          // value={filterQuery.c_id}
          // onChange={handleFilter}
        >
          <option value="">カテゴリー選択</option>
          {/* {data[1].map((cate: Category) => {
            return (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            );
          })} */}
        </select>
        <button
          className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
          // onClick={() => handleSort("id")}
        >
          {/* {isSorted ? "登録を古い順に並べ替え" : "登録を新しい順に並べ替え"} */}
        </button>
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          {filteredTask.length ? (
            filteredTask.map((article: Article) => {
              return (
                <div key={article.id} className="">
                  <img
                    className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 rounded w-full object-cover object-center mb-6"
                    src="https://i.imgur.com/lmYYa2s.png"
                  />
                  <div className="text-center">
                    カテゴリー：
                    {article.c_name[0].name}
                  </div>
                  <div className="text-center">{article.title}</div>
                  {/* <div className="text-center">
                                            {moment(article.create).format(
                                                "YYYY年MM月DD日"
                                            )}
                                        </div> */}
                </div>
              );
            })
          ) : (
            <p>該当なし</p>
          )}
        </div>
      </section>
    </AppLayout>
  );
};
export default Articles;
