const filestorageengine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    // Extract the original extension
    const ext = path.extname(file.originalname);
    // Generate UUID and append the extension
    const filename = `${crypto.randomUUID()}${ext}`;
    callback(null, filename);
  },
});

const upload = multer({ storage: filestorageengine });



app.get('/upload/:id', (req, res)=>{
    const id = req.params.id
    if (!id) {
        res.status(400).send("No FileID parameter")
    }
    const UPLOAD_PATH = path.join(__dirname, './uploads')
    const files = fs.readdirSync(UPLOAD_PATH)
    const match = files.find(file => path.parse(file).name === id)

    if(!match){
        res.status(404).send("File Not Found")
    } else {
        res.download(path.join(UPLOAD_PATH, match))
    }
})
app.post('/upload', upload.array('files', 5), (req, res) => {
  console.log(req.files);
  const fileIDs = req.files.map(item=> path.parse(item.filename).name)
  res.status(200).json(fileIDs);
});
