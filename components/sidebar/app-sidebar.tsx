"use client"

import * as React from "react"
import { Bot, History, PlusCircle, Cog } from "lucide-react"

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
        items: [
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
        url: "/settings",
        icon: Cog,
        items: [] // Removed dropdown items since we now have a dedicated settings page
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