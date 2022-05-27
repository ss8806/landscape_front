import AppLayout from "../../components/Layouts/AppLayout";
import { SyntheticEvent, useEffect, useState, Suspense, lazy } from "react";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useLocation } from "react-router-dom";
import LikeButton from "../../components/LikeButton";

type Article = {
  id: number;
  title: string;
  body: string;
  user_id: any;
  category_id: any;
  pic1: any;
};
type State = {
  a_id: number;
};

const ShowArticle = () => {
  const Lazy = lazy(() => import("../../components/Lazy"));
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const location = useLocation();
  const { a_id } = location.state as State;
  const { user } = useAuth({ middleware: "guest" });
  const [article, setArticle] = useState([
    {
      id: 0,
      title: "",
      body: "",
      user_id: "",
      category_id: "",
      pic1: "",
      name: "",
    },
  ]);

  const [c_name, setCname] = useState([
    {
      id: 0,
      name: "",
    },
  ]);
  const [u_name, setUname] = useState([
    {
      user: "",
    },
  ]);
  const [liked, setLiked] = useState<boolean>(false);

  const [endpoint, setEndpoint] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:/api/article/" + a_id + "/liked")
      .then((response) => {
        setLiked(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:/api/article/" + a_id + "/show")
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:/api/article/" + a_id + "/c_name")
      .then((response) => {
        setCname(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:/api/article/" + a_id + "/u_name")
      .then((response) => {
        setUname(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get("http://localhost:/api/article/" + a_id + "/endpoint")
      .then((response) => {
        setEndpoint(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AppLayout>
      <section className="min-h-screen bg-yellow-400 py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          {error ? (
            <p>データを取得できませんでした。</p>
          ) : loading ? (
            <Suspense fallback={<p>Loading...</p>}>
              <Lazy />
            </Suspense>
          ) : (
            <div className="text-center">
              <label htmlFor="inputTitle">タイトル</label>
              {/* {liked ? "true" : "false"} */}
              <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
                {article[0].title}
              </div>
              <label htmlFor="inputTitle">カテゴリー</label>
              <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
                {c_name[0].name}
              </div>
              <label htmlFor="inputBody">画像</label>
              <section className="text-center">
                <div>
                  <div>
                    {(article[0].pic1 && (
                      <img
                        id="preview"
                        src={awspath + article[0].pic1}
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
                {article[0].body}
              </div>

              {user ? (
                <LikeButton
                  article={article}
                  auth={user}
                  is_liked={liked}
                  endpoint={endpoint}
                />
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};
export default ShowArticle;
