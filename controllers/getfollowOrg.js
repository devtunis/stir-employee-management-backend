 import Organization from "../model/organization.js"

const getfollowOrg = async(req,res) => {

    console.log(req.user.cin)
        const findAllRepo = await Organization.find({
            $or: [
            { ownerId: req.user.cin },         
            { "members.cin": req.user.cin }   
        ]
}).select("-members -requests")
  return res.status(200).json(findAllRepo)
}

export default getfollowOrg