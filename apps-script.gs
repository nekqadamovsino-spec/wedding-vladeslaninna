function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ответы') ||
                SpreadsheetApp.getActiveSpreadsheet().insertSheet('Ответы');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Дата ответа', 'Имя и фамилия', 'Присутствие', 'Напитки', 'Комментарий', 'Свадьба']);
  }

  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name || '',
    data.attendance || '',
    data.alcohol || '',
    data.comment || '',
    data.wedding || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
