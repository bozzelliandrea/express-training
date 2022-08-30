const userRepository = require('../repositories/user.repository');

class UserService {

    async getAll() {
        return await userRepository.findAll();
    }
}

module.exports = new UserService();