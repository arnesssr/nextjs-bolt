"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import * as React from "react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

interface NavItem {
  title?: string | React.ReactNode;
  url?: string;
}

interface NavMainProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string;
    url?: string;
    icon: LucideIcon;
    isActive?: boolean;
    onClick?: () => void;
    items?: (NavItem | React.ReactNode)[];
  }[];
}

export function NavMain({
  items,
  className,
  ...props
}: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem onClick={item.onClick}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem, index) => (
                        <SidebarMenuSubItem key={index}>
                          <SidebarMenuSubButton asChild>
                            {React.isValidElement(subItem) ? (
                              subItem
                            ) : (
                              (subItem as NavItem)?.url ? (
                                <a href={(subItem as NavItem).url}>
                                  {(subItem as NavItem).title ? (typeof (subItem as NavItem).title === 'string' ? < span>{(subItem as NavItem).title}</span > : < >{(subItem as NavItem).title}</ >) : null}
                                </a>
                              ) : (
                                < >{(subItem as NavItem)?.title}</ >
                              )
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}