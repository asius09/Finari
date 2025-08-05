import { AppSidebar } from "@/components/my-ui/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/my-ui/Header";
import { createClient } from "@/utils/supabase/server";
import { InitialHydrate } from "@/components/my-ui/InitialHydrate";
//changed made
// Interface for the layout component props
interface SidebarLayoutProps {
  children: React.ReactNode;
}

// Main layout component for pages with sidebar
export default async function SidebarLayout({ children }: SidebarLayoutProps) {
  // Initialize Supabase client
  const supabase = await createClient();
  let userId: string | null = null;

  // Get current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user?.id) {
    userId = user?.id;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <InitialHydrate userId={userId}>
        <div className="w-full min-h-screen flex bg-background">
          {/* Application Sidebar */}
          <AppSidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {/* Sticky header */}
            <div className="sticky top-0 z-40">
              <Header />
            </div>

            {/* Main content and AI assistant section */}
            <div className="flex-1 flex overflow-hidden">
              {/* Scrollable main content that extends under the chat */}
              <main className="flex-1 overflow-y-auto p-4 lg:pr-[336px]">
                {children}
              </main>

              {/* Floating AI Icon for Mobile */}
              <div className="lg:hidden fixed bottom-4 right-4 z-50">
                <button className="p-3 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 8V4H8" />
                    <rect width="16" height="12" x="4" y="8" rx="2" />
                    <path d="M2 14h2" />
                    <path d="M20 14h2" />
                    <path d="M15 13v2" />
                    <path d="M9 13v2" />
                  </svg>
                </button>
              </div>

              {/* Fixed AI Chat Section for Desktop that sits on the side */}
              <section className="hidden lg:block w-[320px] min-w-[320px] fixed right-0 h-[calc(100vh-68px)] pt-4 z-30">
                <div className="h-full flex flex-col bg-gradient-to-b from-primary/10 via-secondary/10 to-background p-4 space-y-4 rounded-xl">
                  {/* AI Assistant Header */}
                  <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground">
                      Finari Companion
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your financial guide
                    </p>
                  </div>

                  {/* AI Messages Section */}
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        You've spent 15% more than your budget this month
                      </p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Tip: Consider reviewing your recurring subscriptions
                      </p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur-sm rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Your net worth has increased by 2.5% this month
                      </p>
                    </div>
                  </div>

                  {/* AI Input Section */}
                  <div className="bg-background/50 backdrop-blur-sm border-t border-border pt-4 rounded-lg">
                    <input
                      type="text"
                      placeholder="Ask Finari about your finances..."
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </InitialHydrate>
    </SidebarProvider>
  );
}
