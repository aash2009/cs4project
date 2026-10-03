import exp from 'express';
import { readFileSync } from 'fs';
import fs from 'fs/promises';


let APIlogger;

const index = JSON.parse(await fs.readFile('./backend/posts/index.json'));

export function setupAPI(app, logger) {
    APIlogger = logger;
    const goLog = (req, res, next) => {
        APIlogger.info(`Coming from ${req.ip}`);
        APIlogger.info(`Request '${req.method} ${req.originalUrl}'`);
        next();
    }

    app.use(goLog);

    const api = exp.Router();

    app.use('/api', api);

    app.set('trust proxy', true);


    api.get('/post/:id', (req, res) => {
        let id = req.params.id;
        let post = {};
        res.setHeader("content-type", "application/json");
        index.posts.forEach(element => {
            if (element.id == id) {
                post = element;
            }
        });
        if (Object.keys(post).length == 0) {
            res.send({ "error": "post id does not exist" });
        } else {
            res.send(post);
        }
    });

    api.get('/hashtag/:tag', (req, res) => {
        let term = req.params.tag;
        let posts = [];
        index.posts.forEach(element => {
            if (element.hashtags.includes(term)) {
                posts.push(element.id);
            }
        });
        res.setHeader("content-type", "application/json");
        res.send({ hashtag: term, postids: posts });
    });

    api.get('/image/:imgid', (req, res) => {
        let imgid = req.params.imgid;

        res.setHeader("content-type", "image/png");
        res.send(readFileSync(`./backend/posts/images/${imgid}.png`));
    });

}


