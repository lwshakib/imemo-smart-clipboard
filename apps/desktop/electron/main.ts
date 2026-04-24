import { app, BrowserWindow, Menu, nativeImage, Tray, screen, ipcMain, clipboard, globalShortcut, Notification, nativeTheme, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import { v4 as uuidv4 } from 'uuid'
import Store from 'electron-store'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { exec } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.name = 'iMemo Smart Clipboard'
app.setAppUserModelId('com.imemo.smart-clipboard')

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
  type: 'text' | 'image'
  timestamp: number
  isStarred: boolean
}

interface Settings {
  instantPaste: boolean
  globalHotkey: string
  startOnStartup: boolean
  showNotifications: boolean
  theme: 'light' | 'dark' | 'system'
}

const store = new Store({
  defaults: {
    history: [] as ClipboardItem[],
    settings: {
      instantPaste: true,
      globalHotkey: 'Alt+V',
      startOnStartup: true,
      showNotifications: false,
      theme: 'system'
    } as Settings
  }
})

let win: BrowserWindow | null
const manualPreviewWins = new Map<string, BrowserWindow>()
let hoverPreviewWin: BrowserWindow | null = null
const contentCache = new Map<string, string>()
let lastHoverContent: string = ''
let tray: Tray | null = null

const WINDOW_WIDTH = 400
const WINDOW_HEIGHT = 600

let lastBlurTime = 0
let lastShowTime = 0

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
    if (win?.isVisible()) {
      win.hide()
    } else {
      lastShowTime = Date.now()
      resetWindowPosition()
      win?.show()
      win?.focus()
      // Ensure it's on top
      win?.setAlwaysOnTop(true, 'screen-saver')
      setTimeout(() => win?.setAlwaysOnTop(true), 100)
    }
  })
}

function setupAutoUpdater() {
  autoUpdater.autoDownload = true
  autoUpdater.allowPrerelease = false

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info.version)
    if (win) {
      win.webContents.send('update:available', info.version)
    }
  })

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info.version)
    const dialogOpts = {
      type: 'info' as const,
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: `A new version (${info.version}) has been downloaded.`,
      detail: 'Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', (err) => {
    console.error('Error in auto-updater:', err)
  })

  // Check for updates every 2 hours
  setInterval(() => {
    autoUpdater.checkForUpdatesAndNotify()
  }, 1000 * 60 * 60 * 2)

  // Initial check
  autoUpdater.checkForUpdatesAndNotify()
}

function toggleWindow() {
  if (win?.isVisible()) {
    win.hide()
  } else {
    if (Date.now() - lastBlurTime > 200) {
      lastShowTime = Date.now()
      win?.show()
    }
  }
}

