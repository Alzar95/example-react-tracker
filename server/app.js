import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import randtoken from 'rand-token';
import transport from 'nodemailer-smtp-transport';
import mysqlDBConnection from './config/mysqlDBConnection';
import cookieParser from 'cookie-parser';

const app = express();

var token,mailOptions,host,link,tokenForLogin;

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.use(cookieParser());

app.get('/', (req, res) => {
    let connection = mysqlDBConnection();

    connection.connect();

    connection.query('SELECT * FROM Users', function (err, result) {
        if (err) throw err;

        res.send(result);
    });

    connection.end();
});

app.post('/', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();

    connection.connect();

    if(req.method == "POST") {
        let post = req.body;
        let name = post.user.name;
        let email = post.user.email;
        let password = post.user.password;
        let role = post.user.role;

        var smtpTransport;

        smtpTransport = nodemailer.createTransport(transport({
            service: 'gmail',
            host: 'localhost:7000',
            auth: {
                user: 'developertest1007@gmail.com',
                pass: '67b1x4z5f'
            }
        }));

        token = randtoken.generate(16);
        host = req.get('localhost:7000');
        link = "http://localhost:7000/verify?id=" + token;
        mailOptions = {
            from: 'developertest1007@gmail.com',
            to : email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
        };


        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                console.log("Message sent: " + response.message);
                res.end("sent");
            }
        });

        let postData = {id: null, name: name, email: email, password: password, role: role, verified: 0, token: token};


        connection.query("INSERT INTO Users SET ?", postData, function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.get('/verify', function (req, res) {
    let connection = mysqlDBConnection();

    connection.connect();
    if ((req.protocol + "://" + req.get('localhost:7000')) == ("http://" + host)) {
        connection.query("SELECT * FROM Users WHERE token = '" + req.query.id + "'", function (err, result) {
            if (err) throw err;

            if (result !== '') {
                res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");

                connection.query("UPDATE Users SET verified = 1 WHERE token = '" + req.query.id + "'", function (err, result) {
                    if (err) throw err;

                });
            } else {
                res.end("<h1>Bad Request</h1>");
            }

            connection.end();
        });
    }
    else {
        res.end("<h1>Request is from unknown source");
    }


});

app.post('/login', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();
    let dataFromLogin;
    let correctLogin;
    let dataUser;

    if(req.method == "POST") {
        let post = req.body;
        let name = post.user.name;
        let email = post.user.email;
        let password = post.user.password;

        tokenForLogin = randtoken.generate(16);

        connection.query(
            "SELECT * FROM Users WHERE name = '" + name + "' AND email = '" + email + "' AND password = '" + password + "' AND verified = 1",
            (err, result) => {
                if(err) throw err;

                if(Object.keys(result).length == 0) {
                    correctLogin = false;
                    dataFromLogin = {correctLogin: correctLogin};
                } else {
                    correctLogin = true;
                    dataUser = {name: result[0].name, role: result[0].role, id: result[0].id};
                    dataFromLogin = {correctLogin: correctLogin, dataUser: dataUser, token: tokenForLogin};
                    connection.query("INSERT INTO Session SET ?", {id: result[0].id, token: tokenForLogin}, (err, result) => {
                        if(err) throw err;
                    });
                }

                res.send(dataFromLogin);

                connection.end();
        });
    }
});

app.post('/tokinforuser', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();
    let dataFromLoginToken;
    let correctToken;
    let dataUser;

    if(req.method == "POST") {
        let post = req.body;
        let token = post.tokenForUser;

        connection.query(
            "SELECT * FROM Users RIGHT JOIN Session ON Users.id = Session.id WHERE Session.token = '" + token + "'",
            (err, result) => {
                if(err) throw err;


                if(Object.keys(result).length == 0) {
                    correctToken = false;
                    dataFromLoginToken = {correctToken: correctToken};
                } else {
                    correctToken = true;
                    dataUser = {name: result[0].name, email: result[0].email, password: result[0].password, role: result[0].role, id: result[0].id};
                    dataFromLoginToken = {correctToken: correctToken, dataUser: dataUser};
                }

                res.send(dataFromLoginToken);
            });
    }

    connection.end();
});

app.get('/check', (req, res) => {
    if(req.session.name) {
        res.set('Content-Type');
        res.send('<h2>User ' + req.session.name + ' is logged in!</h2>');
    } else {
        res.send('not logged in');
    }
});

