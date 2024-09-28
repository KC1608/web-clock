import { ReactNode } from 'react'

interface SidebarProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  isDark: boolean
}

export function Sidebar({ children, open, onClose, isDark }: SidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {children}
      </div>
    </>
  )
}