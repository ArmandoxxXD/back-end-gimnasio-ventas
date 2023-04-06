import pago from "../models/pago"
import products  from "../models/producto";
import corteDiario from "../models/corteDiario";

export const getPagos = async (req, res) => {
    const pagos = await pago.find().lean();
    return res.json(pagos);
}

export const addPago = async (req, res) => {
    const { productos, tipoPago } = req.body;

    for (let i = 0; i < productos.length; i++) {
        const producto = await products.findOne({ nombreProducto: productos[i].nombre });
        if (!producto) return res.json({ msg: "product not found" });
        if (producto.cantidad < productos[i].cantidad) return res.json({ msg: "cantidad not found" });
    }

    for (let i = 0; i < productos.length; i++) {
        const  data = await products.findOne({ nombreProducto: productos[i].nombre }, {cantidad: true});
        await products.updateOne({nombreProducto: productos[i].nombre},{ $set: { cantidad: (data.cantidad - productos[i].cantidad) } })
    }

    const nombres = productos.map(x => x.nombre);

    const pro = await products.find({ nombreProducto: { $in: nombres } }, { nombreProducto: true, precio: true, _id: false })
    const precios = {};
    for (const producto of pro) {
        precios[producto.nombreProducto] = producto.precio;
    }

    // Luego, puedes calcular el total recorriendo el arreglo de productos comprados y sumando los precios
    let total = 0;
    for (const producto of productos) {
        const precio = precios[producto.nombre];
        if (precio === undefined) {
            // Si el producto no existe en la base de datos, no se puede calcular el precio y se muestra un error
            console.error(`El producto ${producto.nombre} no está en la base de datos`);
            continue;
        }
        total += precio * producto.cantidad;
    }
    const newPago = {
        productos: productos,
        tipoPago: tipoPago,
        fecha: new Date(new Date()),
        total: total
    }

    const pagoData = await pago(newPago); 
    const pagoSave = await pagoData.save();
    return res.json(pagoSave);
}

export const removePago = async (req, res) => {
    const { id } = req.params;
    const pagoData = await pago.findOne({ _id: id });

    if (!pagoData) return res.json({ msg: "pago not found" });
    const removePago = await pago.remove({ _id: id });
    return res.json(removePago);
}


export const addCorteDiario = async (req, res) => {
    const count = await corteDiario.find({fecha: {$eq: new Date(new Date().setHours(0, 0, 0, 1))}}).count()
    if(count == 0) {
        const totalPaypal = await pago.find({tipoPago: "Paypal", fecha: {    $gte: new Date(new Date().setHours(0, 0, 0, 0)),$lt: new Date(new Date().setHours(23, 59, 59, 999))}})
        const totalEfectivo = await pago.find({tipoPago: "Efectivo", fecha: {    $gte: new Date(new Date().setHours(0, 0, 0, 0)),$lt: new Date(new Date().setHours(23, 59, 59, 999))}})
        const totalDia = await pago.find({fecha: {    $gte: new Date().setHours(0, 0, 0, 0),$lt: new Date(new Date().setHours(23, 59, 59, 999))}})
        let countTotal = 0;
        totalDia.forEach(data => {
            countTotal += data.total;
        })

        let countTotalPaypal = 0;
        totalPaypal.forEach(data => {
            countTotalPaypal += data.total;
        })

        let countTotalEfectivo = 0;
        totalEfectivo.forEach(data => {
            countTotalEfectivo += data.total;
        })
        const nuevoCorte = {
            total: countTotal,
            fecha: new Date().setHours(0, 0, 0, 1),
            totalEfectivo: countTotalEfectivo,
            totalPaypal: countTotalPaypal
        }
        const dia = corteDiario(nuevoCorte);
        const save = dia.save();
        res.json(save);
    } else {
        const totalPaypal = await pago.find({tipoPago: "Paypal", fecha: {    $gte: new Date(new Date().setHours(0, 0, 0, 0)),$lt: new Date(new Date().setHours(23, 59, 59, 999))}})
        const totalEfectivo = await pago.find({tipoPago: "Efectivo", fecha: {    $gte: new Date(new Date().setHours(0, 0, 0, 0)),$lt: new Date(new Date().setHours(23, 59, 59, 999))}})
        const totalDia = await pago.find({fecha: {    $gte: new Date(new Date().setHours(0, 0, 0, 0)),$lt: new Date(new Date().setHours(23, 59, 59, 999))}})
        let countTotal = 0;
        totalDia.forEach(data => {
            countTotal += data.total;
        })

        let countTotalPaypal = 0;
        totalPaypal.forEach(data => {
            countTotalPaypal += data.total;
        })

        let countTotalEfectivo = 0;
        totalEfectivo.forEach(data => {
            countTotalEfectivo += data.total;
        })
        const update = await corteDiario.updateOne({fecha: {$eq: new Date().setHours(0, 0, 0, 1)}}, {$set: {
            total: countTotal,
            totalEfectivo: countTotalEfectivo,
            totalPaypal: countTotalPaypal
        }})
        res.json(update);
    }
}

export const getCortes = async (req, res) => {
    const cortes = await corteDiario.find();
    return res.json(cortes);
}

export const getCorteDiario = async (req, res) => {
    const corte = await corteDiario.find({fecha: {$eq: new Date(new Date().setHours(0, 0, 0, 1))}})

    return res.json(corte)
}

export const getCorteMes = async (req, res) => {
    const { mes } = req.params;
    const startOfMonth = new Date(Date.UTC(2023, mes - 1, 1)); // primer día del mes
    const endOfMonth = new Date(Date.UTC(2023, mes, 1)); // primer día del siguiente mes
    const cortes = await corteDiario.find({ fecha: { $gte: startOfMonth, $lt: endOfMonth } });
    return res.json(cortes)
}

export const getCorteA = async (req, res) => {
    const { anio } = req.params;
    const cortes = await corteDiario.find({
        $expr: {
            $eq: [{ $year: "$fecha" }, anio]
        }
    });
    return res.json(cortes)
}