app.post('/projects', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();
    if(req.method == "POST") {
        let post = req.body;
        let nameProject = post.project.nameProject;

        let postDataProject = {id: null, project_name: nameProject};

        connection.query("INSERT INTO Project SET ?", postDataProject, function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.get('/projects', (req, res) => {
    let connection = mysqlDBConnection();
    connection.connect();
    connection.query('SELECT * FROM Project', function (err, result) {
        if (err) throw err;

        res.send(result);
    });

    connection.end();
});

app.post('/tasks', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    if(req.method == "POST") {
        let post = req.body;
        let taskName = post.task.taskName;
        let taskDescription = post.task.taskDescription;
        let taskStatus = post.task.taskStatus;
        let projectId = post.task.selectedProject;

        let postDataTask = {id: null, task_name: taskName, task_description: taskDescription, status: taskStatus, id_project: projectId};

        connection.query("INSERT INTO Task SET ?", postDataTask, function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.get('/tasks', (req, res) => {
    let connection = mysqlDBConnection();
    connection.connect();
    connection.query('SELECT * FROM Task', function (err, result) {
        if (err) throw err;

        res.send(result);
    });

    connection.end();
});

app.post('/projectsusers', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    if(req.method == "POST") {
        let post = req.body;

        let idProject = post.id_project;
        let idUser = post.id_user;

        let postDataProjectsusers = { id_project: idProject, id_user: idUser };

        connection.query("INSERT INTO ProjectsUsers SET ?", postDataProjectsusers, function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.get('/projectsusers', (req, res) => {
    let connection = mysqlDBConnection();
    connection.connect();
    connection.query('SELECT * FROM ProjectsUsers', function (err, result) {
        if (err) throw err;

        res.send(result);
    });

    connection.end();
});

app.post('/tasksusers', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    if(req.method == "POST") {
        let post = req.body;

        let idTask = post.id_task;
        let idUser = post.id_user;

        let postDataTasksusers = { id_task: idTask, id_user: idUser };

        connection.query("INSERT INTO TasksUsers SET ?", postDataTasksusers, function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.get('/tasksusers', (req, res) => {
    let connection = mysqlDBConnection();
    connection.connect();
    connection.query('SELECT * FROM TasksUsers', function (err, result) {
        if (err) throw err;

        res.send(result);
    });

    connection.end();
});

app.post('/comments', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    if (req.method == "POST") {
        let post = req.body;
        let comment_text = post.commentForTask.comment_text;
        let id_task = post.commentForTask.id_task;
        let user_name = post.commentForTask.user_name;
        let role_user = post.commentForTask.role_user;

        let postDataComments = {
            comment_text: comment_text,
            id_task: id_task,
            user_name: user_name,
            role_user: role_user
        };

        connection.query("INSERT INTO Comment SET ?", postDataComments, function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.post('/commentsdelete', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    let post = req.body;
    let commentIdForTask = post.commentIdForTask;

    connection.query("DELETE FROM Comment WHERE id = '" + commentIdForTask + "'", function (err, result) {
        if (err) throw err;

    });

    connection.end();
});

app.post('/projectsusersdelete', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    let post = req.body;

    let idProject = post.id_project;
    let idUser = post.id_user;

    connection.query("DELETE FROM ProjectsUsers WHERE id_project = '" + idProject + "' AND id_user = '" + idUser +"'", function (err, result) {
        if (err) throw err;

    });

    connection.end();
});

app.post('/tasksusersdelete', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    let post = req.body;

    let idTask = post.id_task;
    let idUser = post.id_user;

    connection.query("DELETE FROM TasksUsers WHERE id_task = '" + idTask + "' AND id_user = '" + idUser +"'", function (err, result) {
        if (err) throw err;

    });

    connection.end();
});

app.get('/comments', (req, res) => {
    let connection = mysqlDBConnection();
    connection.connect();
    connection.query('SELECT * FROM Comment', function (err, result) {
        if (err) throw err;

        res.send(result);
    });

    connection.end();
});

app.post('/tasksstatus', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    if(req.method == "POST") {
        let post = req.body;

        connection.query("UPDATE Task SET status = '" + post.taskStatus.taskStatus + "' WHERE id = '" + post.taskStatus.idTask + "'", function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.post('/taskscomments', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    let connection = mysqlDBConnection();
    connection.connect();

    if(req.method == "POST") {
        let post = req.body;

        connection.query("UPDATE Comment SET comment_text = '" + post.dataTask.taskNewComment + "' WHERE id = '" + post.dataTask.idComment + "'", function (err, result) {
            if (err) throw err;

        });
    }

    connection.end();
});

app.listen(7000);