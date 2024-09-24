import mongoose from "mongoose";
import { Chat } from "../../models/chat.Schema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ChatMessage } from "../../models/chatMessage.Schema.js";

/* Create Group Controller */
const makeGroup = async function (req, res) {
  const { name, admin } = req.body;
  if (!name)
    return res.status(401).json(new ApiResponse("Please Provide a group Name"));
  if (!admin) return res.status(401).json(new ApiResponse("Please add admin"));
  const adminId = new mongoose.Types.ObjectId(admin);
  const newGrp = new Chat({
    admin: adminId,
    name: name,
    participants: [adminId],
  });
  await newGrp.save();
  res
    .status(200)
    .json(new ApiResponse("Group Created Successfully", { data: newGrp }));
};

/* Join Group Controller */
const joinGroup = async function (req, res) {
  const { groupId } = req.body;
  const id = req.user.id;
  if (!id) return res.json(new ApiResponse("Please Login First"));
  if (!groupId) return res.json(new ApiResponse("Group Id is Required Field"));
  const existingGroup = await Chat.findOne({_id: groupId});
  if(!existingGroup) return res.json(new ApiResponse("Group Doesn't Exist"))
  const newUser = new mongoose.Types.ObjectId(id);
  existingGroup.participants.push(newUser);
  const response = await existingGroup.save();
  if(!response) return res.json(new ApiResponse("Something Went Wrong"))
  return res.status(200).json(new ApiResponse("Added to Group SuccessFully",{sucess: true}))
};

/* Send Message Controller */
const sendMessage = async(req,res) =>{
  const {message} = req.body;
  const {groupId} = req.body;
  const id = req.user.id;
  if(!message) return res.status(404).json(new ApiResponse("Message is required Field",{sucess: false}))
  const newMessage = new ChatMessage({sender: new mongoose.Types.ObjectId(id),chat: new mongoose.Types.ObjectId(groupId), content: message})
  await newMessage.save();
  return res.status(200).json(new ApiResponse("Message Sent SuccessFully",{sucess: true}));
}

export { makeGroup, joinGroup ,sendMessage};
