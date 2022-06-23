import React, { SyntheticEvent, useState, useEffect, Suspense } from "react";
import axios from "../lib/axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import useSWR from "swr";
import { apiURL } from "../config.dev";
import { toast } from "react-toastify";

type Props = {
  auth: any;
  article: any;
  a_id: number;
};

export default function Review({ a_id }: Props) {
  const fetcher = () =>
    axios.get(apiURL + "/api/review/" + a_id + "/review").then((res) => {
      return res.data;
    });
  const { data, error }: any = useSWR(
    apiURL + "/api/review/" + a_id + "/review",
    fetcher,
    {
      suspense: true,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404では再試行しない。
        if (error.status === 404) return;
        // 再試行は3回までしかできません。
        if (retryCount >= 3) return;
        // 5秒後に再試行します。
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
  const id = data[0] ? data[0].id : null; // reviewsテーブルのid
  let d_value = data[0] ? data[0].rate : null;
  const [value, setValue] = useState<number | null>(d_value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  const handleSubmit = () => {
    console.log(data);
    axios
      .put(apiURL + "/api/review/" + id + "/review", {
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
      .delete(apiURL + "/api/review/" + a_id + "/review")
      .then((response) => {
        console.log(response.data);
        setValue(null);
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("削除対象が見つかりません。");
      });
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
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
          }}
        />
      </Box>
      <div className="flex justify">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded m-5 "
          onClick={handleSubmit}
        >
          評価する
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-2 px-4 rounded m-5 "
          onClick={handleDelete}
        >
          評価をリセット
        </button>
      </div>
    </Suspense>
  );
}
