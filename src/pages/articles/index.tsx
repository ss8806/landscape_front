import AppLayout from "../../components/Layouts/AppLayout";
import {
  useEffect,
  useState,
  Suspense,
  lazy,
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

type Article = {
  id: number;
  title: string;
  body: string;
  user_id: any;
  category_id: any;
  pic1: any;
  category: any;
  name: any;
};

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

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="min-h-screen  text-center pb-10  ">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          {data.map((article: any) => (
            <div key={article.article_id}>
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
              <p>タイトル:{article.title}</p>
              <p>カテゴリー:{article.c_name}</p>
              <Link
                to={"/article/" + article.id + "/show"}
                state={{ a_id: article.id }}
                className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 "
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};
export default Articles;
