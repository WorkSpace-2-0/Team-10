import Header from "@/components/Header";
import { Selection } from "./_components/Selection";
import { TeamsData } from "./_components/TeamsData";

const teamManagment = () => {
  return (
    <div className="w-screen h-screen bg-[#FAFAFA]">
      <Header />
      <div className="max-w-7xl w-full h-auto flex justify-center mt-10 -ml-8">
        <div className="w-4/5">
          <h1 className="text-3xl">Таны баг "Тэнгэрийн ташуур 2.0"</h1>
          <Selection />
          <TeamsData />
        </div>
      </div>
    </div>
  );
};

export default teamManagment;
