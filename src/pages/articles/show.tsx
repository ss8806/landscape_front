import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";
import LikeButton from "../../components/LikeButton";
import useSWR from "swr";

type State = {
  a_id: number;
};

const ShowArticle = () => {
  const { user } = useAuth({ middleware: "guest" });
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const location = useLocation();
  const { a_id } = location.state as State;

  const fetcher = () =>
    axios
      .get("http://localhost:/api/article/" + a_id + "/show")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data, error }: any = useSWR(
    "http://localhost:/api/article/" + a_id + "/show",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="min-h-screen bg-yellow-400 py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="text-center">
            <label htmlFor="inputTitle">タイトル</label>
            <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
              {data[0].title}
            </div>
            <label htmlFor="inputTitle">カテゴリー</label>
            <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
              {data[1][0].name}
            </div>
            <label>投稿者</label>
            <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
              {data[2][0].name}
            </div>
            <section className="text-center">
              <div>
                <div>
                  {(data[0].pic1 && (
                    <img
                      id="preview"
                      src={awspath + data[0].pic1}
                      className="d-block mx-auto h-60 h-56"
                    ></img>
                  )) || (
                    <img
                      id="preview"
                      className="d-block mx-auto h-60 h-56"
                      src={`${process.env.PUBLIC_URL}/landscape.svg`}
                    />
                  )}
                </div>
              </div>
            </section>
            <label htmlFor="inputBody">本文</label>
            <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
              {data[0].body}
            </div>

            {user ? (
              <LikeButton
                article={data[0]}
                auth={user}
                is_liked={data[3]}
                endpoint={data[4]}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default ShowArticle;
