import Link from "next/link";
import GitHubIcon from "../atoms/github";
import LinkedInIcon from "../atoms/linkedin";

export default function Footer() {
  return (
    <footer>
      <div className="flex justify-center items-center w-full h-10 text-black bg-[#EEE5E3]">
        <p className="px-5 font-medium">Developed by: BUCUR MĂLINA</p>
        <Link href="https://www.linkedin.com/in/malina-bucur-600095238/" target="_blank" className="pr-2">
          <LinkedInIcon />
        </Link>
        <Link href="https://github.com/malinabucur?tab=repositories" target="_blank">
          <GitHubIcon />
        </Link>
      </div>
    </footer>
  );
}
