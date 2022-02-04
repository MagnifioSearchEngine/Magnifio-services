const express = require('express')
const uploadFile = require('./views/s3')
const cors = require("cors")
const fileupload = require("express-fileupload")
const mongoose = require("mongoose")
const multer = require("multer");
const Event = require('./models/eventSchema');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

// middlewares
app.use(express.json())
app.use(cors({ origin:'*' }))
app.use(fileupload())

const storage = multer.memoryStorage({
	destination: (req, file, callback) => {
		callback(null, "");
	},
});

// db-setup
// const DB = 'mongodb+srv://baluram:baluram12345@cluster0.wt36o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const DB = 'mongodb+srv://Pranay:confidential@cluster0.2bumc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('connected to database successfully!'))
	.catch((err) => console.log(err))

// home route
app.get('/', (req, res) => {
		res.send('Server is running');
})

// Routes

// get all events
app.get('/events', (req, res) => {
	Event.find().then((result) => {
		res.send(result);
	});
});

// post an event
app.post('/events', async (req, res) => {
	const events = req.body;

	events.forEach(async (val) => {
		const { eventId, subject, startTime, endTime } = val;
		try {
			const event = new Event({ eventId, subject, startTime, endTime });

			const addedUser = await event.save();
			if (addedUser) {
				res
					.status(201)
					.json({ message: `data ${subject} added successfully` });
			}
		} catch (err) {
			res.send(err);
		}
	})
})

// uplaods post route
app.post(
	'/upload',
	multer({ storage }).single("files"),
	async (req, res) => {
		console.log(req.files);
		const filename = req.files.data.name;
		const mimetype =  req.files.data.mimetype;
		const file = req.files.data.data
		// // link is the returned object URL from S3

		const link = await uploadFile(filename, mimetype, file)
		console.log(link)
		res.send(link)
})

app.listen(port, () => {
		console.log(`serving on http://localhost:${port}`)
})


/**
 * 
 *  ssh -i "flask.pem" ec2-user@ec2-54-174-6-76.compute-1.amazonaws.com
 * 
 */
