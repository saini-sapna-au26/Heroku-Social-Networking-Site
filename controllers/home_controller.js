const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(req, res){
    try{
        //populate the user of each post
        console.log("Sample1")
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
            },
            options : {
                sort : {'createdAt' : -1}
            }
        });
        let users = await User.find({});
        let curr_user;
        if(req.user){
            curr_user = await User.findById(req.user._id);
            console.log("Sample2")
            console.log(curr_user) 
            curr_user = await curr_user.populate({
                path : 'friends'
            })
            
        }
        
    return res.render('home', {
        title: "Fakebook | Home Page",
        posts : posts,
        all_users : users,
        current_user : curr_user
    });
        
    }catch(err){
        console.log(err)
        console.log('Error occured in home controller!');
        return;
    }
    
}