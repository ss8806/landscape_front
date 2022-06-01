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
    fetcher,
    { suspense: true }
  );

  const [filterQuery, setFilterQuery] = useState<any>({});
  // ソート条件
  const [sort, setSort] = useState<any>({});

  let [isSorted, setSorted] = useState<boolean>(true);

  const filteredTask = useMemo(() => {
    let filteredTask = data[0];

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
      if (
        filterQuery.category_id &&
        row.category_id !== parseInt(filterQuery.category_id)
      ) {
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

  // 入力した情報をfilterQueryに入れる
  const handleFilter = (e: any) => {
    const { name, value } = e.target;
    setFilterQuery({ ...filterQuery, [name]: value });
  };

  // 選択したカラムをSortに入れる;
  const handleSort = (column: any) => {
    if (sort.key === column) {
      // カラムを設定した場合は逆順になるようにorderをマイナスにします。
      setSorted(!isSorted);
      setSort({ ...sort, order: -sort.order });
    } else {
      setSorted(!isSorted);
      setSort({
        key: column,
        order: 1,
      });
    }
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="min-h-screen  text-center pb-10  ">
        <input
          type="text"
          name="title"
          className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
          placeholder="タイトルを検索"
          value={filterQuery.title || ""}
          onChange={handleFilter}
        />
        <select
          name="category_id"
          className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
          value={filterQuery.category_id}
          onChange={handleFilter}
        >
          <option value="">カテゴリー選択</option>
          {data[1].map((cate: Category) => {
            return (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            );
          })}
        </select>
        <button
          className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
          onClick={() => handleSort("updated")}
        >
          {isSorted ? "古い順に並べ替え" : "新しい順に並べ替え"}
        </button>
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {filteredTask.length ? (
              filteredTask.map((article: Article) => {
                return (
                  <div key={article.article_id} className="">
                    {(article.pic1 && (
                      <img
                        id="preview"
                        src={awspath + article.pic1}
                        className="d-block mx-auto h-60 h-56"
                      ></img>
                    )) || (
                      <img
                        id="preview"
                        className="d-block mx-auto h-60 h-56"
                        src={`${process.env.PUBLIC_URL}/landscape.svg`}
                      />
                    )}
                    <div className="text-center">
                      カテゴリー：
                      {article.c_name}
                    </div>
                    <div className="text-center">{article.title}</div>
                    <div className="text-center">
                      更新日：{moment(article.updated).format("YYYY年MM月DD日")}
                    </div>
                    <Link
                      to={"/article/" + article.article_id + "/show"}
                      state={{ a_id: article.article_id }}
                      className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 "
                    >
                      詳細を見る
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>該当なし</p>
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default Articles;
