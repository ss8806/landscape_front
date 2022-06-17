import AppLayout from "../../components/Layouts/AppLayout";
import Review from "../../components/Review";
import AvgRate from "../../components/AvgRate";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";
import LikeButton from "../../components/LikeButton";
import useSWR from "swr";
import { apiURL } from "../../config.dev";

type State = {
  a_id: number;
};

const ShowArticle = () => {
  const { user } = useAuth({ middleware: "guest" });
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const location = useLocation();
  const { a_id } = location.state as State;

  const fetcher = () =>
    axios.get(apiURL + "/api/article/" + a_id + "/show").then((res) => {
      return res.data;
    });
  const { data, error }: any = useSWR(
    apiURL + "/api/article/" + a_id + "/show",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  return (
    <AppLayout>
      <section className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="text-4xl font-bold from-current mb-8">
            <section>
              <div>
                <div>
                  {(data[0].pic1 && (
                    <img
                      id="preview"
                      src={awspath + data[0].pic1}
                      className="d-block mx-auto h-120"
                    ></img>
                  )) || (
                    <img
                      id="preview"
                      className="d-block mx-auto h-120"
                      src={`${process.env.PUBLIC_URL}/landscape.svg`}
                    />
                  )}
                </div>
              </div>
            </section>
            <section className="w-1/2 m-auto">
              <div className="m-5">
                <AvgRate avgrate={data[0].avgrate}></AvgRate>
              </div>
              <p className="m-5">タイトル：{data[0].title}</p>
              <p className="m-5">カテゴリー：{data[1][0].name}</p>
              <p className="m-5">
                投稿者：
                {data[2][0].icon ? (
                  <img
                    id="preview"
                    src={awspath + data[2][0].icon}
                    className="inline-block h-20 p-2"
                  ></img>
                ) : (
                  <img
                    src={`${process.env.PUBLIC_URL}/avatar-default.svg`}
                    className="inline-block h-20 p-2"
                  />
                )}
                {data[2][0].name}
              </p>
              <p className="m-5">本文：{data[0].body}</p>
              <div className="m-10">
                {user ? (
                  <LikeButton
                    article={data[0]} // articleモデルのlikedで必要
                    auth={user} // 同上
                    is_liked={data[3]} // true or false
                    // endpoint={data[4]} // apiURL + "/api/article/1/like"
                    endpoint={apiURL + "/api/article/" + a_id + "/like"}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="m-5">
                {user ? <Review auth={user} a_id={a_id}></Review> : ""}
              </div>
            </section>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default ShowArticle;
