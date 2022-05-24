import AppLayout from "../../components/Layouts/AppLayout";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

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
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const location = useLocation();
  const { a_id } = location.state as State;
  const [article, setArticle] = useState<any>([
    {
      id: 0,
      title: "",
      body: "",
      user_id: "",
      category_id: "",
      pic1: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:/api/article/" + a_id + "/show")
      //.get("http://localhost:/api/article/90/show")
      .then((response) => {
        setArticle(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppLayout>
      <section className="min-h-screen bg-yellow-400 py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="text-center">
            <label htmlFor="inputTitle">タイトル</label>
            <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
              {article[0].title}
            </div>
            <label htmlFor="inputTitle">カテゴリー</label>
            <div className="w-3/4 mt-1 mb-1 block mx-auto pl-2">
              {article[0].title}
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
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default ShowArticle;
