import db from "../db/db.js";

export const getRoles = async(req, res) => {
    try {
        const result = await db("roles").select("role_id", "role_name");

        return res.json({status: "success", roles: result});
    } catch (error) {
        res.status(500).json({status: "failure", message: "Failed to fetch roles"});
    }
};

export const getACL = async(req, res) => {
    try {
        const {role_id} = req.user;

        const result = await db("ui_acl").
                        where("role_id", role_id);
        
        res.json({status: "success", data: result});
    } catch (error) {
        res.status(500).json({status: "failure", message: "Internal Server Error"});
    }
}