"use client"

import * as React from "react"
import {
  Bot,
  History,
  PlusCircle,
  Cog,
  Palette,
  KeyRound,
  Code2,
  Library,
  Wrench,
  LayoutTemplate,
  FileCode,
  Boxes,
  Key,
  Gauge,
  Network,
  Settings,
  MonitorSmartphone,
  Brush,
  PaintBucket
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { chatId, deleteById, getAll, getDb, type ChatHistoryItem } from '@/persistance';
import { chatStore } from "@/lib/stores/chat"
import { useStore } from "@nanostores/react"
import { toast } from "react-toastify"
import { useCallback, useEffect, useState } from "react"
import { HistoryItem } from "./HistoryItem"
import { DialogRoot, DialogButton, Dialog, DialogTitle, DialogDescription } from "../ui/OldDialog"
import { binDates } from "./date-binning"
import { anthropicModels, setProvider, ProviderType, googleModels, togetherModels } from "@/lib/stores/provider"

type DialogContent = { type: 'delete'; item: ChatHistoryItem } | null;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [list, setList] = React.useState<ChatHistoryItem[]>([]);
  const [open, setOpen] = useState(true);
  const [dialogContent, setDialogContent] = useState<DialogContent>(null);
  const { showChat } = useStore(chatStore);
  const closeDialog = () => {
    setDialogContent(null);
  };

  const loadEntries = React.useCallback(async () => {
    const db = await getDb();
    if (db) {
      getAll(db)
        .then((list) => list.filter((item) => item.urlId && item.description))
        .then(setList)
        .catch((error) => toast.error(error.message));
    }
  }, []);

  const deleteItem = useCallback(async (event: React.UIEvent, item: ChatHistoryItem) => {
    event.preventDefault();
    const db = await getDb();

    if (db) {
      deleteById(db, item.id)
        .then(() => {
          loadEntries();

          if (chatId.get() === item.id) {
            // hard page navigation to clear the stores
            window.location.pathname = '/';
          }
        })
        .catch((error) => {
          toast.error('Failed to delete conversation');
    
        });
    }
  }, []);

  useEffect(() => {
    if (open) {
      loadEntries();
    }
  }, [open]);

  useEffect(() => {
    if (!showChat) {
      setOpen(false);
    }
  }, [showChat])

  const startNewChat = useCallback(() => {
    // Clear chat history and redirect to home
    chatStore.setKey('started', false);
    chatId.set(undefined);
    window.location.pathname = '/';
  }, []);

  const data = {
    navMain: [
      {
        title: "New Project",
        url: "#",
        icon: PlusCircle,
        isActive: true,
        onClick: startNewChat,
        items: []
      },
      {
        title: "History",
        icon: History,
        items:  [
          <div className="!bg-background !hover:bg-background !active:bg-background flex items-center h-full w-full justify-between max-w-full">
            {list.length === 0 && <div className="text-foreground">No previous conversations</div>}
            <DialogRoot open={dialogContent !== null}>
                {binDates(list).map(({ category, items }) => (
                  <div key={category} className="text-foreground !hover:text-foreground mt-4 first:mt-0 space-y-1 truncate">
                    <div className=" sticky top-0 z-1 pl-2 pt-2 pb-1">
                      {category}
                    </div>
                    {items.map((item) => (
                      <HistoryItem key={item.id} item={item} onDelete={() => setDialogContent({ type: 'delete', item })} />
                    ))}
                  </div>
                ))}
                <Dialog onBackdrop={closeDialog} onClose={closeDialog}>
                  {dialogContent?.type === 'delete' && (
                    <>
                      <DialogTitle>Delete Chat?</DialogTitle>
                      <DialogDescription asChild>
                        <div>
                          <p>
                            You are about to delete <strong>{dialogContent.item.description}</strong>.
                          </p>
                          <p className="mt-1">Are you sure you want to delete this chat?</p>
                        </div>
                      </DialogDescription>
                      <div className="px-5 pb-4 bg-background flex gap-2 justify-end">
                        <DialogButton type="secondary" onClick={closeDialog}>
                          Cancel
                        </DialogButton>
                        <DialogButton
                          type="danger"
                          onClick={(event) => {
                            deleteItem(event, dialogContent.item);
                            closeDialog();
                          }}
                        >
                          Delete
                        </DialogButton>
                      </div>
                    </>
                  )}
                </Dialog>
              </DialogRoot>
              </div>
        ],
      },
      {
        title: "Settings",
        icon: Cog,
        items: [
          {
            title: "Models",
            icon: Bot,
            items: [
              <div key="models-container" className="!bg-background !hover:bg-background active:bg-background flex flex-col !w-full h-full items-center justify-center">
                <div className="text-xs text-muted text-start">Anthropic Models</div>
                {anthropicModels.map((model) => (
                  <div
                    key={model.id}
                    className="!w-full py-1 cursor-pointer text-start text-foreground hover:text-accent hover:scale-105"
                    onClick={() => setProvider({ type: ProviderType.ANTHROPIC, model })}
                  >
                    {model.displayName}
                  </div>
                ))}
                <div className="text-xs text-muted text-start">Google Models</div>
                {googleModels.map((model) => (
                  <div
                    key={model.id}
                    className="!w-full py-1 cursor-pointer text-start text-foreground hover:text-accent hover:scale-105"
                    onClick={() => setProvider({ type: ProviderType.GOOGLE, model })}
                  >
                    {model.displayName}
                  </div>
                ))}
                <div className="text-xs text-muted text-start">TogetherAI Models</div>
                {togetherModels.map((model) => (
                  <div
                    key={model.id}
                    className="!w-full py-1 cursor-pointer text-start text-foreground hover:text-accent hover:scale-105"
                    onClick={() => setProvider({ type: ProviderType.TOGETHER, model })}
                  >
                    {model.displayName}
                  </div>
                ))}
              </div>
            ]
          },
          {
            title: "Knowledge Base",
            icon: Library,
            items: [
              <div key="kb-container" className="!bg-background !hover:bg-background active:bg-background flex flex-col !w-full h-full p-2">
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><LayoutTemplate size={14} /> Project Templates</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><FileCode size={14} /> Framework Guides</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Code2 size={14} /> Best Practices</div>
              </div>
            ]
          },
          {
            title: "API Configuration",
            icon: Wrench,
            items: [
              <div key="api-config" className="!bg-background !hover:bg-background active:bg-background flex flex-col !w-full h-full p-2">
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Key size={14} /> API Keys</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Gauge size={14} /> Rate Limits</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Network size={14} /> Endpoints</div>
              </div>
            ]
          },
          {
            title: "Project Settings",
            icon: Settings,
            items: [
              <div key="project-settings" className="!bg-background !hover:bg-background active:bg-background flex flex-col !w-full h-full p-2">
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Boxes size={14} /> Default Framework</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Code2 size={14} /> Build Configuration</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Network size={14} /> Deploy Settings</div>
              </div>
            ]
          },
          {
            title: "Theme",
            icon: Palette,
            items: [
              <div key="theme-settings" className="!bg-background !hover:bg-background active:bg-background flex flex-col !w-full h-full p-2">
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><MonitorSmartphone size={14} /> Dark/Light Mode</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><Brush size={14} /> Code Editor Theme</div>
                <div className="text-xs text-muted mb-2 flex items-center gap-2"><PaintBucket size={14} /> UI Customization</div>
              </div>
            ]
          }
        ],
      }
    ],
    navSecondary: [] // Empty array since we don't need secondary nav
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="">
                <div>
                  <h1 className="font-paytone font-bold text-3xl tracking-tight flex gap-0.2 text-foreground/80">
                    <span>BOLT</span>
                    <span className="text-accent">.</span>
                    <span className="ml-1">NEXT</span>
                  </h1>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  )
}