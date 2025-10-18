const { app, BrowserWindow } = require('electron')
function createWindow() {
  const win = new BrowserWindow({ width: 1024, height: 768 })
  win.loadURL('http://localhost:3000') // or your deployed URL
}
app.whenReady().then(createWindow)
