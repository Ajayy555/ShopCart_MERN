import { User } from "../models/user.model.js";
import { generateUserToken } from "../utils/jwt.js";
import { hashedPassword, isPasswordCorrect } from "../utils/bcrypt.js";

const addUser = async (req, res) => {
  const { name, dob, email, mobile, password } = req.body;

  if (!name || !dob || !email || !mobile || !password) {
    return res.status(401).json({ message: "Pls fill all mandatory fields" });
  }

  const existedUser = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existedUser) {
    return res
      .status(409)
      .json({ message: "user email or mobile already existed" });
  }

  const user = await User.create({
    name,
    dob,
    email,
    mobile,
    password: await hashedPassword(password),
  });

  const chekCreatedUser = await User.findById(user._id).select(
    "-password -token"
  );

  if (!chekCreatedUser) {
    res.status(500).json({ message: "Internal error while creating user" });
  }

  res.status(200).json({
    success: true,
    message: "User created succesfully",
  });
};

const loginUser = async (req, res) => {
  try {
    //data
    //find user
    //password chk
    //tokn/
    //send cookie

    const { email, username, password } = req.body; // check user data validation

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "pls enter valid email or user name" });
    }

    const user = await User.findOne({ email }); // check user

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "user does not exist",
      });
    }

    const isPasswordValid = await isPasswordCorrect(user.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid user password" });
    }
    const token = await generateUserToken(user._id);

    res.status(200).json({
      status: 200,
      id:user._id,
      role:user.role, 
      user: user.name,
      success: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const allUsers = async (req, res) => {
  try {
    const data = await User.find({}).select("-password ");

    if (!data) {
      return res.status(404).json({ message: "No Record Found ..!" });
    }

    res.status(200).json({users:data});
  } catch (error) {
    res
      .status(500)
      .json({
        message: "internal Server error while fetchin all user records",
        error,
      });
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log(id,data);
    
    if (!id || !data) {
      return res
        .status(400)
        .json({ message: "pls check details and try again !" });
    }

    if (data.password) {
      const pas = data.password;
      data.password = await hashedPassword(pas);
    }
    const response = await User.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({ message: "user updated successfully", response });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "internal Server error while fetchin all user records",
        error,
      });
      console.log(error);
      
  }
};

const deletUserRecord = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "pls enter user id!" });
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "user not existed in Database" });
    }
    const response = await User.findByIdAndDelete(id).select("-password");

    if (!response) {
      return res
        .status(400)
        .json({ message: "An error occured while deleting record" });
    }

    res.status(200).json({ message: "user deleted successfully", response });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "internal Server error while fetchin all user records",
        error,
      });
  }
};

const findSingleUser=async(req,res)=>{
    const id=req.params.id;

    try {

      const response=await User.findOne({_id:id}).select("-password")
      if(!response)
      {
        return res.status(404).json({message:'No Record found'})
      }

      res.status(200).json({response})
      
    } catch (error) {
      console.log(error);
      
    }

}
export { addUser, loginUser, allUsers, editUser, deletUserRecord,findSingleUser};
