import AppLayout from "../../components/Layouts/AppLayout";
import Review from "../../components/Review";
import Pager from "../../components/Pager";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import type { Category } from "../../types/Category";
import type { Article } from "../../types/Article";
import useSWR from "swr";
import moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState, useRef } from "react";
import { apiURL } from "../../config.dev";

const schema = yup.object().shape({
  keyword: yup.string().max(10),
  category: yup.number(),
});

const Filter = () => {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const [pageIndex, setPageIndex] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const inputEl = useRef<any>("");
  const categoryEl = useRef<any>("");

  const fetcher = () =>
    axios
      .get(
        apiURL +
          "/api/articles?keyword=" +
          keyword +
          "&category=" +
          category +
          "&page=" +
          pageIndex
      )

      .then((res) => {
        return res.data;
      });
  const { data, error }: any = useSWR(
    apiURL +
      "/api/articles?keyword=" +
      keyword +
      "&category=" +
      category +
      "&page=" +
      pageIndex,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404では再試行しない。
        if (error.status === 404) return;
        // 再試行は3回までしかできません。
        if (retryCount >= 3) return;
        // 5秒後に再試行します。
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  yupResolver(schema);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  const onSubmit = () => {
    setKeyword(inputEl.current.value);
    setCategory(categoryEl.current.value);
    setPageIndex(0);
  };

  const onReset = () => {
    setKeyword("");
    setCategory("");
    setPageIndex(0);
  };

  return (
    <AppLayout>
      <section className="min-h-screen p-50 text-center pb-10  ">
        <div className="flex justify-center">
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
              placeholder="タイトルを検索"
              defaultValue={keyword}
              ref={inputEl}
            />

            <select
              className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
              ref={categoryEl}
              defaultValue={category}
            >
              <option className="hidden" value="">
                カテゴリー選択
              </option>
              <option value="">全て</option>
              {data[1].map((cate: Category) => {
                return (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                );
              })}
            </select>
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
              type="submit"
              value="検索"
            />
          </form>
          <form onSubmit={handleSubmit(onReset)}>
            <input
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-5 "
              type="submit"
              value="リセット"
            />
          </form>
        </div>
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {data[0].data.length ? (
              data[0].data.map((article: Article) => {
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
        <Pager
          links={data[0].links}
          c_page={data[0].current_page}
          setPageIndex={setPageIndex}
        />
        {data[0].current_page} / {data[0].last_page}
      </section>
    </AppLayout>
  );
};
export default Filter;
