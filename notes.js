const fs = require("fs");
const chalk = require('chalk')

const getNotes = ()=> {};

const addNotes = (title, body)=> {
  const notes = loadNotes();

  const duplicateNote = notes.find((note)=>{
   return note.title === title
  })
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });

  if(notes.length>notesToKeep.length){
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(notesToKeep);
  }else{
    console.log(chalk.red.inverse('No note found!'))
  }
  
};

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.blue.inverse("Your Notes"))
    notes.forEach(((note)=>{
        console.log(note.title)
    }))

}

const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((note)=>{
        return note.title === title
    })
if(note){
    console.log(chalk.inverse(note.title))
    console.log(note.body)
}else{
    console.log(chalk.red.inverse('No note found of that title.'))
}

}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote:readNote
};
