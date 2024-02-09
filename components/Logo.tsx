import Link from "next/link";

function Logo() {
    return (
        <Link href={"/"}
              className="font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
        >
            Page Form
        </Link>
    );
}

export default Logo;