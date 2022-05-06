const vscode = require('vscode');
const QRCode = require('qrcode-generator');

const editor = vscode.window.activeTextEditor;

const CELL_SIZE = 5;
const MARGIN = 8;
const ERROR_CORRECTION_LEVEL = "L";


function CreateQRCode() {
	const selectedText = editor.document.getText(editor.selection);
	const typeNumber = 0;
	const qr = QRCode(typeNumber, ERROR_CORRECTION_LEVEL);
	qr.addData(selectedText);
	qr.make();

	const image = qr.createImgTag(CELL_SIZE, MARGIN);
	return image;
}

function GenerateQRCode() {
	const imageQR = CreateQRCode();
	const panel = vscode.window.createWebviewPanel(
		"qrcode",
		"QR Preview",
		vscode.ViewColumn.One,
		{}
	);
	panel.webview.html = `${imageQR}`;
}

function activate(context) {
	const disposable = vscode.commands.registerCommand(
		"qr-generator.generateQR",
		function () {
			GenerateQRCode();
		}
	);
	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
