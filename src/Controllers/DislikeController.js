const Dev = require('../models/Dev')

module.exports = {

    async store(request, response) {
        const { devId } = request.params;
        const { user } = request.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
           return response.status(400).json({error: 'Dev not Exists'}) 
        }

        if(loggedDev.dislikes.includes(devId)){
            return response.status(400).json({error: 'You alread give a dislike to this user'}) 
        }

        loggedDev.dislikes.push(targetDev._id);

        const loggedDevStatus = await loggedDev.save();

        if(loggedDevStatus){
           return response.json({ok: true})
        }

        return response.status(500).json({ok: false})
        
    }
}