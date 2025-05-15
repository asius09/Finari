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
        <div className="w-full min-h-screen flex bg-background overflow-hidden">
          <AppSidebar />
          <main className="rounded-l-3xl w-full flex-1 flex flex-col gap-6 bg-background shadow-lg pt-6 px-6">
            <Header />
            <div className="overflow-x-clip">
              {children}
            </div>
          </main>
        </div>
      </InitialHydrate>
    </SidebarProvider>
  );
}
