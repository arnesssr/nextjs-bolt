// Implement settings layout

// filepath: c:\Users\user\Downloads\Bolt.new-ALL-LLM-main\Bolt.new-ALL-LLM-main\nextjs-bolt\app\settings\page.tsx
// Implement settings landing page

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container relative">
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
