const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi')


const GenreSchema = new mongoose.Schema({
    name:{
        type : String,
        required :true,
        minlength : 5,
        maxlength: 150
    }
})
const Genre = mongoose.model("Genre", GenreSchema);

router.get('/',async(req, res)=>{
    const result = await  Genre.find();
    res.send(result);
})

router.get('/:id',async(req, res)=>{
   const genre = await Genre.findById(req.params.id)
   if(!genre)
   {
       res.status(404).send("genre not found");
   }
   else
   {
       res.send(genre);
   }
});

router.post('/',async(req, res) => {
   const { error } = validate(req.body);
   if(error)
   {
       res.status(400).send(error.details[0].message);
   }
   let genre = new Genre({name :req.body.name});

   genre = await genre.save();
   res.send(genre);
})

router.put("/:id", async(req, res)=>{

    const { error } = validate(req.body);
    if(error)
   {
       res.status(400).send(error.details[0].message);
   }
    const genre =await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name} ,{new:true});
    if(!genre)
   {
    res.status(404).send("gnere not found");
   }
   res.send(genre);

})

router.delete('/:id',async (req,res)=>{

   //mongodb code
   const genre = await Genre.findByIdAndRemove(req.params.id)
   if(!genre)
   {
       res.status(404).send("gnere not found");
   }
   res.send(genre);
})
function validate(genre)
{
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;

