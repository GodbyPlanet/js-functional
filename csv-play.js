// Play with CSV file

const fs = require("fs");

const getData = () => {
  return fs.readFileSync("1000 Sales Records.csv", "utf-8");
};

const salesRecords = getData()
  .split("\r\n")
  .map(item => item.split(";"))
  .map(item => ({
    region: item[0],
    country: item[1],
    itemType: item[2],
    salesChannel: item[3],
    orderPriority: item[4],
    orderDate: item[5],
    orderID: item[6],
    shipDate: item[7],
    unitsSold: item[8],
    unitPrice: item[9],
    unitCost: item[10],
    totalRevenue: item[11],
    totalCost: item[12],
    totalProfit: item[13]
  }))
  .slice(1, 11);

const getVegetablesRecords = salesRecords.filter(
  record => record.itemType === "Vegetables"
);

const getMostProfitableVegetablesRecord = getVegetablesRecords.reduce(
  (pre, curr) => (pre.totalProfit > curr.totalProfit ? pre : curr)
);

console.log(getMostProfitableVegetablesRecord);
