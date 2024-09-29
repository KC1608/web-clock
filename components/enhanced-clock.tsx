"use client"

import { useState, useEffect } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Sidebar } from "./sidebar"

const clockDesigns = ["Minimal", "Futuristic"]

export default function EnhancedClockComponent() {
  const [time, setTime] = useState(new Date())
  const [isDigital, setIsDigital] = useState(true)
  const [showSeconds, setShowSeconds] = useState(true)
  const [selectedDesign, setSelectedDesign] = useState("Minimal")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleClockType = () => setIsDigital(!isDigital)
  const toggleSeconds = () => setShowSeconds(!showSeconds)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme)

  const formatDigitalTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      ...(showSeconds && { second: '2-digit' }),
      hour12: true
    }
    return date.toLocaleTimeString([], options)
  }

  const AnalogClock = () => {
    const seconds = time.getSeconds() * 6
    const minutes = time.getMinutes() * 6 + seconds / 60
    const hours = ((time.getHours() % 12) / 12) * 360 + minutes / 12

    return (
      <div className={`relative w-64 h-64 rounded-full ${
        selectedDesign === 'Minimal' ? '' : 'border-4'
      } ${isDarkTheme ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        {selectedDesign !== 'Minimal' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-4 ${isDarkTheme ? 'bg-gray-500' : 'bg-gray-400'}`}
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-31px)`,
                }}
              />
            ))}
          </div>
        )}
        <div
          className={`absolute top-1/2 left-1/2 w-1 h-16 ${
            isDarkTheme ? 'bg-white' : 'bg-black'
          } origin-bottom ${
            selectedDesign === 'Futuristic' ? 'rounded-full' : ''
          }`}
          style={{ transform: `translate(-50%, -100%) rotate(${hours}deg)` }}
        />
        <div
          className={`absolute top-1/2 left-1/2 w-1 h-24 ${
            isDarkTheme ? 'bg-white' : 'bg-black'
          } origin-bottom ${
            selectedDesign === 'Futuristic' ? 'rounded-full' : ''
          }`}
          style={{ transform: `translate(-50%, -100%) rotate(${minutes}deg)` }}
        />
        {(selectedDesign !== 'Minimal' || showSeconds) && (
          <div
            className="absolute top-1/2 left-1/2 w-0.5 h-28 bg-red-500 origin-bottom"
            style={{ transform: `translate(-50%, -100%) rotate(${seconds}deg)` }}
          />
        )}
      </div>
    )
  }

  if(typeof window == undefined) {
    return null
  }

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      isDarkTheme ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <Sidebar open={isSidebarOpen} onClose={toggleSidebar} isDark={isDarkTheme}>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Clock Settings</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Clock Type</span>
              <Button 
                onClick={toggleClockType} 
                size="sm" 
                variant="outline"
                className={isDarkTheme ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'}
              >
                {isDigital ? 'Analog' : 'Digital'}
              </Button>
            </div>
            {isDigital && (
              <div className="flex items-center justify-between">
                <span>Show Seconds</span>
                <Switch
                  checked={showSeconds}
                  onCheckedChange={toggleSeconds}
                  aria-label="Toggle seconds display"
                />
              </div>
            )}
            <div className="space-y-2">
              <span>Analog Clock Design</span>
              {clockDesigns.map((design) => (
                <Button
                  key={design}
                  onClick={() => setSelectedDesign(design)}
                  variant={selectedDesign === design ? "default" : "outline"}
                  className={`w-full ${
                    isDarkTheme 
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  } ${selectedDesign === design ? 'border-blue-500' : ''}`}
                >
                  {design}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Sidebar>
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4 flex items-center space-x-4">
          <Button
            onClick={toggleSidebar}
            size="icon"
            variant="outline"
            className={`${
              isDarkTheme 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex items-center space-x-2">
            <Sun className={`h-4 w-4 ${isDarkTheme ? 'text-gray-400' : 'text-yellow-500'}`} />
            <Switch
              checked={isDarkTheme}
              onCheckedChange={toggleTheme}
              aria-label="Toggle dark mode"
            />
            <Moon className={`h-4 w-4 ${isDarkTheme ? 'text-blue-300' : 'text-gray-400'}`} />
          </div>
        </div>
        <div className="mb-8">
          {isDigital ? (
            <div
              className={`text-5xl md:text-6xl font-bold ${
                isDarkTheme ? 'text-white' : 'text-gray-900'
              }`}
              aria-live="polite"
            >
              {formatDigitalTime(time)}
            </div>
          ) : (
            <AnalogClock />
          )}
        </div>
      </main>
    </div>
  )
}