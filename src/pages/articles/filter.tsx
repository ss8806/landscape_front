import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import type { Category } from "../../types/Category";
import type { Article } from "../../types/Article";
import useSWR from "swr";
import moment from "moment";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import React, { SyntheticEvent, useState, useEffect, useMemo } from "react";

const schema = yup.object().shape({
  keyword: yup.string().max(10),
  category: yup.number(),
});

const Filter = () => {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const navigation = useNavigate();
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState(1);
  type FilterState = { filter: string };
  const filterstate = location.state as FilterState; //型を無理やり与える

  const fetcher = () => filterstate;
  const { data, error }: any = useSWR(
    "http://localhost:/api/filter?page=" + pageIndex,
    fetcher
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    // },
  });
  yupResolver(schema);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  // console.log(data);
  // console.log(filterstate);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post("http://localhost:/api/article1", data)
      .then((response) => {
        console.log(response.data);
        navigation("/filter", { state: { filter: response.data } });
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <AppLayout>
      <section className="min-h-screen  text-center pb-10  ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
            placeholder="タイトルを検索"
            defaultValue={""}
            {...register("keyword")}
          />
          <select
            className="w-60 m-4 p-2 bg-white text-base border-solid border border-black"
            {...register("category")}
          >
            <option className="hidden" value="0">
              カテゴリー選択
            </option>
            <option value="0">全て</option>
            {/* {data[1].map((cate: Category) => {
              return (
                <option key={cate.id} value={cate.id}>
                  {cate.name}
                </option>
              );
            })} */}
          </select>
          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
            type="submit"
            value="編集"
          />
        </form>
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {data.filter.data.length ? (
              data.filter.data.map((article: Article) => {
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
        <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
        <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
      </section>
    </AppLayout>
  );
};
export default Filter;