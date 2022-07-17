const vscode = require("vscode");
const QRCode = require("qrcode-generator");

const editor = vscode.window.activeTextEditor;

const CELL_SIZE = 5;
const MARGIN = 8;
const ERROR_CORRECTION_LEVEL = "L";

const createQRCode = () => {
  const selectedText = editor.document.getText(editor.selection);
  const typeNumber = 0;
  const qr = QRCode(typeNumber, ERROR_CORRECTION_LEVEL);
  qr.addData(selectedText);
  qr.make();

  const image = qr.createImgTag(CELL_SIZE, MARGIN);
  return image;
};

const generateQRCode = () => {
  const imageQR = createQRCode();
  const panel = vscode.window.createWebviewPanel(
    "qrcode",
    "QR Preview",
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    {}
  );
  panel.webview.html = `${imageQR}`;
};

const activate = (context) => {
  const disposable = vscode.commands.registerCommand(
    "qr-generator.generateQR",
    () => {
      generateQRCode();
    }
  );
  context.subscriptions.push(disposable);
};

module.exports = {
  activate,
};
