import React, { SyntheticEvent, useState } from "react";
import { useAuth } from "../../hooks/auth";
import AppLayout from "../../components/Layouts/AppLayout";
import useSWR from "swr";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import LikeButton from "../../components/LikeButton";
import { apiURL } from "../../config.dev";

export default function Likes() {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const user = useAuth({ middleware: "auth" });
  const fetcher = () =>
    axios.get(apiURL + "/api/showLikes").then((res) => {
      return res.data;
    });
  const { data, error }: any = useSWR(apiURL + "/api/showLikes", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);
  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <h1 className="text-2xl mb-6">お気に入りの記事</h1>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {data.map((like: any) => {
              return (
                <div key={like.id} className="">
                  <div>
                    {(like.pic1 && (
                      <img
                        id="preview"
                        src={awspath + like.pic1}
                        className="d-block mx-auto h-60 h-56"
                      ></img>
                    )) || (
                      <img
                        id="preview"
                        className="d-block mx-auto h-60"
                        src={`${process.env.PUBLIC_URL}/landscape.svg`}
                      />
                    )}
                  </div>
                  {/* <div className="">
                    カテゴリー：
                    {like.category_id[0].name}
                  </div> */}
                  <div className="">{like.title}</div>
                  <div>
                    <LikeButton
                      article={data[0]}
                      auth={user}
                      is_liked={true}
                      endpoint={apiURL + "/api/article/" + data[0].id + "/like"}
                    />
                  </div>
                  <Link
                    to={"/article/" + like.id + "/show"}
                    state={{ a_id: like.id }}
                    className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
                  >
                    詳細をみる
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
