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
  const [categories, setCategories] = useState<any>([
    {
      id: 0,
      name: "",
      c_id: 0,
    },
  ]);
  const [selectedOption, setSelectedOption]: any = useState(null);
  //   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setCategories(e.currentTarget);
  //   };

  useEffect(() => {
    axios
      .get("http://localhost:/api/article/create/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  let [pic1, setPic1] = useState<string>("");
  const handlePic1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPic1(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (): void => {
    axios
      .post("http://localhost:/api/article/store/", {
        title: title,
        body: body,
        user_id: user?.id,
        // pic1: pic1,
        category_id: selectedOption,
      })
      .then((response) => {
        setArticles([...articles, response.data]);
      })
      .then(() => {
        setTitle("");
        setBody("");
        setUser_id("");
        setSelectedOption("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const imageHander = (event: any) => {
    if (event.target.files === null) {
      return;
    }
    const file = event.target.files[0];
    if (file === null) {
      return;
    }
    let imgTag = document.getElementById("preview") as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      // result.replace(/data:.*\/.*;base64,/, "");
      imgTag.src = result;
      pic1 = result.replace(/data:.*\/.*;base64,/, "");
      console.log(event.target.files[0]);
    };
    // setData(event.target.name as "pic1", event.target.src);
  };

  return (
    <AppLayout>
      <section className="min-h-screen bg-yellow-400 py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <div className="text-center">
            <form>
              <label htmlFor="inputTitle">タイトル</label>
              <input
                id="inputTitle"
                type="text"
                name="title"
                className="w-3/4 mt-1 mb-1 block mx-auto"
                placeholder="タイトルを検索"
                value={title}
                required
                onChange={handleTitleChange}
              />
              <label htmlFor="inputTitle">カテゴリー</label>
              <select
                id="inputTitle"
                name="category_id"
                className="w-3/4 mt-1 mb-1 block mx-auto"
                // value={data.category_id}
                required
                defaultValue={selectedOption}
                onChange={setSelectedOption}
              >
                <option value="" className="hidden">
                  選択してください
                </option>
                {categories.map((category: any) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="inputBody">画像</label>
              <section className="text-center">
                <div>
                  {pic1 || (
                    <img
                      id="preview"
                      className="d-block mx-auto h-60 h-56"
                      src={`${process.env.PUBLIC_URL}/landscape.svg`}
                    />
                  )}
                </div>
                <input
                  name="pic1"
                  type="file"
                  // src={data.pic1}
                  className="m-auto"
                  accept="image/*"
                  onChange={imageHander}
                />
              </section>

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
              <button className="ml-4" type="submit" onClick={handleSubmit}>
                投稿する
              </button>
            </form>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};
export default CreateArticles;
