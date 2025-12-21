import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gray-800 text-white px-6 py-4">
      <div className="mx-auto max-w-6xl ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            <Link to={"/"}>CreatorVerse</Link>
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/add"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span> Add Creator</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
