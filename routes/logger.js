const express = require('express');
const router = express.Router();
const genres = [
    {id:1, name:"action"},
    {id:2, name:"drama"},
    {id:3, name:"horror"},
    {id:4, name:"comedy"},
    {id:5, name:"crime"},
    {id:6, name:"adult"},
    {id:7, name:"adventure"} 
];

router.get('/',(req, res)=>{
    res.send(genres);
})

router.get('/:id',(req, res)=>{
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if(!genre)
   {
       res.status(404).send("gnere not found");
   }
   else
   {
       res.send(genre);
   }
});

router.post('/',(req, res) => {
   const { error } = validate(req.body);
   if(error)
   {
       res.status(400).send(error.details[0].message);
   }
   const  genre = {
       id : genres.length +1,
       name :req.body.name
   }
   genres.push(genre);
   res.send(genre);
})

router.put("/:id",(req, res)=>{
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if(!genre)
   {
       res.status(404).send("gnere not found");
   } 
   const { error } = validate(req.body);
   if(error)
   {
       res.status(400).send(error.details[0].message);
   }
   genre.name = req.body.name;
   res.send(genre);

})

router.delete('/:id',(req,res)=>{
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if(!genre)
   {
       res.status(404).send("gnere not found");
   } 
   const index = genres.indexOf(genre);
   genres.splice(index, 1);
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
