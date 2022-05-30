import React, { SyntheticEvent, useState } from "react";
import { useAuth } from "../../hooks/auth";
import AppLayout from "../../components/Layouts/AppLayout";

type Props = {
  auth: any;
  user: any;
  likes: any;
};

export default function Mypage({ auth, user, likes }: Props) {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <h1 className="text-2xl mb-6">投稿した記事</h1>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {likes.map((like: any) => {
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
                        src="/images/landscape.svg"
                        className="d-block mx-auto h-60 h-56"
                      />
                    )}
                  </div>
                  <div className="">
                    カテゴリー：
                    {like.category_id[0].name}
                  </div>
                  <div className="">{like.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
