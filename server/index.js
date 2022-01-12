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

  app.get("/api/vorname", (req, res) => {
    db.query(
      `SELECT vorname FROM gewinnspiel_daten  WHERE selfie != '0'`,
      (err, result, fields) => {
        if (err) throw err;
        res.send(result);
      }
    );
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
    fs.readdir("../frontend/build/media/", (err, files) => {
      const sql = `UPDATE gewinnspiel_daten SET selfie='selfie${files.length}' WHERE teilnehmer_id=${req.body.id};
      UPDATE teilnehmer SET selfie='selfie${files.length}' WHERE teilnehmer_id=${req.body.id};
      SELECT vorname FROM teilnehmer WHERE teilnehmer_id=${req.body.id};`;

      db.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
      });
    });
  });

  app.post("/api/upload", async (req, res) => {
    let dirLength;
    fs.readdir("../frontend/build/media/", (err, files) => {
      dirLength = files.length;
    });
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const oldpath = files.file.filepath;
      const extension = path.extname(files.file.originalFilename);
      const newpath = `../frontend/build/media/selfie${dirLength}${extension}`;
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
    '${teilnehmer.email}','${teilnehmer.selfie}'); 
    INSERT INTO gewinnspiel_daten VALUES 
    (${teilnehmer.id},
     ${teilnehmer.winnerId},
     '${teilnehmer.vorname}',
     '${teilnehmer.selfie}',
     ${teilnehmer.questions});`;

    db.query(sql, [1, 2], (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/delete", (req, res) => {
    const directoryPath = path.join(__dirname, "../frontend/build/media/");

    fs.readdir(directoryPath, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(directoryPath, file), (err) => {
          if (err) throw err;
        });
      }
    });

    const sql = `DELETE gewinnspiel_daten, teilnehmer FROM gewinnspiel_daten INNER JOIN teilnehmer`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/winners", (req, res) => {
    const teilnehmer = req.body;
    let endResult = [];

    db.query(`UPDATE gewinnspiel_daten SET winner_id=0;`);

    for (let i = 0; i < teilnehmer.length; i++) {
      const sql = `UPDATE gewinnspiel_daten SET winner_id=${teilnehmer[i].winnerId} WHERE teilnehmer_id=${teilnehmer[i].teilnehmer_id}`;
      db.query(sql, (err, result, fields) => {
        if (err) throw err;
        endResult[i] = result;
      });
    }
    res.send(endResult);
  });

  app.post("/api/resetwinners", (req, res) => {
    const sql = `UPDATE teilnehmer SET winnerID=0`;

    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/api/questions", (req, res) => {
    db.query("SELECT * FROM gewinnspiel_fragen", (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.post("/api/result", (req, res) => {
    const sql = `INSERT INTO umfrage(frage_0,frage_1,frage_2,frage_3,frage_4) VALUES
    (${req.body.frage0},${req.body.frage1},${req.body.frage2},${req.body.frage3},${req.body.frage4})`;
    db.query(sql, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/api/allresults", (req, res) => {
    db.query("SELECT * FROM umfrage", (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/build/index.html"),
      (err) => {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
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
