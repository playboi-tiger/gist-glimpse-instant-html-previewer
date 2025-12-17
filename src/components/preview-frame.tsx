import * as React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GistOwner } from '@/lib/gist-api';
interface PreviewFrameProps {
  html: string;
  css: string;
  js: string;
  title: string;
  owner: GistOwner | null;
  isLoading: boolean;
  error: string | null;
}
export function PreviewFrame({ html, css, js, title, owner, isLoading, error }: PreviewFrameProps) {
  const srcDoc = React.useMemo(() => {
    if (!html && !css && !js) return '';
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
  }, [html, css, js]);
  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-full w-full" />;
    }
    if (error) {
      return (
        <div className="flex h-full items-center justify-center p-8">
          <Alert variant="destructive" className="max-w-md">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      );
    }
    if (!html && !css && !js) {
      return (
        <div className="flex h-full items-center justify-center p-8">
          <Alert className="max-w-md">
            <Terminal className="h-4 w-4" />
            <AlertTitle>No Preview Available</AlertTitle>
            <AlertDescription>
              This Gist does not contain any renderable HTML, CSS, or JavaScript files.
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    return (
      <iframe
        srcDoc={srcDoc}
        title={title}
        sandbox="allow-scripts"
        className="h-full w-full border-0 bg-white"
        loading="lazy"
      />
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex h-full w-full flex-col rounded-lg border bg-card shadow-lg"
    >
      <div className="flex h-11 items-center gap-2 border-b bg-muted/50 px-4">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex-1 text-center text-sm font-medium text-muted-foreground truncate">
          {isLoading ? <Skeleton className="h-4 w-48 mx-auto" /> : title}
        </div>
        <div className="flex items-center gap-2">
          {owner && (
            <>
              <span className="text-xs text-muted-foreground hidden sm:inline">{owner.login}</span>
              <Avatar className="h-6 w-6">
                <AvatarImage src={owner.avatar_url} alt={owner.login} />
                <AvatarFallback>{owner.login.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </motion.div>
  );
}