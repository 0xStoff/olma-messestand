const express = require("express");
const db = require("./config/db.config");
const bodyParser = require("body-parser");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");

const port = 80;
const app = express();

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

db.connect((err) => {
  if (err) throw err;

  app.use(express.static(path.join("../frontend/build")));

  app.post("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });

  app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM teilnehmer", (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/api/images", (req, res) => {
    const directoryPath = path.join(__dirname, "../frontend/build/media/");
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return console.log("Unable to scan directory: " + err);
      }
      res.send(files);
    });
  });

  app.post("/api/setid", async (req, res) => {
    const sql = `UPDATE teilnehmer SET selfie=true WHERE id=${req.body.id}`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/upload", async (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const oldpath = files.file.filepath;
      const newpath = "../frontend/build/media/" + files.file.originalFilename;
      fs.rename(oldpath, newpath, (err) => {
        if (err) throw err;
        res.send("File uploaded and moved!");
      });
    });
  });

  app.post("/api/post", async (req, res) => {
    const teilnehmer = req.body;

    const replace = (data) => {
      teilnehmer[data] = teilnehmer[data].replace("'", "");
    };

    replace("vorname");
    replace("name");
    replace("adresse");
    replace("email");

    const sql = `INSERT INTO teilnehmer VALUES 
    (${teilnehmer.id},
    '${teilnehmer.vorname}',
    '${teilnehmer.name}',
    '${teilnehmer.geburtstag}',
    '${teilnehmer.adresse}', 
    '${teilnehmer.plz}', 
    '${teilnehmer.telefonnummer}', 
    '${teilnehmer.email}',
    ${teilnehmer.winnerId},
    '${teilnehmer.selfie}')`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/delete", (req, res) => {
    const sql = `DELETE FROM teilnehmer`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/winners", (req, res) => {
    const teilnehmer = req.body;
    const sql = `UPDATE teilnehmer SET winnerID=${teilnehmer.winnerId} WHERE id=${teilnehmer.id}`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/resetwinners", (req, res) => {
    const sql = `UPDATE teilnehmer SET winnerID=0`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'), (err) => {
      if (err) {
        res.status(500).send(err)
      }
    });
  });

   // Catch any bad requests
   app.get("/", (req, res) => {
    res.status(200).json({
      msg: "Catch All",
    });
  });


});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
