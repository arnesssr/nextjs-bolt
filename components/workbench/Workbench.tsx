import { useStore } from '@nanostores/react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { computed } from 'nanostores';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
  type OnChangeCallback as OnEditorChange,
  type OnScrollCallback as OnEditorScroll,
} from '@/components/editor/codemirror/CodeMirrorEditor';
import { IconButton } from '@/components/ui/IconButton';
import { PanelHeaderButton } from '@/components/ui/PanelHeaderButton';
import { Slider, type SliderOptions } from '@/components/ui/OldSlider';
import { workbenchStore, type WorkbenchViewType } from '@/lib/stores/workbench';
import { cn } from '@/lib/utils';
import { cubicEasingFn } from '@/utils/easings';
import { renderLogger } from '@/utils/logger';
import { EditorPanel } from './EditorPanel';
import { Preview } from './Preview';
import { chatId } from '@/persistance/useChatHistory';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { chatStore } from '@/lib/stores/chat';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useSidebar } from '../ui/sidebar';
import { XCircle } from '@phosphor-icons/react';
import { toast } from '@/hooks/use-toast';
import { DownloadButton } from '../download/DownloadButton';

interface WorkspaceProps {
  chatStarted?: boolean;
  isStreaming?: boolean;
  className?: string;
}

const viewTransition = { ease: cubicEasingFn };

const sliderOptions: SliderOptions<WorkbenchViewType> = {
  left: {
    value: 'editor',
    text: 'Editor',
  },
  right: {
    value: 'preview',
    text: 'Preview',
  },
};

const workbenchVariants = {
  closed: {
    width: 0,
    transition: {
      duration: 0.2,
      ease: cubicEasingFn,
    },
  },
  open: {
    width: 'var(--workbench-width)',
    transition: {
      duration: 0.2,
      ease: cubicEasingFn,
    },
  },
} satisfies Variants;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export const Workbench = memo(({ chatStarted, isStreaming, className }: WorkspaceProps) => {
  renderLogger.trace('Workbench');

  const isMobile = useIsMobile();
  const hasPreview = useStore(computed(workbenchStore.previews, (previews) => previews.length > 0));
  const showWorkbench = useStore(workbenchStore.showWorkbench);
  const selectedFile = useStore(workbenchStore.selectedFile);
  const currentDocument = useStore(workbenchStore.currentDocument);
  const unsavedFiles = useStore(workbenchStore.unsavedFiles);
  const files = useStore(workbenchStore.files);
  const selectedView = useStore(workbenchStore.currentView);
  const { showChat } = useStore(chatStore);
  const {
    state,
  } = useSidebar()

  const canHideChat = showWorkbench || !showChat

  const setSelectedView = (view: WorkbenchViewType) => {
    workbenchStore.currentView.set(view);
  };

  useEffect(() => {
    if (isStreaming) {
      setSelectedView('editor');
    } else if (hasPreview) {
      setSelectedView('preview');
    }
  }, [hasPreview, isStreaming]);

  useEffect(() => {
    workbenchStore.setDocuments(files);
  }, [files]);

  const onEditorChange = useCallback<OnEditorChange>((update) => {
    workbenchStore.setCurrentDocumentContent(update.content);
  }, []);

  const onEditorScroll = useCallback<OnEditorScroll>((position) => {
    workbenchStore.setCurrentDocumentScrollPosition(position);
  }, []);

  const onFileSelect = useCallback((filePath: string | undefined) => {
    workbenchStore.setSelectedFile(filePath);
  }, []);

  const onFileSave = useCallback(async () => {
    try {
      await workbenchStore.saveCurrentDocument();
      toast({
        title: "File saved",
        description: "Changes should be reflected in the preview",
      })
    } catch (error) {
      console.error('Failed to save file or update version:', error);
      toast({
        title: "Failed to update file content or version",
      })
    }
  }, []);

  const onFileReset = useCallback(() => {
    workbenchStore.resetCurrentDocument();
  }, []);

  // Add this function to convert files to the correct format
  const getDownloadableFiles = useMemo(() => {
    return Object.entries(files).map(([path, content]) => ({
      path,
      content: typeof content === 'string' ? content : (content && 'content' in content ? content.content : '')
    }));
  }, [files]);

  const innerWorkbench = (
    <div
          className={
            !isMobile 
              ? cn(
                  `h-full w-full max-w-full z-0 transition-[left,width] duration-200 boltnext-ease-cubic-bezier `,
                )
              : 'w-full h-full max-w-full '
          }
        >
       <div className={cn(
            'flex inset-0 h-full w-full max-w-full',
          )}>
          {!isMobile && <div className="h-full flex">
            <button 
              className='w-8 h-20 my-auto bg-transparent text-foreground z-50'
              onClick={() => {
                if (canHideChat) {
                  chatStore.setKey('showChat', !showChat);
                }
              }}
            >
              {showChat ? <ChevronLeft/> : <ChevronRight/>}
            </button>
          </div>}
         
        <div className={`w-full h-full flex flex-col bg-white/5  backdrop-blur-sm border  shadow-sm rounded-${isMobile ? 'none rounded-t-lg' : 'lg'} overflow-hidden`}>
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <Slider selected={selectedView} options={sliderOptions} setSelected={setSelectedView} />
            <div className="flex items-center gap-3">
              <DownloadButton files={getDownloadableFiles} />
              <XCircle
                className="cursor-pointer text-lg"
                onClick={() => {
                  workbenchStore.showWorkbench.set(false);
                }}
              />
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden h-full">
            <View
              initial={{ x: selectedView === 'editor' ? 0 : '-100%' }}
              animate={{ x: selectedView === 'editor' ? 0 : '-100%' }}
            >
              <EditorPanel
                editorDocument={currentDocument}
                isStreaming={isStreaming}
                selectedFile={selectedFile}
                files={files}
                unsavedFiles={unsavedFiles}
                onFileSelect={onFileSelect}
                onEditorScroll={onEditorScroll}
                onEditorChange={onEditorChange}
                onFileSave={onFileSave}
                onFileReset={onFileReset}
              />
            </View>
            <View
              initial={{ x: selectedView === 'preview' ? 0 : '100%' }}
              animate={{ x: selectedView === 'preview' ? 0 : '100%' }}
            >
              <Preview />
            </View>
          </div>
        </div>
      </div>
    </div>
  );

  // Create a single workbench instance that's shared between mobile/desktop
  const workbenchInstance = useMemo(() => (
    <motion.div
      initial="closed"
      animate={showWorkbench ? 'open' : 'closed'}
      variants={isMobile ? undefined : workbenchVariants}
      className={cn("z-workbench w-full h-full", className)}
    >
          {innerWorkbench}
    </motion.div>
  ), [showWorkbench, isMobile, innerWorkbench, className]);

  if (!chatStarted) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer
        open={showWorkbench}
        onOpenChange={(open) => workbenchStore.showWorkbench.set(open)}
      >
        <DrawerContent tabClassName='hidden' className="h-full outline-none ring-0 focus:outline-none focus:ring-0 ring-transparent border-transparent ">
          {workbenchInstance}
        </DrawerContent>
      </Drawer>
    );
  }

  return workbenchInstance;
});

interface ViewProps extends HTMLMotionProps<'div'> {
  children: JSX.Element;
}

const View = memo(({ children, ...props }: ViewProps) => {
  return (
    <motion.div className="absolute inset-0" transition={viewTransition} {...props}>
      {children}
    </motion.div>
  );
});