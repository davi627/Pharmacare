import express from 'express'
import { Prescriptions } from '../Models/Prescriptions.js'
import multer from 'multer'
import path from 'path'
const router= express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

router.post('/prescriptions',upload.single('image'),async(req,res)=>{
    try {
        const{patientsName,doctorName,date,notes}=req.body
        const image = req.file?req.file.path : null;
        const prescription = new Prescriptions({
            patientsName,
            doctorName,
            date,
            notes,
            image
        })
        await prescription.save()
        res.status(201).json({message: 'Prescription created successfully'})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Server Error'})
        
    }
})

export {router as PrescriptionRouter}