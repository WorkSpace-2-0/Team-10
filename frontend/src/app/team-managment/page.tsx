import Header from "src/components/Header";
import { TeamsData } from "./_components/TeamsData";

const teamManagment = () => {
  return (
    <div className="w-screen h-screen bg-[#FAFAFA]">
      <Header />
      <div className="max-w-7xl w-full h-auto flex justify-center mt-12 -ml-8">
        <div className="w-4/5">
          <p className="font-semibold leading-9 text-black text-3xl">Таны баг "Тэнгэрийн ташуур 2.0"</p>
          <TeamsData />
        </div>
      </div>
    </div>
  );
};

export default teamManagment;
