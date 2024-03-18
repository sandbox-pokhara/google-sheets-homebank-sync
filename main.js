const DEFAULT_ROW = [new Date(), 8, -1000, "", 2, false];
// parse google drive file id of your homebank xhb file
// by creating a share link, the file id is included in
// in the share link
const FILE_ID = "GOOGLE_DRIVE_FILE_ID";

// adds a new line to homebank xhb file
function addTxnToXhb(data) {
  const file = DriveApp.getFileById(FILE_ID);
  let content = file.getBlob().getDataAsString();
  const lines = content.split("\n");
  lines.splice(lines.length - 2, 0, data);
  content = lines.join("\n");
  file.setContent(content);
  console.log("Trasaction added to xhb file.");
}

// parses data from google sheets, then updates the homebank file in google drive
function sync() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = sheet
    // 2 is the second row, 6 is number of columns to read
    .getRange(2, 1, sheet.getLastRow() - 1, 6)
    .getValues();
  data.forEach((row, i) => {
    const [date, account, amount, description, status, isSynced] = row;
    if (date && account && amount && description && status && !isSynced) {
      // 719163 is days since 0001-01-01 from 1970-01-01
      const julianDate = parseInt(date / 1000 / 3600 / 24 + 719163);
      const code = `<ope date="${julianDate}" amount="${amount}" account="${account}" st="${status}" wording="${description}"/>`;
      addTxnToXhb(code);
      // set synced to true
      sheet.getRange(i + 2, 6, 1, 1).setValue(true);
    }
  });
}

// helper function to create a row with default values to the sheet
// create your own trigger for this
function addRow() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  sheet.appendRow(DEFAULT_ROW); // default value
}
