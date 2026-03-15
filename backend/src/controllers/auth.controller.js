import jwt from "jsonwebtoken";
import { ACCESS_SECRET, REFRESH_SECRET } from "../app.js";
import db from "../db/db.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: "failure",
                message: "Username and password required"
            });
        }

        const user = await db("user_details")
            .where("user_name", username)
            .first();

        const isMatch = await bcrypt.compare(password, user.password_encrypt);

        if (!user || !isMatch || !user.allowed) {
            return res.status(401).json({
                status: "failure",
                message: "Invalid credentials"
            });
        }

        const result = await db.raw(
        `select role_name from roles where role_id = (
            select role_id from user_details where user_name = ?
        )`,
        [user.user_name]
        );

        const accessToken = jwt.sign(
            {username: user.user_name, role_id: user.role_id, role_name: result.rows?.[0]?.role_name},
            ACCESS_SECRET,
            {expiresIn: '15m'}
        );

        const refreshToken = jwt.sign(
            {username: user.user_name, role_id: user.role_id, role_name: result.rows?.[0]?.role_name},
            REFRESH_SECRET,
            {expiresIn: '1d'}
        );

        res.cookie("accesstoken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({status: "success", user: {username: user.user_name, role_id: user.role_id, role_name: result.rows?.[0]?.role_name}, message: "Login successfully"});
    } catch (error) {
        res.status(500).json({status: "failure", error: "Internal Server Error"});
    }
};

export const signup = async (req, res) => {
    try {
        const {username, password, role_id} = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: "failure",
                message: "Username and password are required"
            });
        }

        const user = await db("user_details")
        .where("user_name", username)
        .first();

        if (user) {
            return res.status(409).json({
                status: "failure",
                message: "Username already exists"
            });
        }

        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                status: "failure",
                message: "Password must be atleast 16 characters and contain at least one special character"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db("user_details").insert({
            user_name: username,
            password_encrypt: hashedPassword,
            role_id: role_id,
            created_by: username,
            modified_by: username
        });

        res.status(201).json({status: "success", message: "User created successfully and in pending approval"});
    } catch (error) {
        res.status(500).json({status: "failure", error: "Internal Server Error"});
    }
};

export const getLoggedInInfo = (req, res) => {
    res.status(200).json({
        status: "success",
        user: req.user
    }); 
};

export const logout = (req, res) => {
    res.clearCookie("accesstoken", {
        httpOnly: true,
        secure: false, 
        sameSite: "strict"
    });
    res.clearCookie("refreshtoken", {
        httpOnly: true,
        secure: false, 
        sameSite: "strict"
    });

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};

export const refresh = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;

    if (!refreshToken) {
      return res.status(401).json({
        status: "failure",
        message: "Invalid credentials"
      });
    }

    jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "failure",
          message: "Invalid refresh token"
        });
      }

      const accessToken = jwt.sign(
        {
          username: user.username,
          role_id: user.role_id,
          role_name: user.role_name
        },
        ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 15 * 60 * 1000
      });

      return res.status(200).json({
        status: "success",
        message: "Token refreshed"
      });
    });

  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Internal server error"
    });
  }
};