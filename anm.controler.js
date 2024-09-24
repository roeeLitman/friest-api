import { error, log } from "console";
import exp from "express";
import fs from "fs/promises";
import { v4 } from "uuid";

const router = exp.Router();

router.get("/amn/summary", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    const resolt = data.reduce(
      (obj, curr) => {
        curr.activ && obj.activ++;
        curr.status && obj.in_stock++;
        return obj;
      },
      {
        activ: 0,
        in_stock: 0,
      }
    );
    resolt.sum = data.length;
    res.json(resolt);
  } catch (err) {
    res.json({
      err: err,
      message: err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    console.log(data);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      err: true,
      message: err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    //get data from  file
    const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    // Search the correct obj  
    const amn = data.find((am) => am.id === req.params.id);
    // if not fond throw error
    if (!amn) {
      throw Error("not pund");
    }
    // send to client the obj
    res.json(amn);
  } catch (err) {
    res.status(500).json({
      err: "vvv",
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    // read data and turn it into obj 
    const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    // creat new obj
    data.push({
      id: v4(),
      ...req.body,
    });
    //push infrmtion into file
    await fs.writeFile("./data.json", JSON.stringify(data), {
      encoding: "utf8",
    });
    // send to the client the obj
    res.send(req.body);
  } catch (err) {
    res.status(500).json({
      err: err,
      message: err,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
    const { type, status, activ } = req.body;
    const amn = data.findIndex((am) => am.id === req.params.id);
    const newAmn = {
      ...data[amn],
      ...req.body,
    };
    data[amn] = newAmn;

    await fs.writeFile("./data.json", JSON.stringify(data), {
      encoding: "utf8",
    });
    res.send(newAmn.id);
  } catch (err) {
    res.status(500).json({
      err: "jjj",
      messaege: err,
    });
  }
});




export default router; //xx
