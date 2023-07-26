import type { NextPage } from "next";
import { Layout } from "layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="p-4">
        <div className="container mx-auto flex flex-col">
          <h1 className="text-2xl text-center">Next + Firebase + Tailwind</h1>
          <p className="mt-4 text-lg text-center">
            Get started with next, firebase and tailwind
          </p>

        </div>
      </main>
    </Layout>
  );
};

export default Home;
