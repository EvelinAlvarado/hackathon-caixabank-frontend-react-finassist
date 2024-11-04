import * as XLSX from "xlsx";

export const exportToExcel = (transactions) => {
  const worksheetData = transactions.map((transaction) => ({
    Description: transaction.description,
    Amount: transaction.amount,
    Type: transaction.type,
    Category: transaction.category,
    Date: transaction.date,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

  XLSX.writeFile(workbook, "transactions.xlsx");
};
