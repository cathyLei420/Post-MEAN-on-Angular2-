

var express = require('express');
var app = express();
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccessStatus: 200
    
  }
app.use(cors(corsOptions));

app.use(bodyparser.json());

mongoose.connect('mongodb://marlabsTest:marlabsTest@ds117311.mlab.com:17311/marlabstest');
var db = mongoose.connection;

db.on('error', function() {
  console.log('error connect to db');
})

db.on('open', function() {
  console.log('connection done');
})

var UserSchema = mongoose.Schema({
  "username": String,
  "password": String,
  "company": String,
  "phone": String
});

var PostSchema = mongoose.Schema({
    "id":Number,
    "user": String,
    "title": String,
    "liked":[String],
    "description": String,
    "time":String
});

var CommentSchema = mongoose.Schema({
    "postid": Number,
    "user":String,
    "content":String,
    "time":String
})

var User = mongoose.model('users', UserSchema);
var Post = mongoose.model('posts', PostSchema);
var Comment = mongoose.model('comments', CommentSchema);

app.post('/authenticate', function(req, res){
    var query={"username":req.body.username, "password":req.body.password};
    User.find(query, function(err, data) {
        if(!err) {
            console.log(data);
            if (!data[0] || data[0] == undefined) {
                res.send({"loggedIn" : false});
            } else {
                var token = jwt.sign({'uname':req.body.username}, 'marlabs-secret-key', {expiresIn:'1h'});
                res.send({"loggedIn":true,'token':token, 'uname':req.body.username});
            }
        }
        
    })
});



app.use(function(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'marlabs-secret-key', function(err, decoded) {
            if (err) {
                console.log('Error');
            } else {
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        });
    } else {
        
    }
    
});

app.post('/createpost', function(req, res) {
    // console.log('ha');
    console.log('from node' + req.body);
    var post = new Post(req.body);
    post.save(function(err) {
        if (!err) {
            res.send({'flg':true});
        } else {
            console.log(err);
        }
    })
});

app.get('/getposts', function(req, res) {
    Post.find({}, function(err, posts) {
        if (!err) {
            res.send(posts);
        }
    })
})

app.post('/updatelike', function(req, res) {
    console.log(req.body.pid);
    console.log(req.body.liked);
    Post.update({'id': req.body.pid}, {$set:{'liked': req.body.liked}}, function(err, data) {
        if (!err) {
            res.send(data);
        }
    })
})

app.post('/getcomments', function(req, res) {
    var query = {"postid": req.body.postid};
    console.log(query);
    Comment.find(query, function(err, data){
        if (!err) {
            console.log(data);
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

app.post('/getpost', function(req, res) {
    console.log(req.body.postid);
    var query = {"id": req.body.postid};
    console.log(query);
    Post.find(query, function(err, data){
        if (!err) {
            console.log('from getpost' + data);
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

// app.post('/getlike', function(req, res) {
//     console.log(req.body.postid);
//     var query = {"id": req.body.pid};
//     console.log(query);
//     Post.find(query, function(err, data){
//         if (!err) {
//             console.log('from getpost' + data);
//             res.send(data);
//         } else {
//             console.log(err);
//         }
//     })
// })

app.post('/addcomment', function(req, res) {
    console.log(req.body);
    var comment = new Comment(req.body);
    comment.save(function(err) {
        if (!err) {
            res.send({'flg': true});
        } else {
            console.log(err);
        }
    })
});

app.post('/deletepost', function(req, res) {
    console.log(req.body);
     var query = {"id": req.body.postid};
    Post.remove(query, function(err, data) {
        if (!err) {
            res.send({'flg': true});
        } else {
            console.log(err);
        }
    })
});
app.post('/register', function(req, res) {
    console.log('from node' + req.body.username);
    var user = new User(req.body);
    console.log(user);
    user.save(function(err) {
        if (!err) {
            res.send({'flg':true});
        } else {
            console.log(err);
        }
    });
});

app.post('/authenticate', function(req, res){
    var query={"username":req.body.username, "password":req.body.password};
    User.find(query, function(err, data) {
        if(!err) {
            console.log(data);
            if (!data[0] || data[0] == undefined) {
                res.send({"loggedIn" : false});
            } else {
                var token = jwt.sign({'uname':req.body.username}, 'marlabs-secret-key', {expiresIn:'1h'});
                res.send({"loggedIn":true,'token':token, 'uname':req.body.username});
            }
        }
        
    })
});



app.use(function(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'marlabs-secret-key', function(err, decoded) {
            if (err) {
                console.log('Error');
            } else {
                req.decoded = decoded;
                console.log(req.decoded);
                next();
            }
        });
    } else {
        
    }
    
});







app.listen(2000, function(){
    console.log('server running ar localhost:2000');
});