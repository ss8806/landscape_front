import React, { useState, SyntheticEvent } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import image1 from "./logo192.png";

type Props = {
  icon: any;
};

export default function EditIcon({ icon }: Props) {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";
  const noimage: any = image1;
  const imageHander = (event: any) => {
    const file = event.target.files[0];
    let imgTag = document.getElementById("preview") as HTMLImageElement;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      imgTag.src = result;
      icon = result;
      // console.log(icon);
    };
    icon = "";
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    axios
      .put("http://localhost:/api/editIcon", {
        icon: icon,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("登録に成功しました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("登録に失敗しました");
      });
  };

  return (
    <section className="text-center">
      <section className="text-center">
        <div>
          <label htmlFor="pic1" className="display: inline-block">
            <div>
              {(icon && (
                <img
                  id="preview"
                  src={awspath + icon}
                  className="d-block mx-auto h-60 h-56"
                ></img>
              )) || (
                <img
                  id="preview"
                  className="d-block mx-auto h-60 h-56"
                  src={`${process.env.PUBLIC_URL}/avatar-default.svg`}
                />
              )}
            </div>
          </label>
        </div>
        <input
          // name="pic1"
          id="pic1"
          type="file"
          className="m-auto hidden"
          accept="image/*"
          src={icon}
          // {...register("pic1", { required: true })}
          onChange={imageHander}
        />
        <p className="text-red-500">
          {/* {errors.pic1 && "写真を登録して下さい。"} */}
        </p>
      </section>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5 "
        type="submit"
        onClick={onSubmit}
      >
        アイコンを変更
      </button>
    </section>
  );
}
