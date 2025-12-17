export interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  content: string;
}
export interface GistOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}
export interface GistApiResponse {
  id: string;
  description: string;
  owner: GistOwner;
  files: { [key: string]: GistFile };
  created_at: string;
  updated_at: string;
}
export interface ProcessedGist {
  html: string;
  css: string;
  js: string;
  title: string;
  owner: GistOwner | null;
}
// Smart Fusion Engine: Finds the most relevant files
function processGistFiles(files: { [key: string]: GistFile }): Omit<ProcessedGist, 'title' | 'owner'> {
  const fileList = Object.values(files);
  let htmlFile = null;
  let cssFile = null;
  let jsFile = null;
  // Prioritize specific filenames
  htmlFile = fileList.find(f => f.filename.toLowerCase() === 'index.html');
  cssFile = fileList.find(f => f.filename.toLowerCase() === 'style.css' || f.filename.toLowerCase() === 'styles.css');
  jsFile = fileList.find(f => f.filename.toLowerCase() === 'script.js' || f.filename.toLowerCase() === 'index.js');
  // Fallback to first file of the type if specific names aren't found
  if (!htmlFile) {
    htmlFile = fileList.find(f => f.language === 'HTML');
  }
  if (!cssFile) {
    cssFile = fileList.find(f => f.language === 'CSS');
  }
  if (!jsFile) {
    jsFile = fileList.find(f => f.language === 'JavaScript');
  }
  return {
    html: htmlFile?.content || '',
    css: cssFile?.content || '',
    js: jsFile?.content || '',
  };
}
export async function fetchGist(id: string): Promise<ProcessedGist> {
  const response = await fetch(`https://api.github.com/gists/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Gist not found.');
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error('Failed to fetch Gist from GitHub API.');
  }
  const data: GistApiResponse = await response.json();
  const { html, css, js } = processGistFiles(data.files);
  const title = data.description || Object.keys(data.files)[0] || 'Untitled Gist';
  return {
    html,
    css,
    js,
    title,
    owner: data.owner,
  };
}