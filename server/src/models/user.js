const con = require('../Config/db_conn');
const queries = require("../Config/queries");
const SELECT = queries.SELECT;
const INSERT = queries.INSERT;
const UPDATE = queries.UPDATE;
const DELETE = queries.DELETE;
var jwt = require('jsonwebtoken');
const uti = require('../tools');

module.exports = {
    Register: function (firstname, lastname, username, email, password, picture, omni_id) {
        con.query(INSERT.AddUser, [firstname, lastname, username, email, password, picture, omni_id], (err, res) => {
            if (err) {
                throw err;
            }
        });
    },
    getUser: function (type, value) {
        return new Promise((resolve, reject) => {
            con.query(SELECT[type], value, (err, res) => {
                if (err)
                reject(err);
                else {
                    if (!uti.isEmpty(res)) {
                        const data = JSON.parse(JSON.stringify(res))[0];
                        let datatoken = JSON.parse(JSON.stringify(res))[0];
                        delete datatoken.password;
                        delete datatoken.vfToken;
                        let vftoken = jwt.sign(datatoken, 'SecretKey');
                        data.token = vftoken;
                        console.log(data)
                        resolve(data);
                    } 
                    else 
                        resolve(null)
                }
            });
        })
    },

    update: function (type, value) {
        return new Promise((resolve, reject) => {
            con.query(UPDATE[type], value, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(JSON.stringify(res)));
            });
        })
    },

    select: function (type, value) {
        return new Promise((resolve, reject) => {
            con.query(SELECT[type], value, (err, res) => {
                if (err)
                    reject(err);
                else
                {
                    if(uti.isEmpty(res))
                        resolve(false)
                    else 
                    resolve(JSON.parse(JSON.stringify(res)));
                }
            });
        })
    },

    getComment: function (type, value){
        return new Promise ((resolve, reject) => {
            con.query(SELECT[type], value,(err,res) => {
                if(err)
                    reject(err);
                else
                { 
                    resolve(JSON.parse(JSON.stringify(res)));
                }
            });
        })
    },

    delete: function (type, value) {
        return new Promise((resolve, reject) => {
            con.query(DELETE[type], value, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(JSON.stringify(res)));
            });
        })
    },

    UpdatvfToken: function (email, token) {
        return new Promise((resolve, reject) => {
            con.query(UPDATE.UpToken, [token, email], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        })
    },

    verif: function (email) {
        return new Promise((resolve, reject) => {
            con.query(UPDATE.verif, email, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        })
    },

    non_verif: function (email) {
        return new Promise((resolve, reject) => {
            con.query(UPDATE.non_verif, email, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        })
    },
    ResetPassword: function (password, token) {
        return new Promise((resolve, reject) => {
            con.query(UPDATE.ResetPassword, [password, token], (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        })
    },
    
    insert: function (type, value) {
        return new Promise((resolve, reject) => {
            con.query(INSERT[type], value, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(JSON.parse(JSON.stringify(res)));
            });
        })
    },
};