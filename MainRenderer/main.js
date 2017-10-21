console.log('Main process loading...');
console.log('main.js');

const electron = require("electron");
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let winOne, winTwo;

function createWindow(){
    winOne = new BrowserWindow();
    winTwo = new BrowserWindow();

    winOne.loadURL(url.format({
        pathname: path.join(__dirname, 'winone.html'),  
        protocol: 'file',
        slashes: true
    }));

    winTwo.loadURL(url.format({
        pathname: path.join(__dirname, 'wintwo.html'),
        protocol: 'file',
        slashes: true
    }));

    winOne.webContents.openDevTools();
    winTwo.webContents.openDevTools();
    
    winOne.on('closed', () => {
        winOne = null;
    })

     winTwo.on('closed', () => {
        winTwo = null;
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})