"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({}) {
  const pathname = usePathname();

  const links: { path: string; name: string }[] = [
    { path: "/", name: "Strona główna" },
    { path: "/miernik", name: "Miernik budżetowy" }
  ];

  return (
    <nav className="fixed flex h-screen w-[185px] flex-col gap-2 border-r-2 border-r-slate-500 p-4 shadow-sm" role="group">
      {links.length > 0 && links.map((link, idx) => <StyledLink key={idx} idx={idx} path={link.path} pathname={pathname} name={link.name} />)}
    </nav>
  );
}

const StyledLink = ({ idx, path, pathname, name }: { idx: number; path: string; pathname: string; name: string }) => {
  return (
    <Link
      key={idx}
      href={path}
      className={`link ${
        pathname === path ? "text-red-500" : ""
      } border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500`}
    >
      {name}
    </Link>
  );
};
