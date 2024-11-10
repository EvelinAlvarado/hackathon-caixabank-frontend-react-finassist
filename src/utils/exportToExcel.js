import * as XLSX from "xlsx";

export const exportToExcel = (data, fileName = "data") => {
  const worksheetData = data.map((item) => ({
    ...item,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
