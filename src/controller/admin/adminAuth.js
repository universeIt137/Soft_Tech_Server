exports.Adminlogin = (req, res) => {
    try {
       
        res.status(200).json({ status: 'success', data: "login successfully" })
    } catch (e) {
        res.status(400).json({ status: 'failed' })
    }
}