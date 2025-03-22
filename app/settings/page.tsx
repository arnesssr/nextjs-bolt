'use client'

import React from 'react'
import { ApiConfiguration, KnowledgeBase, ThemeSettings, SystemSettings } from '@/components/settings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Settings() {
  return (
    <div className="container max-w-6xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="api">API Configuration</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <ApiConfiguration />
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <KnowledgeBase />
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <ThemeSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
