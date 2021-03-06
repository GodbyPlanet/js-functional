const fs = require("fs");

const getData = () => {
  return fs.readFileSync("1000 Sales Records.csv", "utf-8");
};

const partial = (fn, ...args) => (...restArgs) => fn(...args, ...restArgs);
const split = (reg, data) => data.split(reg);
const slice = (from, to, xs) => xs.slice(from, to);
const map = (fn, xs) => xs.map(fn);
const filter = (fn, xs) => xs.filter(fn);
const reduce = (fn, xs) => xs.reduce(fn);
const compose = (...fns) => (...args) =>
  fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const splitSalesRecordsByNewLine = partial(split, "\r\n");
const splitedByNewLine = splitSalesRecordsByNewLine(getData());
const splitRecordsBySemiColon = partial(split, ";");
const mapAndSplitBySemiColon = partial(map, record =>
  splitRecordsBySemiColon(record)
);
const splitedRecordsBySemiColon = mapAndSplitBySemiColon(splitedByNewLine);
const mapRecordToObject = item => ({
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
});
const mapppedRecordsToObjects = map(
  record => mapRecordToObject(record),
  splitedRecordsBySemiColon
);
const firstTenRecords = partial(slice, 1, 11);

const getVegetablesRecordsFP = filter(
  record => record.itemType === "Vegetables",
  firstTenRecords(mapppedRecordsToObjects)
);

const getMostProfitableVegetablesRecordFP = reduce(
  (prev, curr) => (prev.totalProfit > curr.totalProfit ? prev : curr),
  getVegetablesRecordsFP
);

const mappedToObjectRecords = compose(
  partial(map, record => mapRecordToObject(record)),
  mapAndSplitBySemiColon,
  splitSalesRecordsByNewLine
);

const getFirstTenRecords = firstTenRecords(mappedToObjectRecords(getData()));

const getMapppedObjects = partial(map, record => mapRecordToObject(record));
const getVegetablesRecords = partial(
  filter,
  record => record.itemType === "Vegetables"
);
const getMostProfitableRecord = partial(reduce, (prev, curr) =>
  prev.totalProfit > curr.totalProfit ? prev : curr
);

const getMostProfitableVegetablesRecordCompose = compose(
  getMostProfitableRecord,
  firstTenRecords,
  getVegetablesRecords,
  getMapppedObjects,
  mapAndSplitBySemiColon,
  splitSalesRecordsByNewLine
);

console.log(getMostProfitableVegetablesRecordCompose(getData()));
