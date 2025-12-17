import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Sparkles, ArrowRight } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { InputWithButton } from '@/components/ui/input-with-button';
import { Button } from '@/components/ui/button';
function parseGistUrl(url: string): string | null {
  try {
    const urlObject = new URL(url);
    if (urlObject.hostname === 'gist.github.com') {
      const pathParts = urlObject.pathname.split('/').filter(Boolean);
      return pathParts.pop() || null;
    }
  } catch (e) {
    // Not a valid URL, might be an ID
  }
  // Regex for Gist ID (32 hex characters)
  if (/^[a-f0-9]{32}$/.test(url)) {
    return url;
  }
  // Regex for full Gist URL
  const match = url.match(/gist\.github\.com\/[a-zA-Z0-9_-]+\/([a-f0-9]{32})/);
  return match ? match[1] : null;
}
export function HomePage() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gistId = parseGistUrl(inputValue.trim());
    if (gistId) {
      navigate(`/view/${gistId}`);
    } else {
      toast.error('Invalid Gist URL or ID', {
        description: 'Please paste a valid GitHub Gist URL or just the Gist ID.',
      });
    }
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 to-transparent dark:from-blue-500/5"></div>
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Gist Glimpse</span>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200" />
            </a>
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen flex-col items-center justify-center py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl text-center"
          >
            <h1 className="text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-6xl md:text-7xl">
              Instant Previews for GitHub Gists
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
              Paste any Gist URL to instantly render HTML, CSS, and JavaScript in a secure, shareable sandbox.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 w-full max-w-xl"
          >
            <form onSubmit={handleSubmit}>
              <InputWithButton
                inputProps={{
                  type: 'text',
                  placeholder: 'Paste a Gist URL or ID...',
                  value: inputValue,
                  onChange: (e) => setInputValue(e.target.value),
                }}
                buttonProps={{
                  type: 'submit',
                }}
                buttonContent={<ArrowRight className="h-5 w-5" />}
              />
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">How it works</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-3xl">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <span className="font-bold text-xl">1</span>
                </div>
                <h3 className="mt-4 font-medium text-zinc-900 dark:text-zinc-50">Paste URL</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Provide a link to any public GitHub Gist.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <span className="font-bold text-xl">2</span>
                </div>
                <h3 className="mt-4 font-medium text-zinc-900 dark:text-zinc-50">We Fetch & Fuse</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Our engine finds and combines your code.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <span className="font-bold text-xl">3</span>
                </div>
                <h3 className="mt-4 font-medium text-zinc-900 dark:text-zinc-50">View & Share</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">See your code live and share the preview link.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-zinc-500">
        Built with ❤️ at Cloudflare
      </footer>
      <Toaster richColors closeButton />
    </div>
  );
}