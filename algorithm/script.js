// ALGORİTMA 1
let strFirst = "124--354-32- 10 ";

let arrFirst = strFirst.split(/[ -]+/).filter((el) => el.trim());
let newArr = arrFirst.join(" ");
console.log("input 1:", strFirst);

console.log("output 1: ", newArr);
/***********************************************************************************/
// ALGORİTMA 2
let strSecond = "123456789";
let arrSecond = strSecond.match(/.{1,3}/g).join(" ");
console.log("input 2: ", strSecond);
console.log("output 2:", arrSecond);