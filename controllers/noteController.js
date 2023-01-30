const Notes = require('../models/noteModel')


const getNotes = async (req, res) =>{
        try {
            const notes = await Notes.find({user_id:req.user.id})
            res.json(notes)
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

const createNote = async(req, res) =>{
        try {
            const {title, content, date, category} = req.body;
            const newNote = new Notes({
                title,
                content,
                date,
                user_id: req.user.id,
                name: req.user.name,
                category: category
            })
            await newNote.save()
            res.json({msg: "Created a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
const deleteNote = async(req, res) =>{
        try {
          const note= await Notes.findByIdAndDelete(req.params.id)
          if(!note) return res.json({msg: "No Note found"})
          res.json({msg: "Deleted a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
const updateNote = async(req, res) =>{
        try {
            const {title, content, date, category} = req.body;
            await Notes.findOneAndUpdate({_id: req.params.id},{
                title,
                content,
                date,
                category
            })
            res.json({msg: "Updated a Note"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
const getNote = async(req, res) => {
        try {
            const note = await Notes.findById(req.params.id)
            res.json(note)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
//by category
const getByCategory = async(req, res)=>{
  try {
    const note = await Notes.find({category:req.params.category});
    return res.json(note);
  } catch (e) {
    return res.status(500).json({msg: err.message})
  }
}
    
module.exports = {getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getByCategory
}