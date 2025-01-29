import { Router } from 'express';
import Student from '../modals/student.js';
import authenticateToken from '../authentication.js';
const router = Router();
router.get('/', authenticateToken, async (req, res) => {
    try {
        const data = await Student.find({ createdBy: req.cookies.userdata });
        console.log(data);
        res.render('dashboard', { students: data });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});
//<{}, {}, RegisterRequestBody>
router.post('/addstudent', async (req, res) => {
    const { name, email, phone, RegistrationNumber } = req.body;
    try {
        console.log('Request body:', req.body);
        // Hash the password
        const emailone = await Student.findOne({ email });
        const regno = await Student.findOne({ RegistrationNumber });
        if (emailone && regno) {
            res.status(400).json({ message: 'Email or Registration number already exists' });
        }
        else if (emailone) {
            res.status(400).json({ message: 'Email already exists' });
        }
        else if (regno) {
            res.status(400).json({ message: 'Registration number already exists' });
        }
        else {
            const newStud = new Student({
                name,
                email,
                phone,
                RegistrationNumber,
                createdBy: req.cookies.userdata,
            });
            await newStud.save();
            console.log("student saved successfully ===", newStud);
            res.status(201).json({ message: 'User registered successfully!' });
            //  res.redirect('/user')
        }
    }
    catch (error) {
        console.error('Error saving user:');
        res.status(500).json({ error: 'Failed to register user.' });
    }
});
//  router.get('/addstudent',authenticateToken,async (req:Request,res:Response) => {
//     const used = await Student.find();
//      console.log(used);
//     res.render('addstudent')
//  });
//  router.post('/editstudent/:id', async (req: Request, res: Response) => {
//   const id=req.params.id;
//   res.send("edit student");
// }) 
router.put('/editstudent/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, RegistrationNumber } = req.body;
    console.log(req.body);
    try {
        const emailinvalid = await Student.findOne({ email: email, _id: { $ne: id } });
        const regnoinvalid = await Student.findOne({ RegistrationNumber: RegistrationNumber, _id: { $ne: id } });
        if (emailinvalid || regnoinvalid) {
            if (emailinvalid) {
                res.status(400).json({ message: 'Email already exists' });
                return;
            }
            else {
                res.status(400).json({ message: 'Registration number already exists' });
                return;
            }
        }
        const updatedStudent = await Student.findByIdAndUpdate(id, { name, email, phone, RegistrationNumber }, { new: true, runValidators: true });
        if (!updatedStudent) {
            res.status(404).json({ message: 'Student not found' });
        }
        console.log('Student updated successfully:', updatedStudent);
        res.json(updatedStudent);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// router.get('/editstudent/:id', async (req: Request, res: Response) => {
//   const id=req.params.id;
//   const student = await Student.findOne({_id:id});
//   console.log("get edit student",student);
//   res.render('editstudent',{student})
// })
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id); // Delete student from database
        if (!deletedStudent) {
            res.status(404).json({ message: 'Student not found' });
        }
        else {
            const used = await Student.find();
            console.log("remainning stud", used);
            res.json(used);
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});
export default router;
