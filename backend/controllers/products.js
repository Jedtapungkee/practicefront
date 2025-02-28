const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//insert a new product
const createProduct = async (req, res) => {
    const { product_id, name, description, price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json({
            status: "ok",
            message: `Product with id ${prod.product_id} inserted successfully`,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error inserting product",
            error: err.message
        });

    }
};

//get all products
const getProducts = async (req, res) => {
    const prods = await prisma.products.findMany();
    res.json(prods);
}

//get a product by id
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const prod = await prisma.products.findUnique({
            where: {
                product_id: Number(id)
            }
        });
        if (!prod) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        } else {
            res.status(200).json(prod);
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

//delete a product
const deleteProduct = async (req,res) => {
    const id = req.params.id;
    try{
        const existingProduct = await prisma.products.findUnique({
            where: {
                product_id: Number(id)
            }
        });
        //ถ้าไม่มี product ให้ return 404
        if(!existingProduct){
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }else{
            //ถ้ามี product ให้ลบ product นั้น
            await prisma.products.delete({
                where: {
                    product_id: Number(id)
                }
            });
            res.status(200).json({
                status: "ok",
                message: `Product with id ${id} deleted successfully`
            });
        }

    }catch(err){
        console.error('Delete Product error', err);
        res.status(500).json({error: err.message});
    }
}

//update a product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.update({
            where: {
                product_id: Number(id)
            },
            data: {
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json({
            status: "ok",
            message: `Product with id ${prod.product_id} updated successfully`
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Error updating product",
            error: err.message
        });
    }
}


module.exports = { createProduct, getProducts , getProduct , deleteProduct, updateProduct };