import { app, BrowserWindow, Menu, nativeImage, Tray, screen, ipcMain, clipboard, globalShortcut, Notification } from 'electron'
import { v4 as uuidv4 } from 'uuid'
import Store from 'electron-store'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { exec } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.name = 'iMemo Smart Clipboard'

/**
 * Utility function to get the correct icon path based on the current operating system.
 */
const getIconPath = (): string => {
  const platform = process.platform
  const basePath = process.env.APP_ROOT

  if (!basePath) return ''

  switch (platform) {
    case 'win32':
      return path.join(basePath, 'public', 'icons', 'win', 'icon.ico')
    case 'darwin':
      return path.join(basePath, 'public', 'icons', 'mac', 'icon.icns')
    case 'linux':
    default:
      return path.join(basePath, 'public', 'icons', 'png', '256x256.png')
  }
}

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

interface ClipboardItem {
  id: string
  content: string
  timestamp: number
  isStarred: boolean
}

const store = new Store({
  defaults: {
    history: [] as ClipboardItem[],
    settings: {
      instantPaste: true,
      globalHotkey: 'Alt+V',
      startOnStartup: true,
      showNotifications: true
    }
  }
})

let win: BrowserWindow | null
let tray: Tray | null = null

const WINDOW_WIDTH = 400
const WINDOW_HEIGHT = 600

let lastBlurTime = 0

function resetWindowPosition() {
  if (!win) return
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height, x: screenX, y: screenY } = primaryDisplay.workArea
  
  const x = screenX + width - WINDOW_WIDTH
  const y = screenY + height - WINDOW_HEIGHT
  
  win.setPosition(x, y)
}

function createTray() {
  const icon = nativeImage.createFromPath(getIconPath())
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show App', click: () => win?.show() },
    { label: 'Show at Default Position', click: () => {
      resetWindowPosition()
      win?.show()
    }},
    { type: 'separator' },
    { label: 'Quit', click: () => app.quit() },
  ])
  tray.setToolTip('iMemo Smart Clipboard')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    toggleWindow()
  })
}

function toggleWindow() {
  if (win?.isVisible()) {
    win.hide()
  } else {
    if (Date.now() - lastBlurTime > 200) {
      win?.show()
    }
  }
}

function registerHotkey() {
  const settings = store.get('settings') as any
  const hotkey = settings.globalHotkey || 'Alt+V'
  
  globalShortcut.unregisterAll()
  try {
    globalShortcut.register(hotkey, () => {
      toggleWindow()
    })
  } catch (e) {
    console.error('Failed to register hotkey:', e)
  }
}

function simulatePaste() {
  const platform = process.platform
  if (platform === 'win32') {
    // Windows: Use PowerShell to send Ctrl+V
    const command = `powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('^v')"`
    exec(command)
  } else if (platform === 'darwin') {
    // macOS: Use AppleScript to send Cmd+V
    const command = `osascript -e 'tell application "System Events" to keystroke "v" using command down'`
    exec(command)
  }
}

function showClipboardNotification(content: string) {
  const settings = store.get('settings') as any
  if (!settings.showNotifications) return

  new Notification({
    title: 'Copied to iMemo',
    body: content.length > 50 ? content.substring(0, 50) + '...' : content,
    silent: true,
    icon: getIconPath()
  }).show()
}

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height, x: screenX, y: screenY } = primaryDisplay.workArea

  win = new BrowserWindow({
    title: 'iMemo Smart Clipboard',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    x: screenX + width - WINDOW_WIDTH,
    y: screenY + height - WINDOW_HEIGHT,
    icon: getIconPath(),
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Remove the menu bar
  Menu.setApplicationMenu(null)

  // Hide when clicking away
  win.on('blur', () => {
    lastBlurTime = Date.now()
    win?.hide()
  })

  // Minimize to tray
  win.on('minimize', (event: any) => {
    event.preventDefault()
    win?.hide()
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  createWindow()
  createTray()

  // Enable launch at startup
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  })

  // Start clipboard monitoring (Polling is more reliable in Electron)
  let lastText = clipboard.readText()
  setInterval(() => {
    const currentText = clipboard.readText()
    if (currentText && currentText !== lastText) {
      lastText = currentText
      
      const history = store.get('history') as ClipboardItem[]
      // Avoid duplicates at the top (extra check)
      if (history.length > 0 && history[0].content === currentText) return

      const newItem: ClipboardItem = {
        id: uuidv4(),
        content: currentText,
        timestamp: Date.now(),
        isStarred: false,
      }

      const updatedHistory = [newItem, ...history].slice(0, 100)
      store.set('history', updatedHistory)
      
      // Notify renderer
      win?.webContents.send('history:updated', updatedHistory)

      // Show desktop notification
      showClipboardNotification(currentText)
    }
  }, 500)

  // Enable Hotkey
  registerHotkey()
})

ipcMain.on('hide-window', () => {
  win?.hide()
})

ipcMain.handle('history:get', (_, { offset = 0, limit = 20 } = {}) => {
  const history = store.get('history') as ClipboardItem[]
  const items = history.slice(offset, offset + limit)
  return {
    items,
    total: history.length,
    hasMore: offset + limit < history.length
  }
})

ipcMain.handle('history:remove', (_, id: string) => {
  const history = store.get('history') as ClipboardItem[]
  const updatedHistory = history.filter(item => item.id !== id)
  store.set('history', updatedHistory)
  return updatedHistory
})

ipcMain.handle('history:toggle-star', (_, id: string) => {
  const history = store.get('history') as ClipboardItem[]
  const updatedHistory = history.map(item => 
    item.id === id ? { ...item, isStarred: !item.isStarred } : item
  )
  store.set('history', updatedHistory)
  return updatedHistory
})

ipcMain.handle('history:search', (_, { query, offset = 0, limit = 20 }) => {
  const history = store.get('history') as ClipboardItem[]
  if (!query) return { items: history.slice(offset, offset + limit), total: history.length, hasMore: offset + limit < history.length }
  const lowerQuery = query.toLowerCase()
  const filtered = history.filter(item => item.content.toLowerCase().includes(lowerQuery))
  return {
    items: filtered.slice(offset, offset + limit),
    total: filtered.length,
    hasMore: offset + limit < filtered.length
  }
})

ipcMain.handle('settings:get', () => {
  return store.get('settings')
})

ipcMain.handle('settings:update', (_, newSettings: any) => {
  const oldSettings = store.get('settings') as any
  store.set('settings', newSettings)
  
  // Handle start on startup change
  if (newSettings.startOnStartup !== oldSettings.startOnStartup) {
    app.setLoginItemSettings({
      openAtLogin: newSettings.startOnStartup,
      path: app.getPath('exe'),
    })
  }

  registerHotkey() // Re-register in case hotkey changed
  return newSettings
})

ipcMain.on('clipboard:paste-item', (_event, content: string) => {
  clipboard.writeText(content)
  win?.hide()
  
  const settings = store.get('settings') as any
  if (settings.instantPaste) {
    // Small delay to let focus return to the previous application
    setTimeout(() => {
      simulatePaste()
    }, 150)
  }
})
