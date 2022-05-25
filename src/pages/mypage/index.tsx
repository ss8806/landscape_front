import AppLayout from "../../components/Layouts/AppLayout";
import { useAuth } from "../../hooks/auth";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";

const Mypage = () => {
  const { user, logout } = useAuth({ middleware: "guest" });
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const [posts, setPosts] = useState([
    {
      id: 0,
      title: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:/api/mypage")
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <p className="text-center m-5 text-2xl">{user?.name}のマイページ</p>
          <div className="text-center">
            {user?.icon ? (
              <img
                id="preview"
                src={awspath + user.icon}
                className="d-block mx-auto h-60"
              ></img>
            ) : (
              <img
                id="preview"
                className="d-block mx-auto h-60"
                src={`${process.env.PUBLIC_URL}/avatar-default.svg`}
              />
            )}
          </div>
          <button>
            <a href="/profile">プロフィール編集</a>
          </button>
          <p className="text-center m-5 text-2xl">投稿した記事</p>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {posts.map((post: any) => {
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
                        src={`${process.env.PUBLIC_URL}/landscape.svg`}
                        className="d-block mx-auto h-60 h-56"
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
                    className="inline-flex items-center m-2 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                  >
                    編集する
                  </Link>
                </div>
              );
            })}

            <div className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 text-2xl text-blue-600 im-2 px-4 py-2 border border-transparent font-semibold ">
              投稿一覧へ
            </div>
          </div>

          <p className="text-center m-5 text-2xl">お気に入り</p>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {/* {likes.map((like: any) => {
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
                  <div
                    className="inline-flex items-center m-2 px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150"
                    // href={route("show", like.article_id)}
                  >
                    詳細をみる
                  </div>
                </div>
              );
            })} */}
            <div className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 text-2xl text-blue-600 im-2 px-4 py-2 border border-transparent font-semibold ">
              お気に入り一覧へ
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default Mypage;
