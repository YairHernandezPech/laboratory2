const express = require("express")
const routes = express.Router()
const { postLogin } = require("../services/verify.services")

routes.post('/', postLogin);

module.exports = routes;