function registerHotkey() {
  const settings = store.get('settings') as Settings
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
  const settings = store.get('settings') as Settings
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
    backgroundColor: '#09090b',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Remove the menu bar
  Menu.setApplicationMenu(null)

  // Hide when clicking away
  win.on('blur', () => {
    // Grace period to prevent hiding during tray click/focus transitions
    if (Date.now() - lastShowTime > 300) {
      lastBlurTime = Date.now()
      win?.hide()
    }
  })

  // Minimize to tray
  win.on('minimize', (event: Electron.Event) => {
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

function createPreviewWindow(id: string, content: string, isManual: boolean) {
  const previewWidth = 500
  const previewHeight = 400
  
  const previewWin = new BrowserWindow({
    width: previewWidth,
    height: previewHeight,
    frame: false,
    resizable: true,
    movable: true,
    alwaysOnTop: true,
    show: false,
    skipTaskbar: true,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  if (!isManual) {
    previewWin.setIgnoreMouseEvents(true)
  }

  // Encode content and id into URL for the new window to pick up
  const query = new URLSearchParams({ 
    mode: 'preview', 
    id, 
    isManual: isManual ? 'true' : 'false' 
  }).toString()

  if (VITE_DEV_SERVER_URL) {
    previewWin.loadURL(`${VITE_DEV_SERVER_URL}?${query}`)
  } else {
    previewWin.loadFile(path.join(RENDERER_DIST, 'index.html'), { query: { mode: 'preview', id, isManual: isManual ? 'true' : 'false' } })
  }

  previewWin.webContents.on('did-finish-load', () => {
    previewWin.webContents.send('preview:content', { id, content })
  })

  previewWin.on('closed', () => {
    if (isManual) {
      manualPreviewWins.delete(id)
    } else {
      hoverPreviewWin = null
    }
  })

  return previewWin
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

  // Initialize launch at startup based on settings
  const settings = store.get('settings') as Settings
  
  // Set initial theme for Electron system UI
  nativeTheme.themeSource = settings.theme || 'system'
  app.setLoginItemSettings({
    openAtLogin: settings.startOnStartup,
    path: app.getPath('exe'),
  })

  // Start clipboard monitoring (Polling is more reliable in Electron)
  let lastText = clipboard.readText()
  let lastImage = clipboard.readImage().toDataURL()
  
  setInterval(() => {
    const formats = clipboard.availableFormats()
    
    if (formats.includes('image/png') || formats.includes('image/jpeg')) {
      const currentImage = clipboard.readImage()
      const currentDataUrl = currentImage.toDataURL()
      
      // Check if image is valid and different from last one
      if (currentDataUrl && currentDataUrl !== lastImage && currentDataUrl !== 'data:image/png;base64,') {
        lastImage = currentDataUrl
        lastText = clipboard.readText() // Update text to prevent double trigger if image has associated text
        
        const history = store.get('history') as ClipboardItem[]
        
        const newItem: ClipboardItem = {
          id: uuidv4(),
          content: currentDataUrl,
          type: 'image',
          timestamp: Date.now(),
          isStarred: false,
        }
        
        const updatedHistory = [newItem, ...history].slice(0, 100)
        store.set('history', updatedHistory)
        win?.webContents.send('history:updated', updatedHistory)
        showClipboardNotification('Image copied to clipboard')
      }
    } else {
      const currentText = clipboard.readText()
      if (currentText && currentText !== lastText) {
        lastText = currentText
        lastImage = '' // Reset image to allow re-copying the same image after text
        
        const history = store.get('history') as ClipboardItem[]
        // Avoid duplicates at the top (extra check)
        if (history.length > 0 && history[0].content === currentText && history[0].type === 'text') return

        const newItem: ClipboardItem = {
          id: uuidv4(),
          content: currentText,
          type: 'text',
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
    }
  }, 500)

  // Enable Hotkey
  registerHotkey()

  // Setup Auto-Updater
  setupAutoUpdater()
})

ipcMain.on('hide-window', () => {
  win?.hide()
})

ipcMain.handle('history:get', (_event, { offset = 0, limit = 20 } = {}) => {
  const history = store.get('history') as ClipboardItem[]
  const items = history.slice(offset, offset + limit)
  return {
    items,
    total: history.length,
    hasMore: offset + limit < history.length
  }
})

ipcMain.handle('history:remove', (_event, id: string) => {
  const history = store.get('history') as ClipboardItem[]
  const updatedHistory = history.filter(item => item.id !== id)
  store.set('history', updatedHistory)
  return updatedHistory
})

ipcMain.handle('history:toggle-star', (_event, id: string) => {
  const history = store.get('history') as ClipboardItem[]
  const updatedHistory = history.map(item => 
    item.id === id ? { ...item, isStarred: !item.isStarred } : item
  )
  store.set('history', updatedHistory)
  return updatedHistory
})

ipcMain.handle('history:search', (_event, { query, offset = 0, limit = 20 }) => {
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

ipcMain.handle('settings:update', (_event, newSettings: Settings) => {
  const oldSettings = store.get('settings') as Settings
  store.set('settings', newSettings)
  
  // Handle start on startup change
  if (newSettings.startOnStartup !== oldSettings.startOnStartup) {
    app.setLoginItemSettings({
      openAtLogin: newSettings.startOnStartup,
      path: app.getPath('exe'),
    })
  }

  registerHotkey() // Re-register in case hotkey changed
  
  // Update Electron's native theme source
  nativeTheme.themeSource = newSettings.theme || 'system'
  
  // Notify renderer about the update (for theme switching, etc)
  win?.webContents.send('settings:updated', newSettings)
  
  return newSettings
})

ipcMain.on('clipboard:paste-item', (_event, item: { content: string, type: 'text' | 'image' }) => {
  if (item.type === 'image') {
    const image = nativeImage.createFromDataURL(item.content)
    clipboard.writeImage(image)
  } else {
    clipboard.writeText(item.content)
  }
  
  win?.hide()
  
  // Close all manual previews and hide the hover preview
  manualPreviewWins.forEach(pWin => pWin.close())
  manualPreviewWins.clear()
  hoverPreviewWin?.hide()
  
  const settings = store.get('settings') as Settings
  if (settings.instantPaste) {
    // Small delay to let focus return to the previous application
    setTimeout(() => {
      simulatePaste()
    }, 150)
  }
})

ipcMain.on('preview:show', (_event, { id, content, isManual }: { id: string, content: string, isManual: boolean }) => {
  contentCache.set(id, content)
  if (!isManual) lastHoverContent = content
  
  if (isManual) {
    // Hide hover window if it's open
    if (hoverPreviewWin) {
      hoverPreviewWin.hide()
    }

    // If window for this ID already exists, focus it
    if (manualPreviewWins.has(id)) {
      const pWin = manualPreviewWins.get(id)
      pWin?.show()
      pWin?.focus()
      return
    }

    const pWin = createPreviewWindow(id, content, true)
    manualPreviewWins.set(id, pWin)

    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight, x: screenX, y: screenY } = primaryDisplay.workArea
    
    // Offset based on number of windows
    const offset = manualPreviewWins.size * 20
    const x = screenX + screenWidth - 500 - offset
    const y = screenY + screenHeight - WINDOW_HEIGHT - 400 - 10 - offset
    
    pWin.setPosition(x, y)
    pWin.show()
  } else {
    // Hover preview (only one at a time)
    if (!hoverPreviewWin) {
      hoverPreviewWin = createPreviewWindow(id, content, false)
    }

    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight, x: screenX, y: screenY } = primaryDisplay.workArea
    
    const x = screenX + screenWidth - 500
    const mainWinY = screenY + screenHeight - WINDOW_HEIGHT
    const y = mainWinY - 400 - 10
    
    hoverPreviewWin.setPosition(x, y)
    hoverPreviewWin.webContents.send('preview:content', { id, content })
    hoverPreviewWin.showInactive()
  }
})

ipcMain.on('preview:hide', (_event, { id, isManual }: { id: string, isManual: boolean }) => {
  if (isManual) {
    const pWin = manualPreviewWins.get(id)
    pWin?.close()
    manualPreviewWins.delete(id)
  } else {
    hoverPreviewWin?.hide()
    hoverPreviewWin?.webContents.send('preview:clear')
  }
  
  win?.webContents.send('preview:hidden', id)
})

ipcMain.handle('preview:get-content', (_event, id: string) => {
  if (!id || id === 'null') return lastHoverContent
  return contentCache.get(id) || null 
})
