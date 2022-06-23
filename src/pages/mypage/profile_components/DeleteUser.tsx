import axios from "../../../lib/axios";
import { toast } from "react-toastify";
import { apiURL } from "../../../config.dev";
import AleartDialog from "../../../components/AlertDialog";

export default function DeleteUser() {
  const onDelete = async () => {
    await axios
      .delete(apiURL + "/api/deleteUser")
      .then((response) => {
        console.log(response.data);
        if (response.data === "delete") {
          toast.success("退会に成功しました。");
          setTimeout(() => {
            window.location.pathname = "/";
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error("退会処理に失敗しました");
      });
  };

  return (
    <section className="text-center">
      <AleartDialog
        message1="退会する"
        message2="退会してよろしいですか"
        message3="退会"
        clickButton={onDelete}
      ></AleartDialog>
    </section>
  );
}
