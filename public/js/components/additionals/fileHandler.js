function readFile(file) {
  return new Promise((solve, reject) => {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        solve(rawFile.responseText);
      }
      if (rawFile.status != "200") {
        reject("the file doesn't exists");
      }
    };
    rawFile.send(null);
  });
}

export { readFile };
