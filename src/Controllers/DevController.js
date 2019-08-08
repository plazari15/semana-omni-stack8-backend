const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {
    async store(request, response) {
        const { username } = request.body;

        const userExists = await Dev.findOne({user: username });

        if(userExists){
            return response.json(userExists);
        }
        
        const axiosResponse = await axios.get(`http://api.github.com/users/${username}`);
        
        const {avatar_url: avatar, bio, name} = axiosResponse.data;
        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar,
        });


        return response.json(dev);
    }
};