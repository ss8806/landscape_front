import React, { SyntheticEvent, useState, useEffect } from "react";
import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { useAuth } from "../../hooks/auth";

const Posts = () => {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  useAuth({ middleware: "auth" });
  const fetcher = () =>
    axios
      .get("http://localhost:/api/showPosts")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data, error }: any = useSWR(
    "http://localhost:/api/showPosts",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <h1 className="text-2xl mb-6">投稿した記事</h1>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {data.map((post: any) => {
              return (
                <div key={post.id} className="">
                  <div>
                    {(post.pic1 && (
                      <img
                        id="preview"
                        src={awspath + post.pic1}
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
                    {post.category_id[0].name}
                  </div> */}
                  <div className="">{post.title}</div>
                  <Link
                    to={"/article/" + post.id + "/edit"}
                    state={{ a_id: post.id }}
                    className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
                  >
                    編集する
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Posts;
