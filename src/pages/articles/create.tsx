import AppLayout from "../../components/Layouts/AppLayout";
import { SyntheticEvent, useEffect, useState } from "react";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Article = {
  id: number;
  title: string;
  body: string;
  user_id: any;
  category_id: any;
  pic1: any;
};

const schema = yup.object().shape({
  title: yup.string().required("Please enter title").min(2).max(24),
  category_id: yup.number().required("Please enter category"),
  body: yup.string().required("Please enter body").min(2).max(24),
});

const CreateArticles = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Article>();
  const { user } = useAuth({ middleware: "auth" });
  // const [articles, setArticles] = useState<Article[]>([
  //   {
  //     id: 0,
  //     title: "",
  //     body: "",
  //     user_id: "",
  //     category_id: "",
  //     pic1: "",
  //   },
  // ]);

  const [categories, setCategories] = useState<any>([
    {
      id: 0,
      name: "",
      c_id: 0,
    },
  ]);

  let [pic1, setPic1] = useState<any>("");

  useEffect(() => {
    axios
      .get("http://localhost:/api/article/create/")
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);

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
      //   pic1 = result.replace(/data:.*\/.*;base64,/, "");
      pic1 = result;
      //   console.log(pic1);
    };
  };

  const onSubmit = (data: Article) => {
    console.log(data);
    axios
      .post("http://localhost:/api/article/store", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <AppLayout>
      <section className="min-h-screen bg-yellow-400 py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <label htmlFor="inputTitle">タイトル</label>
              <input
                id="inputTitle"
                type="text"
                // name="title"
                className="w-3/4 mt-1 mb-1 block mx-auto"
                placeholder="タイトル"
                // value={title}
                required
                // onChange={handleTitleChange}
                {...register("title", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              />
              <p className="text-red-500">
                {errors.title && "タイトルは２文字以上入力して下さい。"}
              </p>

              <label htmlFor="inputTitle">カテゴリー</label>
              <select
                id="inputTitle"
                // name="category_id"
                className="w-3/4 mt-1 mb-1 block mx-auto"
                required
                {...register("category_id", { required: true })}
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
              <p className="text-red-500">
                {errors.category_id && "カテゴリーを入力して下さい"}
              </p>

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
                  // name="pic1"
                  type="file"
                  className="m-auto"
                  accept="image/*"
                  {...register("pic1", { required: true })}
                  onChange={imageHander}
                />
              </section>

              <label htmlFor="inputBody">本文</label>
              <textarea
                id="inputBody"
                // name="body"
                className="w-3/4 h-64 mt-1 mb-1 block mx-auto"
                placeholder="本文"
                // value={body}
                // onChange={handleBodyChange}
                {...register("body", {
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                })}
              />
              <p className="text-red-500">
                {errors.body && "本文は２文字以上入力して下さい。"}
              </p>
              <input type="submit" value="登録" />
              {/* <button onClick={createNewarticle}>作成</button> */}
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};
export default CreateArticles;
