// Functional with ramda
const { split, map, filter, reduce, slice, compose } = require("ramda");
const fs = require("fs");

const getData = () => {
  return fs.readFileSync("1000 Sales Records.csv", "utf-8");
};

const mostProfitableRecord = (prev, curr) =>
  prev.totalProfit > curr.totalProfit ? prev : curr;

const getMostProfitableVegetablesRecordCompose = compose(
  reduce(mostProfitableRecord, 0),
  slice(1, 11),
  filter(record => record.itemType === "Vegetables"),
  map(record => mapRecordToObject(record)),
  map(record => split(";", record)),
  split("\r\n")
);
console.log(getMostProfitableVegetablesRecordCompose(getData()));
