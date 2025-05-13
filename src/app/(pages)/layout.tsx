import { AppSidebar } from "@/components/my-ui/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/my-ui/Header";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="w-screen min-h-screen flex bg-background">
        <AppSidebar />
        <main className="rounded-l-3xl w-full flex-1 flex flex-col gap-6 bg-background shadow-lg pt-6 px-6">
          <Header />
          <div className="flex-1 overflow-y-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
