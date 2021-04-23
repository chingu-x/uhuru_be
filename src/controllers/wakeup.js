const asyncHandler = require('express-async-handler')

const wakeUp = asyncHandler(async (req, res) => {
  console.log("I'm now awake")
  res.status(200).json({ status: "Awake" });
})

exports.wakeUp = wakeUp
