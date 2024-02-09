const UserModel = require('../models/authModel');
const ListModel = require('../models/listModel')
const jwt = require('jsonwebtoken')

const createList = async(req, res) => {
    try {
        const {application, account, password} = req.body
        
        //check if the request contains a valid token
        const token = req.cookies.token
        if(!token){
            return res.json({ 
                error: 'Unauthorized - Missing token' 
            })
        }

        //verify the token to get user information
        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, decodedToken) => {
            if(err){
                return res.json({ 
                    error: 'Unauthorized - Invalid token' 
                })
            }

            const userId = decodedToken.id

            const userExists = await UserModel.findById(userId);
            if(!userExists){
                return res.json({ 
                    error: 'User does not exist'
                });
            }

            // Proceed with creating the list
            const newList = await ListModel.create({
                application,
                account,
                password,
                user: userId,
            })

            return res.json({
                message: 'List created successfully!',
                newList
            })
        })
    } catch (error) {
        console.error(error);
    }
}


const getList = async(req, res) => {
    try {

        const token = req.cookies.token
        if(!token){
            return res.json({ 
                error: 'Unauthorized - Missing token' 
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, decodedToken) => {
            if(err){
                return res.json({ 
                    error: 'Unauthorized - Invalid token' 
                })
            }

            const userId = decodedToken.id

            const userExists = await UserModel.findById(userId);
            if(!userExists){
                return res.json({ 
                    error: 'User does not exist' 
                })
            }

            //fetch lists for the authenticated user
            const userLists = await ListModel.find({ user: userId })
            return res.json(userLists)
        })
    } catch (error) {
        console.error(error)
    }
}

const updateList = async(req, res) => {
    try {
        
        const token = req.cookies.token
        if(!token){
            return res.json({ 
                error: 'Unauthorized - Missing token' 
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, decodedToken) => {
            if(err){
                return res.json({ 
                    error: 'Unauthorized - Invalid token' 
                });
            }

            const userId = decodedToken.id;

            const userExists = await UserModel.findById(userId);
            if(!userExists){
                return res.json({ 
                    error: 'User does not exist' 
                });
            }

            //extract listId from request parameters
            const listId = req.params.listId;

            //find the list for the authenticated user
            const list = await ListModel.findOne({ 
                _id: listId, 
                user: userId 
            });

            if(!list){
                return res.json({ error: 'List not found' });
            }

            //update the list with the new data
            const { application, account, password } = req.body;
            list.application = application;
            list.account = account;
            list.password = password;

            //save the updated list
            await list.save();

            return res.json({ 
                message: 'List updated successfully!', 
                list 
            });
        });
    } catch (error) {
        console.error(error);
    }
}


const getUpdateList = async(req, res) => {
    try {

        const token = req.cookies.token
        if(!token){
            return res.json({
                error: 'Unauthorized - Missing token' 
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, decodedToken) => {
            if(err){
                return res.json({ error: 'Unauthorized - Invalid token' });
            }

            const userId = decodedToken.id

            const userExists = await UserModel.findById(userId);
            if(!userExists){
                return res.json({ 
                    error: 'User does not exist' 
                });
            }

            const listId = req.params.listId

            const list = await ListModel.findOne({ 
                _id: listId, 
                user: userId 
            })

            if(!list){
                return res.json({ 
                    error: 'List not found' 
                });
            }

            return res.json(list);
        });
    } catch (error) {
        console.error(error)
    }
}

const deleteList = async(req, res) => {
    try {

        const token = req.cookies.token
        if(!token){
            return res.json({ 
                error: 'Unauthorized - Missing token' 
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async(err, decodedToken) => {
            if(err){
                return res.json({ 
                    error: 'Unauthorized - Invalid token' 
                })
            }

            const userId = decodedToken.id

            const userExists = await UserModel.findById(userId);
            if(!userExists){
                return res.json({ 
                    error: 'User does not exist' 
                });
            }

            //extract listId from request parameters
            const listId = req.params.listId

            //find the list for the authenticated user
            const list = await ListModel.findOne({ 
                _id: listId,
                user: userId 
            });

            if(!list){
                return res.json({ 
                    error: 'List not found' 
                });
            }

            //usee deleteOne() to remove the list
            await ListModel.deleteOne({ 
                _id: listId,
                user: userId 
            });

            return res.json({ 
                message: 'List deleted successfully!' 
            })
        })
    } catch (error) {
        console.error(error);
    }
}

const searchLists = async (req, res) => {
    try {

        const token = req.cookies.token;
        if(!token){
            return res.json({ 
                error: 'Unauthorized - Missing token' 
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decodedToken) => {
            if(err){
                return res.json({ 
                    error: 'Unauthorized - Invalid token' 
                })
            }

            const userId = decodedToken.id;

            const userExists = await UserModel.findById(userId);
            if(!userExists){
                return res.json({ 
                    error: 'User does not exist' 
                })
            }

            //extract search query from request parameters
            const searchQuery = req.query.q;

            //fetch lists for the authenticated user based on search query
            const userLists = await ListModel.find({
                user: userId,
                $or: [
                    { application: { $regex: new RegExp(searchQuery, 'i') } },
                    { account: { $regex: new RegExp(searchQuery, 'i') } },
                ],
            })

            return res.json(userLists)
        });
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createList,
    getList,
    updateList,
    getUpdateList,
    deleteList,
    searchLists
}