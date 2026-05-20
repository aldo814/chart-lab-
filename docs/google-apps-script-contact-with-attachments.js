const CONFIG = {
  recipientEmail: "contact@example.com",
  driveFolderId: "",
};

function doPost(e) {
  const params = e.parameter || {};
  const attachments = parseAttachments(params.attachments);
  const savedFileUrls = saveFilesToDrive(attachments);

  const body = [
    "[홈페이지 문의]",
    "",
    `기업명 / 부서: ${params.company || ""}`,
    `성함: ${params.name || ""}`,
    `이메일: ${params.email || ""}`,
    `연락처: ${params.tel || ""}`,
    `제목: ${params.subject || ""}`,
    `접수 시간: ${params.timestamp || ""}`,
    "",
    "내용:",
    params.message || "",
    "",
    "첨부파일:",
    savedFileUrls.length ? savedFileUrls.join("\n") : "없음",
  ].join("\n");

  MailApp.sendEmail({
    to: CONFIG.recipientEmail,
    subject: `[홈페이지 문의] ${params.subject || "제목 없음"}`,
    body,
    attachments: attachments.map((file) =>
      Utilities.newBlob(
        Utilities.base64Decode(file.data),
        file.type || "application/octet-stream",
        file.name || "attachment"
      )
    ),
  });

  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, files: savedFileUrls })
  ).setMimeType(ContentService.MimeType.JSON);
}

function parseAttachments(value) {
  if (!value) return [];

  try {
    const files = JSON.parse(value);
    return Array.isArray(files) ? files.filter((file) => file && file.data) : [];
  } catch (error) {
    return [];
  }
}

function saveFilesToDrive(files) {
  if (!CONFIG.driveFolderId || !files.length) return [];

  const folder = DriveApp.getFolderById(CONFIG.driveFolderId);

  return files.map((file) => {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(file.data),
      file.type || "application/octet-stream",
      file.name || "attachment"
    );
    return folder.createFile(blob).getUrl();
  });
}
