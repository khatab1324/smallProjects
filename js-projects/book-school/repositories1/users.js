const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const scrypt = util.promisify(crypto.scrypt); //it return callback of crypto.scrypt as pramis
const Repository = require("./repositories");
class UsersRepositories extends Repository {
  async create(attrs) {
    // attrs === {email : password ,username}
    attrs.id = this.randomeId();
    // before creating file we should call all the file

    // now i want to crypto the password
    // here the link for more info https://nodejs.org/docs/latest-v12.x/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback
    const salt = crypto.randomBytes(8).toString("hex"); // the number 8 is for long char
    const hashed = await scrypt(attrs.password, salt, 64); //the name hashed is not clear because password+slat it equil hashed but I will but it like this to not confiused
    const records = await this.getAll();
    const record = { ...attrs, password: `${hashed.toString("hex")}.${salt}` }; // ...attrs mean sprid the proparty in object and overwrite password over them
    records.push(record); //push the new file

    await this.writeAll(records);
    return record; //to get the id and use it
  }
  async comparePassword(saved, supplied) {
    // saved -> password saved in our data base "hashed.salt"
    //supplied -> password given to us by the user try to sign in

    // const result = saved.split(".");
    // const hashed = result[0];
    // const salt = result[1];

    // it same the obove
    const [hashed, salt] = saved.split("."); //100% same the obove
    const hashedSuppliedbuffer = await scrypt(supplied, salt, 64); //make the same crypto
    // the resone to why we hashedSuppliedbuffer because it callback have a buffer if you remember
    return hashed === hashedSuppliedbuffer.toString("hex"); //to sure it string
  }
}
module.exports = new UsersRepositories("users.json");
