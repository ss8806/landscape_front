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
  let d_value = data[0] ? data[0].rate : null;
  const [value, setValue] = useState<number | null>(d_value);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading......</div>;
  console.log(data);

  const onSubmit = (data: any) => {
    console.log(data);
    axios
      .put(apiURL + "/api/article/" + a_id + "review", {
        value: value,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("評価しました。");
      })
      .catch((error) => {
        console.log(error.data);
        toast.error("評価に失敗しました");
      });
  };

  const onDelete = () => {
    axios
      .delete(apiURL + "/api/article/" + a_id + "/review")
      .then((response) => {
        toast.success("削除に成功しました。");
      })
      .catch((error) => {
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
        <Typography component="legend">評価する</Typography>
        <Rating name="controlled" value={value} />
      </Box>
      <div className="mt-5"></div>
    </div>
  );
}
