const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json({}));

function encodePassword(pwd) {
  const ABJAD = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const abjad = ABJAD.toLowerCase();
  const formula = (n) => (n + 2) * 3;

  const arrPwd = String(pwd).split("");

  const newArrPwd = arrPwd.map((val, index) => {
    const intVal = parseInt(val);
    if (intVal >= 0) return formula(intVal) % 10;

    const selectedAbjad = abjad.indexOf(val) < 0 ? ABJAD : abjad;
    const indexVal = abjad.indexOf(val.toLowerCase());
    const newIndexVal = formula(indexVal) % abjad.length;

    return selectedAbjad[newIndexVal];
  });

  return newArrPwd.join("");
}

app.get("/", (req, res) => {
  res.send("<h1>Jangan Lupa Nafas!</h1>");
});

app.post("/encode", (req, res) => {
  const { pwd } = req.body;

  let encodedPwd = encodePassword(pwd);

  res.json({ pwd, encodedPwd });
});

app.listen(80, () => {
  console.log("App listening on port 3000");
});

module.exports = app;
