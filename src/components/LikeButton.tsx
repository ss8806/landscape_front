import React, {
  SyntheticEvent,
  useState,
  useEffect,
  lazy,
  Suspense,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  auth: any;
  article: any;
  is_liked: boolean;
  endpoint: string;
};

axios.defaults.withCredentials = true; // 設定しないと419エラーがでる

const Lazy = lazy(() => import("./Lazy"));

export default function LikeButton({ is_liked, endpoint }: Props) {
  let [liked, setLiked] = useState<boolean>(is_liked);

  useEffect(() => {
    setLiked(is_liked);
  }, [is_liked]);

  const handleLike = async (e: SyntheticEvent) => {
    e.preventDefault();
    // web.phpよりarticle/{article}/like ルートパラメータに注意
    await axios.put(endpoint);
    setLiked(!liked);
    toast.success("気になるリストに登録しました");
  };

  const handleUnLike = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.delete(endpoint);
    setLiked(!liked);
    toast.error("気になるリストから削除しました");
  };

  const handleClickLike = liked ? handleUnLike : handleLike;

  return (
    <button
      type="button"
      className="c-btn c-btn__like "
      onClick={handleClickLike}
    >
      <Suspense fallback={<p>Loading...</p>}>
        <Lazy />
        <div>
          {liked ? (
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
            </>
          )}
        </div>
      </Suspense>
    </button>
  );
}
