/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { calculator, Operation } from "./calculator";
import express from "express";

app.use(express.json());

// ...

app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;

  const operation = op as Operation;

  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "..." });
  }

  const result = calculator(Number(value1), Number(value2), operation);

  return res.send({ result });
});
