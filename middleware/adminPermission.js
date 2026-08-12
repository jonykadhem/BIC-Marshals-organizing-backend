const adminPermission = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            err: "Admin access required."
        })
    }

    next()
}

module.exports = adminPermission