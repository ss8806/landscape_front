import AppLayout from "../../components/Layouts/AppLayout";
import { Key, useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Link } from "react-router-dom";

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
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 0,
      title: "",
      body: "",
      user_id: "",
      category_id: "",
      pic1: "",
      category: "",
      name: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:/api/articles/")
      .then((response) => {
        setArticles(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppLayout>
      <section className="min-h-screen  text-center pb-10  ">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          {articles.map((article) => (
            <div key={article.id}>
              <div>
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
              </div>
              <p>タイトル:{article.title}</p>
              <p>本文:{article.body}</p>
              <p>カテゴリー:{article.category.name}</p>
              {/* {article.cate.map((c_name: { id: any }) => (
                <div key={c_name.id}>
                  <p>カテゴリー:{c_name.id}</p>
                </div>
              ))} */}
              <Link
                to={"/article/" + article.id + "/show"}
                state={{ a_id: article.id }}
                className="m-auto"
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
