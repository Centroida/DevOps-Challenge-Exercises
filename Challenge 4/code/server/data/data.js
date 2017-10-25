const CryptoJS = require('crypto-js');
const { ObjectId } = require('mongodb');

class Data {
    constructor(database) {
        this.users = database.collection('users');
        this.products = database.collection('products');
        this.pizza = database.collection('pizza');
    }

    findUserById(id) {
        if (typeof id !== 'string') {
            return Promise.reject('Invalid id!');
        }

        // eslint-disable-next-line
        return this.users.findOne({ _id: ObjectId(id) });
    }

    findUserByUsername(username) {
        if (typeof username !== 'string') {
            return Promise.reject('Invalid username!');
        }

        return this.users.findOne({ username });
    }

    validateUserPassword(user, password) {
        if (!user) {
            return Promise.reject('Invalid user!');
        }

        // eslint-disable-next-line new-cap
        if (user.password !== CryptoJS.SHA1(password).toString()) {
            return Promise.reject('Invalid password!');
        }

        return Promise.resolve(user);
    }

    addUser(user) {
        if (!user) {
            return Promise.reject('Invalid user!');
        }

        return this.findUserByUsername(user.username)
            .then((currUser) => {
                if (currUser !== null) {
                    return Promise.reject(
                        'There is already a user with such username!');
                }

                // eslint-disable-next-line new-cap
                user.password = CryptoJS.SHA1(user.password).toString();
                return this.users.insert(user);
            });
    }

    updateUser(user) {
        if (!user) {
            return Promise.reject('Invalid user!');
        }

        return this.users.update({
            _id: user._id,
        }, user);
    }

    getAllPizza() {
        return this.pizza.find().toArray();
    }

    getAllProducts() {
        return this.products.find().toArray();
    }
}

module.exports = Data;
