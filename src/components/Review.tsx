import React, { SyntheticEvent, useState, useEffect } from "react";
import axios from "../lib/axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import { apiURL } from "../config.dev";
import { toast } from "react-toastify";

type Props = {
  auth: any;
  a_id: number;
};

export default function Review({ a_id }: Props) {
  const fetcher = () =>
    axios.get(apiURL + "/api/article/" + a_id + "/review").then((res) => {
      return res.data;
    });
  const { data, error }: any = useSWR(
    apiURL + "/api/article/" + a_id + "/review",
    fetcher,
    { suspense: true } // 入れないとエラーがでる
  );
  const id = data[0] ? data[0].id : null;
  let d_value = data[0] ? data[0].rate : null;
  const [value, setValue] = useState<number | null>(d_value);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  const handleSubmit = () => {
    console.log(data);
    axios
      .put(apiURL + "/api/article/" + id + "/review", {
        a_id: a_id,
        value: value,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("レビューしました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("レビューに失敗しました");
      });
  };

  const handleDelete = () => {
    console.log(data);
    axios
      .delete(apiURL + "/api/article/" + id + "/review")
      .then((response) => {
        console.log(response.data);
        toast.success("削除しました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("削除に失敗しました");
      });
  };

  return (
    <div>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(value);
          }}
        />
      </Box>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded m-5 "
          onClick={handleSubmit}
        >
          評価する
        </button>
        {data[0] ? (
          <button
            className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2 px-4 rounded m-5 "
            onClick={handleDelete}
          >
            評価を削除
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
