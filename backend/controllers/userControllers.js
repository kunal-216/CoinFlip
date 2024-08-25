import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModels.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = createToken(user._id);
        res.json({token})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
    const { email, password, name, gender, dob } = req.body;

    try {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            email,
            password: hashedPassword,
            name,
            gender,
            dob
        });

        const token = createToken(user._id);
        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProfileDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await userModel.findById(id)
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching user details" });
    }
}

export { loginUser, registerUser, getProfileDetails };
