import React, { SyntheticEvent, useReducer, useState } from "react";

type Props = {
  icon: any;
};

export default function EditIcon({ icon }: Props) {
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";

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
      icon = result.replace(/data:.*\/.*;base64,/, "");
      // console.log(icon);
    };
  };
  const handleSubmitIcon = async (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <section className="text-center">
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
            src={`${process.env.PUBLIC_URL}/avatar-default.svg`}
            className="d-block mx-auto h-60 h-56"
          />
        )}
      </div>
      <form onSubmit={handleSubmitIcon}>
        <input
          name="icon" // nameを間違えると画像がS3に送信されないので注意
          type="file"
          src={icon}
          className="m-auto"
          accept="image/png, image/jpeg, image/gif"
          onChange={imageHander}
        />
        <div>
          <button type="submit">アイコンを変更</button>
        </div>
      </form>
    </section>
  );
}
