import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import Image from "next/image";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <nav>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-192x192.png"
                alt="Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              Blow
            </Link>
          </div>

          {!session ? (
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Signin</Link>
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/u/me">Profile</Link>
            </Button>
          )}
        </div>
      </nav>

      {children}
    </>
  );
}
