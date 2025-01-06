import React from "react";
import Navigationbar from "./components/Navigationbar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <div className="text-3xl font-bold underline">App</div> */}
      <header className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-500 fixed top-0 z-10">
        <h2 className="text-cyan-100 text-center text-sm leading-[5rem] md:2xl">
          JWT AUTH - CRUD - TAILWIND CSS
        </h2>
      </header>
      <section className="flex-grow bg-gradient-to-t from-cyan-100 to-cyan-400 flex flex-col items-center gap-y-1 relative top-20">
        <Navigationbar />
        {/* <main className="bg-orange-200 w-3/4">
            jfrenwi
        </main> */}
      </section>
      <footer className="w-full h-20 bg-gradient-to-r from-blue-500 to-cyan-500 ">
        <h2 className="text-cyan-100 text-center text-sm leading-[5rem] md:2xl">
          JWT AUTH - CRUD - TAILWIND CSS
        </h2>
      </footer>
    </div>
  );
};

export default App;
