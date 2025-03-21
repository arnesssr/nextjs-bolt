import JSZip from 'jszip';

export const createDownloadableZip = async (files: { path: string; content: string }[]) => {
  const zip = new JSZip();
  
  files.forEach(({ path, content }) => {
    zip.file(path, content);
  });
  
  const blob = await zip.generateAsync({ type: 'blob' });
  return blob;
};

export const downloadZip = (blob: Blob, fileName: string = 'project.zip') => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};
