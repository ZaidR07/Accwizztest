import express from "express";
import { GroupModel } from "../models/Group.js";
import { LoginModel } from "../models/Login.js";



const Grouprouter = express.Router();


Grouprouter.post("/Groupadd", async (req, res) => {

  const { Groupname, Groupcode, Parentgroup , Creator} = req.body;


  try {
    const newGroup = new GroupModel({
      Groupname,
      Groupcode,
      Parentgroup,
      Creator,


    });

    newGroup.save()
      .then(() => {
        return res.json({
          message: "Group Added Successfully",
          status: true
        });
      })

  }

  catch (error) {
    console.error("Error in Adding:", error);
    return res.status(500).json({ message: "Error in Adding" });
  }


})

Grouprouter.get("/getdata", async (req, res) => {
  try {
    const groups = await GroupModel.find();
    return res.json(groups);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})



Grouprouter.post("/update", async (req, res) => {

  const { updateid, Groupname, Groupcode, Parentgroup } = req.body;


  try {
    const existingGroup = await GroupModel.findOne({ group_id: updateid });


    if (Groupname) {
      existingGroup.Groupname = Groupname;
    } else {
      existingGroup.Groupname = existingGroup.Groupname;
    }
    if (Groupcode) {
      existingGroup.Groupcode = Groupcode;
    } else {
      existingGroup.Groupcode = existingGroup.Groupcode;
    }
    if (Parentgroup) {
      existingGroup.Parentgroup = Parentgroup;
    } else {
      existingGroup.Parentgroup = existingGroup.Parentgroup;
    }

    await existingGroup.save();
    return res.json({
      message: "Group Updated Successfully",
      status: true
    });
  }
  catch (saveError) {
    console.error("Error updating to the database:", saveError);
    return res.status(500).json({ message: "Internal server error" });
  }

})

Grouprouter.post("/dlt", async (req, res) => {
  const { dltid } = req.body;

  try {
    const group = await GroupModel.findOne({ group_id: dltid });
    console.log(group);


    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await GroupModel.deleteOne({ group_id: dltid });

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});






export { Grouprouter };