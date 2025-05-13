import { AppSidebar } from "@/components/common/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="w-screeen min-h-lvh flex ">
        <AppSidebar />
        <main className="rounded-l-3xl w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
