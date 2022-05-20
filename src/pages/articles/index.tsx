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
      <section className="min-h-screen bg-yellow-400 py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
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
