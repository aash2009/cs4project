import exp from 'express';
import { readFileSync } from 'fs';
import fs from 'fs/promises';
import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

const app = exp();
const port = 8080;
const index = JSON.parse(await fs.readFile('./posts/index.json'));

const goLog = (req, res, next) => {
    logger.info(`Coming from ${req.ip}`);
    logger.info(`Request: ${req.originalUrl}`);
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
    res.send(readFileSync(`./posts/images/${imgid}.png`));
});




app.listen(port, () => {
    logger.info(`Listening on ${port}`);
});