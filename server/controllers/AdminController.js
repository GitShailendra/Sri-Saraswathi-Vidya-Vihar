const Admin = require('../models/AdminModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/GenerateToken')

exports.createAdmin = async (req, res) => {
    try {
        const { email, password, setupKey } = req.body;
        console.log(email)
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Log the setup process
        console.log('Starting admin creation process...');
        console.log('Setup key received:', setupKey);
        console.log('Environment setup key:', "this-is-secret");

        // Verify setup key
        if (setupKey !== "this-is-secret") {
            console.log('Setup key verification failed');
            return res.status(401).json({
                success: false,
                message: 'Invalid setup key'
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists');
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        const admin = new Admin({
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin created successfully');

        res.status(201).json({
            success: true,
            message: 'Admin created successfully'
        });

    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating admin'
        });
    }
};

exports.login = async (req,res) =>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            })
        };
        const existingAdmin = await Admin.findOne({email}).select('+password');
        if(!existingAdmin){
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            })
        };
        const isPasswrdValid  = await bcrypt.compare(password, existingAdmin.password);
        if(!isPasswrdValid){
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            })
        };
        const user = {
            id: existingAdmin._id,
            email: existingAdmin.email,
            role: existingAdmin.role
        };
       const token =  generateToken(user);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message || 'Error logging in'
        })
    }
}