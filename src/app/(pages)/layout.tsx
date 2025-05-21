import { AppSidebar } from "@/components/my-ui/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/my-ui/Header";
import { createClient } from "@/utils/supabase/server";
import { InitialHydrate } from "@/components/my-ui/InitialHydrate";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default async function SidebarLayout({ children }: SidebarLayoutProps) {
  const supabase = await createClient();
  let userId: string | null = null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.id) {
    userId = user?.id;
  }
  return (
    <SidebarProvider defaultOpen={true}>
      <InitialHydrate userId={userId}>
        <div className="w-full min-h-screen flex bg-background overflow-x-hidden">
          <AppSidebar />
          <main className="rounded-l-3xl w-full grid grid-rows-[auto_1fr] gap-6 bg-background px-3 pt-3 md:pt-6 md:px-6">
            <Header />
            <section id="main-content" className="relative top-20 md:top-0">
              {children}
            </section>
          </main>
        </div>
      </InitialHydrate>
    </SidebarProvider>
  );
}
