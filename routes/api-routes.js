const db = require("../models");

module.exports = function (app) {
    // CREATE
    app.post("/api/workouts", (req, res) => {
        db.Workout.create((req.body), (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
        });
      });
    
    // READ route for workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            res.json(data);
          }
        });
      });


    // UPDATE route for cumulative totals
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate({ _id: req.params.id }, {$inc: { totalDuration: req.body.duration }, $push: { exercises: req.body }},{ new: true }, 
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.json(data);
            }
          });
        });

    // GET route for the stats page
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}, 
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              res.json(data);
            }
          });
        });
}