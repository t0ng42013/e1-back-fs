import inquirer from "inquirer";
import { get, write } from "./fileMethods.js";

const agregarGastos = async () => {
  return await inquirer
    .prompt([
      {
        type: "input",
        name: "description",
        message: "Descripción:",
      },
      {
        type: "number",
        name: "monto",
        message: "Monto: ",
      },
    ])
    .then(async (data) => {
      const newGasto = {
        id: Date.now(),
        description: data.description,
        monto: data.monto,
      };
      const gastosActuales = await get("src/db/data");
      gastosActuales.push(newGasto);
      await write("src/db/data", gastosActuales);
    });
};

const mostarGastos = async () => {
  const gastosActuales = await get("src/db/data");
  console.table(gastosActuales);
};

const main = async () => {
  let run = true;

  while (run) {
    const { chosen } = await inquirer.prompt([
      {
        type: "list",
        name: "chosen",
        message: "Elige",
        choices: [
          { value: 1, name: "Agregar un gasto" },
          { value: 2, name: "Ver todos los gastos" },
          { value: 3, name: "Salir" },
        ],
      },
    ]);
    switch (chosen) {
      case 1:
        await agregarGastos();
        break;
      case 2:
        await mostarGastos();
        break;
      case 3:
        run = false;
        break;
      default:
        run = false;
        break;
    }
    console.log("FIN");
  }
};

main();
