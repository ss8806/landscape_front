import AppLayout from "../../components/Layouts/AppLayout";
import { useAuth } from "../../hooks/auth";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

const Mypage = () => {
  const { user } = useAuth({ middleware: "auth" });
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";

  const fetcher = () =>
    axios
      .get("http://localhost:/api/mypage")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data, error }: any = useSWR("http://localhost:/api/mypage", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

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
          <Link
            to={"/profile"}
            state={{ user }}
            className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
          >
            プロフィール編集
          </Link>
          <p className="text-center m-5 text-2xl">投稿した記事</p>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {data[0].map((post: any) => {
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
                    className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
                  >
                    編集する
                  </Link>
                </div>
              );
            })}
            <div className="flex m-auto items-center">
              <Link
                to={"/posts"}
                className=" align-middle text-2xl text-blue-500  font-semibold hover:text-blue-700 font-bold "
              >
                投稿一覧へ
              </Link>
            </div>
          </div>

          <p className="text-center m-5 text-2xl">お気に入り</p>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {data[1].map((like: any) => {
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
                        src={`${process.env.PUBLIC_URL}/landscape.svg`}
                        className="d-block mx-auto h-60 h-56"
                      />
                    )}
                  </div>
                  {/* <div className="">
                    カテゴリー：
                    {like.category_id[0].name}
                  </div> */}
                  <div className="">{like.title}</div>

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
            <div className="flex m-auto items-center">
              <Link
                to={"/likes"}
                className="g:h-60 xl:h-56 md:h-64 sm:h-72 xs:h-72 h-72 text-2xl text-blue-500 im-2 px-4 py-2 border border-transparent font-semibold hover:text-blue-700 font-bold py-2 px-4 "
              >
                お気に入り一覧
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default Mypage;
