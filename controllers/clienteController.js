const Clientes = require("../models/Clientes");

// Agregar nuevo Cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    // Almacer Registro
    await cliente.save();
    res.json({ msg: "Se agrego un nuevo cliente" });
  } catch (error) {
    // Si hay un Error, console.log y next
    console.log(error);
    next();
  }
};

// Mostrar todos los Clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra un cliente por su ID
exports.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ msg: "Cliente no existe" });
    next();
  }
  // Mostrar el cliente
  res.json(cliente);
};

// Actualiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
};

// Elimina un cliente por su ID
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
