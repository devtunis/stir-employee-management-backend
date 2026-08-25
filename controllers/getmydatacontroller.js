 
const getmydatacontroller  =async (req,res) => {
  return res.status(200).json({
    RefreshInfo:req.user
  })
}

export default getmydatacontroller