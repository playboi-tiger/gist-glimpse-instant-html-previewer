import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Home, Share2, Copy, Check } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { fetchGist, ProcessedGist } from '@/lib/gist-api';
import { PreviewFrame } from '@/components/preview-frame';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
export function ViewPage() {
  const { id } = useParams<{ id: string }>();
  const [hasCopied, setHasCopied] = React.useState(false);
  const { data, error, isLoading } = useQuery<ProcessedGist, Error>({
    queryKey: ['gist', id],
    queryFn: () => {
      if (!id) throw new Error('Gist ID is required.');
      return fetchGist(id);
    },
    enabled: !!id,
    retry: false,
  });
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setHasCopied(true);
    toast.success('Preview URL copied to clipboard!');
    setTimeout(() => setHasCopied(false), 2000);
  };
  return (
    <div className="flex h-screen flex-col bg-zinc-100 dark:bg-zinc-900">
      <header className="flex h-16 flex-shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="outline" size="icon" asChild>
            <Link to="/" aria-label="Back to Home">
              <Home className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
        <div className="text-center text-sm font-medium text-muted-foreground truncate px-4">
          Gist Preview
        </div>
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                  {hasCopied ? (
                    <Check className="ml-2 h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy sharable link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </header>
      <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <PreviewFrame
          isLoading={isLoading}
          error={error?.message || null}
          html={data?.html || ''}
          css={data?.css || ''}
          js={data?.js || ''}
          title={data?.title || 'Loading Gist...'}
          owner={data?.owner || null}
        />
      </main>
      <Toaster richColors closeButton />
    </div>
  );
}