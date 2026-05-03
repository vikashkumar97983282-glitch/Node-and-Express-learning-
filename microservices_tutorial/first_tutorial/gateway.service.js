const express = require('express')
const app = expess()
const proxy = require('express-http-proxy')


app.use('/about', proxy('http://localhost:3002'))