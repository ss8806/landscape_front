import React, { SyntheticEvent, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
    auth: any;
    article: any;
    initial_is_liked: boolean;
    endpoint: string;
};

export default function LikeButton({ initial_is_liked, endpoint }: Props) {
    let [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let [isLiked, setLiked] = useState(initial_is_liked);

    const handleLike = async (e: SyntheticEvent) => {
        e.preventDefault();
        // web.phpよりarticle/{article}/like ルートパラメータに注意
        await axios.put(endpoint);
        // 以下でも良い
        // await axios.put("like", {
        //     article: article,
        // });
        setLiked(!isLiked);
        handleOpen();
        // alert("気になるリストに登録しました");
    };

    const handleUnLike = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.delete(endpoint);
        setLiked(!isLiked);
        handleOpen();
        // alert("気になるリストから削除しました");
    };

    const handleClickLike = isLiked ? handleUnLike : handleLike;

    return (
        <button
            type="button"
            className="c-btn c-btn__like "
            onClick={handleClickLike}
        >
            {/* <div> {isLiked ? "解除" : "気になる"}</div> */}
            <div>
                {isLiked ? (
                    <>
                        <svg
                            className="fill-current h-8 w-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        {open && (
                            <Snackbar
                                open={open}
                                autoHideDuration={3000}
                                onClose={handleClose}
                            >
                                <Alert severity="success">
                                    気になるリストに登録しました
                                </Alert>
                            </Snackbar>
                        )}
                    </>
                ) : (
                    <>
                        <svg
                            className="h-8 w-8 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>

                        {open && (
                            <Snackbar
                                open={open}
                                autoHideDuration={3000}
                                onClose={handleClose}
                            >
                                <Alert severity="success">
                                    気になるリストから削除しました
                                </Alert>
                            </Snackbar>
                        )}
                    </>
                )}
            </div>
        </button>
    );
}
