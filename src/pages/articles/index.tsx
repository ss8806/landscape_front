import AppLayout from "../../components/Layouts/AppLayout";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";

type Article = {
  id: number;
  title: string;
  body: string;
  user_id: any;
  category_id: any;
};

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 0,
      title: "",
      body: "",
      user_id: "",
      category_id: "",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:/api/articles/")
      .then((response) => setArticles(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <AppLayout>
      <section className="min-h-screen  text-center pb-10  ">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          {articles.map((article) => (
            <div key={article.id}>
              <img
                id="preview"
                className="d-block mx-auto h-60 h-56"
                src={`${process.env.PUBLIC_URL}/landscape.svg`}
              />
              <p>タイトル:{article.title}</p>
              <p>本文:{article.body}</p>
              <p>カテゴリー:{article.category_id}</p>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};
export default Articles;
