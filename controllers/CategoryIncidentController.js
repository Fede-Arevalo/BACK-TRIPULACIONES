const Category = require("../models/Category");

const CategoryIncidentController = {
  async createCategory(req, res) {
    try {
     const category= await Category.create(req.body) 
        res.send({msg:"Categoria creada con exito",category})
    } catch (error) {
        console.error(error)
        res.status(500).send({msg:"Error al crear la categoria",error})
    }
  },
};

module.exports = CategoryIncidentController;