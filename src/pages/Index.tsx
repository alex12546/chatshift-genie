
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatContainer } from "@/components/ChatContainer";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col theme-transition">
        <header className="fixed top-0 z-10 w-full border-b bg-background/80 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">AI Assistant</h1>
            </div>
            <ThemeToggle />
          </div>
        </header>
        
        <main className="container flex-1 pt-16 pb-4">
          <div className="mx-auto mt-8 h-[calc(100vh-120px)] max-w-3xl overflow-hidden rounded-2xl border shadow-lg glass-card">
            <ChatContainer />
          </div>
        </main>
        
        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          <div className="container">
            <p>Built with precision and care. AI Assistant © {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
