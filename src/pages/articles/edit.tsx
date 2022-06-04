import AppLayout from "../../components/Layouts/AppLayout";
import axios from "../../lib/axios";
import type { Category } from "../../types/Category";
import { useAuth } from "../../hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import AleartDialog from "../../components/AlertDialog";
import useSWR from "swr";
import { apiURL } from "../../config.dev";

type State = {
  a_id: number;
};
const schema = yup.object().shape({
  title: yup.string().required("Please enter title").min(1).max(24),
  category_id: yup.number().required("Please enter category"),
  body: yup.string().required("Please enter body").min(1).max(24),
});

const EditArticles = () => {
  useAuth({ middleware: "auth" });
  const navigation = useNavigate();
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const location = useLocation();
  const { a_id } = location.state as State;

  const fetcher = () =>
    axios.get(apiURL + "/api/article/" + a_id + "/edit").then((res) => {
      return res.data;
    });

  const { data, error }: any = useSWR(
    "http://localhost:/api/article/" + a_id + "/edit",
    fetcher
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  yupResolver(schema);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  const oldpic1 = data[0].pic1;

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center">
              <label htmlFor="inputTitle">タイトル</label>
              <input
                // name="name"
                id="inputTitle"
                type="text"
                className="w-3/4 mt-1 mb-1 block mx-auto pl-2"
                placeholder="タイトル"
                defaultValue={data[0].title}
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
                <option value={data[1][0].id} className="hidden">
                  {data[1][0].name}
                </option>
                {data[2].map((category: any) => {
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
                      {(data[0].pic1 && (
                        <img
                          id="preview"
                          src={awspath + data[0].pic1}
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
                  name="pic1"
                  id="pic1"
                  type="file"
                  className="m-auto hidden"
                  accept="image/*"
                  src={data[0].pic1}
                  onChange={imageHander}
                />
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
                defaultValue={data[0].body}
                // value={body}
                // onChange={handleBodyChange}
                {...register("body")}
              />
              <p className="text-red-500">
                {errors.body && "本文は２文字以上入力して下さい。"}
              </p>

              <div className="flex justify-center">
                <input
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
                  type="submit"
                  value="編集"
                />
                <AleartDialog
                  message1="削除する"
                  message2="削除してよろしいですか"
                  message3="削除"
                  clickButton={onDelete}
                ></AleartDialog>
              </div>
            </div>
          </form>
        </div>
      </section>
    </AppLayout>
  );
};
export default EditArticles;
