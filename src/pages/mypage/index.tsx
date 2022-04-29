import AppLayout from "../../components/Layouts/AppLayout";
import { useAuth } from "../../hooks/auth";

const Mypage = () => {
  const { user, logout } = useAuth({ middleware: "guest" });
  const awspath = "https://backend0622.s3.ap-northeast-1.amazonaws.com/";

  return (
    <AppLayout>
      <section className="p-10 text-center">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <p className="text-center m-5 text-2xl">{user?.name}のマイページ</p>
          <p className="text-center m-5 text-2xl">投稿した記事</p>
        </div>
      </section>
    </AppLayout>
  );
};
export default Mypage;
