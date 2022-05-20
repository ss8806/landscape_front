import AppLayout from "../../components/Layouts/AppLayout";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";

type Article = {
  id: number;
  title: string;
  body: string;
  user_id: any;
  category_id: any;
};

const CreateArticles = () => {
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

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [user_id, setUser_id] = useState<any>("");
  const [category_id, setCategory_id] = useState<any>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <>
      <AppLayout>
        <section className="min-h-screen bg-yellow-400 py-20">
          <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
            <div className="text-center">
              <label htmlFor="inputTitle">タイトル</label>
              <input
                id="inputTitle"
                type="text"
                name="title"
                className="w-3/4 mt-1 mb-1 block mx-auto"
                placeholder="タイトル"
                value={title}
                required
                onChange={handleTitleChange}
              />
              <label htmlFor="inputTitle">カテゴリー</label>
              <input
                className="w-3/4 mt-1 mb-1 block mx-auto"
                value={category_id}
                onChange={handleCategoryChange}
              />
              <label htmlFor="inputBody">本文</label>
              <textarea
                id="inputBody"
                name="body"
                className="w-3/4 h-64 mt-1 mb-1 block mx-auto"
                placeholder="本文"
                value={body}
                required
                onChange={handleBodyChange}
              />
              <button onClick={createNewarticle}>作成</button>
            </div>
          </div>
        </section>
      </AppLayout>
    </>
  );
};
export default CreateArticles;

{
  /* <label>
タイトル:
<input value={title} onChange={handleTitleChange} />
本文
<input value={body} onChange={handleBodyChange} />
カテゴリー
<input value={category_id} onChange={handleCategoryChange} />
</label>
<button onClick={createNewarticle}>作成</button>
<p className="text-center m-5 text-2xl">{user?.name}のページ</p> */
}
