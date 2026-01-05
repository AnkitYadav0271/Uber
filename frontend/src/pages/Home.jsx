import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="bg-cover bg-[url('https://images.unsplash.com/photo-1572590133031-14ce14db63c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-center h-screen flex pt-8 justify-between flex-col w-full bg-red-400">
        <img
          className="w-16 ml-7"
          src="https://icon2.cleanpng.com/lnd/20241123/fe/01a0c7a4bc31fd14d50f86a45d55c0.webp"
          alt="uber logo"
        />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold">Get Started with Rider</h2>
          <Link
            to={"/login"}
            className="bg-black flex justify-center items-center text-white py-3 mt-4 rounded w-full"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
