import products  from "../models/producto";

/*
export const getProducts = async (req, res) => {
  const product = await products.find().lean();
  return res.json(product);
}; */

export const getProductByCodeBar = async (req, res) => {
  const { codeBar } = req.params;
  const product = await products.findOne({ codeBar: codeBar });
  res.json(product);
};

/*
export const addProduct = async (req, res) => {
  const { nombreProducto, precio, tipo, stock, codeBar, img } = req.body;
  const newProduct = {
    nombreProducto: nombreProducto,
    precio: precio,
    tipo: tipo,
    stock: stock,
    codeBar: codeBar,
    img: img,
  }; 

  const codeBarDup = await products.findOne({ codeBar: codeBar });
  if (codeBar != codeBarDup) {
    const product = products(newProduct);
    const productsSave = await product.save();
    res.json(productsSave);
  } else {
    res.json({ msg: "Codigo de Barras Duplicado" });
  }
}; 
*/

/*
export const removeProduct = async (req, res) => {
  const { name } = req.params;
  const product = await products.findOne({ nombreProducto: name });

  if (product == null) {
    res.json({ msg: "product not found" });
  } else {
    const updateProduct = await products.remove({ nombreProducto: name });
    res.json(updateProduct);
  }
};

export const updateProduct = async (req, res) => {
  const { precio, tipo, stock, img } = req.body;
  const { name } = req.params;

  const product = await products.findOne({ nombreProducto: name });

  if (product == null) {
    res.json({ msg: "product not found" });
  } else {
    if (precio != null && precio != 0)
      await products.updateOne({ nombreProducto: name }, { $set: { precio: precio } });
    if (tipo != null && tipo != "")
      await products.updateOne({ nombreProducto: name }, { $set: { tipo: tipo } });
    if (stock != null && precio != 0)
      await products.updateOne({ nombreProducto: name }, { $set: { stock: stock } });
    if (img != null && img != "")
      await products.updateOne({ nombreProducto: name }, { $set: { img: img } });
    const updateProduct = await products.findOne({ nombreProducto: name });
    res.json(updateProduct);
  }
};  */


export const searchProductByName = async (req, res) => {
  const { name } = req.params;
  const productList = await products.find({
    nombreProducto: { $regex: ".*" + name + "*." },
  });

  res.json(productList);
}; 

export const searchProductByType = async (req, res) => {
  const { type } = req.params;
  const productList = await products.find({
    tipo: { $regex: ".*" + type + "*." },
  });

  res.json(productList);
};
