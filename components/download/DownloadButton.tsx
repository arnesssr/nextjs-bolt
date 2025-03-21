import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { createDownloadableZip, downloadZip } from '@/utils/download';

interface DownloadButtonProps {
  files: { path: string; content: string }[];
  fileName?: string;
}

export const DownloadButton: React.FC<DownloadButtonProps> = ({ files, fileName }) => {
  const handleDownload = async () => {
    try {
      const blob = await createDownloadableZip(files);
      downloadZip(blob, fileName);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Download size={16} />
      Download Project
    </Button>
  );
};
