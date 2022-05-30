import AppLayout from "../../components/Layouts/AppLayout";
import { useEffect, useRef, useState, Suspense, lazy } from "react";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import AleartDialog from "../../components/AlertDialog";

type State = {
  a_id: number;
};

const schema = yup.object().shape({
  title: yup.string().max(24),
  category_id: yup.number(),
  body: yup.string().max(24),
});

const EditArticles1 = () => {
  const { user } = useAuth({ middleware: "auth" });
  const Lazy = lazy(() => import("../../components/Lazy"));
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const location = useLocation();
  const { a_id } = location.state as State;
  const [article, setArticle] = useState<any>([
    {
      id: 0,
      title: "",
      body: "",
      user_id: 0,
      category_id: "",
      pic1: "",
    },
  ]);
  const [c_name, setCname] = useState<any>([
    {
      id: 0,
      name: "",
    },
  ]);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:/api/article/" + a_id + "/edit")
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
    })();
    (async () => {
      await axios
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
    })();
    (async () => {
      await axios
        .get("http://localhost:/api/article/create/")
        .then((response) => {
          setCategories(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    })();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    // defaultValues: {
    // },
  });
  yupResolver(schema);

  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "",
      c_id: 0,
    },
  ]);

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
      imgTag.src = result;
      setValue("pic1", result);
    };
  };

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put("http://localhost:/api/article/" + a_id + "/update", data)
      .then((response) => {
        console.log(response.data);
        navigation("/mypage");
        toast.success("登録に成功しました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("登録に失敗しました");
      });
  };

  const onDelete = () => {
    axios
      .delete("http://localhost:/api/article/" + a_id + "/delete")
      .then((response) => {
        navigation("/mypage");
        toast.success("削除に成功しました。");
      })
      .catch((error) => {
        toast.error("削除に失敗しました");
      });
  };

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
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Suspense fallback={<p>Loading...</p>}>
                  <Lazy />
                  <div className="text-center">
                    <label htmlFor="inputTitle">タイトル</label>
                    <input
                      // name="name"
                      id="inputTitle"
                      type="text"
                      className="w-3/4 mt-1 mb-1 block mx-auto pl-2"
                      placeholder="タイトル"
                      defaultValue={article[0].title}
                      // required
                      {...register("title")}
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
                      // required
                      {...register("category_id")}
                      // onChange={onHandleChangeOption}
                    >
                      <option value={c_name[0].id} className="hidden">
                        {c_name[0].name}
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
                    <div className="mt-5">
                      <label htmlFor="pic1">画像</label>
                    </div>
                    <section className="text-center">
                      <div>
                        <label htmlFor="pic1" className="display: inline-block">
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
                        </label>
                      </div>
                      <input
                        // name="pic1"
                        id="pic1"
                        type="file"
                        className="m-auto"
                        accept="image/*"
                        src={article[0].pic1}
                        // {...register("pic1", { required: true })}
                        onChange={imageHander}
                      />
                      <p className="text-red-500">
                        {/* {errors.pic1 && "写真を登録して下さい。"} */}
                      </p>
                    </section>
                    <div className="mt-5">
                      <label className="" htmlFor="inputBody">
                        本文
                      </label>
                    </div>
                    <textarea
                      id="inputBody"
                      // name="body"
                      className="w-3/4 h-64 mt-1 mb-1 block mx-auto p-2"
                      placeholder="本文"
                      defaultValue={article[0].body}
                      // value={body}
                      // onChange={handleBodyChange}
                      {...register("body")}
                    />
                    <p className="text-red-500">
                      {errors.body && "本文は２文字以上入力して下さい。"}
                    </p>
                    <input
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
                      type="submit"
                      value="編集"
                    />
                    {/* <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-5 "
                      onClick={onDelete}
                    >
                      削除する
                    </button> */}
                    <AleartDialog
                      message1="削除する"
                      message2="削除してよろしいですか"
                      message3="削除"
                      clickButton={onDelete}
                    ></AleartDialog>
                  </div>
                </Suspense>
              </form>
            </>
          )}
        </div>
      </section>
    </AppLayout>
  );
};
export default EditArticles1;
