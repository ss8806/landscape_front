import GuestLayout from "../../components/Layouts/GuestLayout";
import { useAuth } from "../../hooks/auth";
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
  const { user } = useAuth({ middleware: "auth" });
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

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user_id, setUser_id] = useState<any>("");
  const [category_id, setCategory_id] = useState<any>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory_id(e.target.value);
  };

  const createNewarticle = (): void => {
    axios
      .post("http://localhost:/api/article/store", {
        title: title,
        body: body,
        user_id: user?.id,
        category_id: category_id,
      })
      .then((response) => {
        setArticles([...articles, response.data]);
      })
      .then(() => {
        setTitle("");
        setBody("");
        setUser_id("");
        setCategory_id("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletearticle = (id: number) => {
    axios
      .delete(`http://localhost:/api/article/${id}/delete`)
      .then((response) => {
        console.log(response);
        setArticles(articles.filter((article) => article.id !== id));
      })
      .catch((error) => console.log(error));
  };

  const modifyarticle = (id: number) => {
    axios
      .post(`http://localhost:/api/article/${id}/update`, {
        title: title,
        body: body,
        category_id: category_id,
      })
      .then((response) => {
        setArticles(response.data);
      })
      .then(() => {
        setTitle("");
        setBody("");
        setCategory_id("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <GuestLayout>
        <section className="min-h-screen  text-center pb-10  ">
          <div className="container mx-auto p-12 bg-gray-100 rounded-xl"></div>
          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {articles.map((article) => (
              <>
                <li key={article.id}>
                  タイトル:{article.title}
                  本文:{article.body}
                  カテゴリー:{article.category_id}
                  <button onClick={() => deletearticle(article.id)}>
                    削除
                  </button>
                  <button onClick={() => modifyarticle(article.id)}>
                    更新
                  </button>
                </li>
              </>
            ))}
          </div>
        </section>
        <label>
          タイトル:
          <input value={title} onChange={handleTitleChange} />
          <input value={body} onChange={handleBodyChange} />
          <input value={category_id} onChange={handleCategoryChange} />
        </label>
        <button onClick={createNewarticle}>作成</button>
        <p className="text-center m-5 text-2xl">{user?.name}のページ</p>
      </GuestLayout>
    </>
  );
};
export default Articles;
