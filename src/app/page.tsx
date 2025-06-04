import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>
        Here is the{" "}
        <Link href={"/documents/1234"} className="text-blue-500 underline">
          link
        </Link>{" "}
        to the documents
      </p>
    </div>
  );
};

export default Home;
