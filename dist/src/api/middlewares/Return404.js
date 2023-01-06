export default ((req, res, next) => {
    console.log(process.cwd());
    res.status(404).sendFile(process.cwd() + "/dist/assets/html/404.html");
    next();
});
