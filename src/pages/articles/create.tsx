import AppLayout from "../../components/Layouts/AppLayout";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const schema = yup.object().shape({
  title: yup.string().required("Please enter title").min(1).max(24),
  category_id: yup.number().required("Please enter category"),
  body: yup.string().required("Please enter body").min(1).max(24),
});

const CreateArticles = () => {
  useAuth({ middleware: "auth" });
  const navigation = useNavigate();
  const [pic1, setPic1] = useState<any>("");
  const fetcher = () =>
    axios
      .get("http://localhost:/api/article/create/")
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  const { data, error }: any = useSWR(
    "http://localhost:/api/article/create/",
    fetcher
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();
  yupResolver(schema);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

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
      // pic1 = result;
      // console.log(pic1);
      setValue("pic1", result);
    };
  };

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .post("http://localhost:/api/article/store", data)
      .then((response) => {
        console.log(response.data);
        navigation("/");
        toast.success("登録に成功しました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("登録に失敗しました");
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
                className="w-3/4 mt-1 mb-1 block mx-auto pl-2"
                placeholder="タイトル"
                required
                {...register("title", {
                  required: true,
                  minLength: 2,
                  maxLength: 20,
                })}
              />
              <p className="text-red-500">
                {errors.title && "タイトルは２文字以上入力して下さい。"}
              </p>
              <div className="mt-5">
                <label htmlFor="select">カテゴリー</label>
              </div>
              <select
                id="select"
                className="w-3/4 mt-1 mb-1 block mx-auto pl-2 ;"
                {...register("category_id", { required: true })}
              >
                <option value="" className="hidden">
                  選択してください
                </option>
                {data.map((category: any) => {
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
              <div className="mt-5">
                <label htmlFor="pic1">画像</label>
              </div>
              <section className="text-center">
                <div>
                  <label htmlFor="pic1" className="display: inline-block">
                    {pic1 || (
                      <img
                        id="preview"
                        className="d-block mx-auto h-60 h-56"
                        src={`${process.env.PUBLIC_URL}/landscape.svg`}
                      />
                    )}
                  </label>
                </div>
                <input
                  // name="pic1"
                  id="pic1"
                  type="file"
                  className="m-auto"
                  accept="image/*"
                  required
                  {...register("pic", { required: true })}
                  onChange={imageHander}
                />
                <p className="text-red-500">
                  {errors.pic1 && "写真を登録して下さい。"}
                </p>
              </section>
              <div className="mt-5">
                <label className="" htmlFor="inputBody">
                  本文
                </label>
              </div>
              <textarea
                id="inputBody"
                className="w-3/4 h-64 mt-1 mb-1 block mx-auto p-2"
                placeholder="本文"
                {...register("body", {
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                })}
              />
              <p className="text-red-500">
                {errors.body && "本文は２文字以上入力して下さい。"}
              </p>
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
                type="submit"
                value="登録"
              />
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};
export default CreateArticles;
