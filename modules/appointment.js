const mysql = require('mysql');

// Create connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ameymin@12345',
    database: 'node'
});

// Connect to database
db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected');
});

class Appointment {
    constructor(name, date, time) {
        this.name = name;
        this.date = date;
        this.time = time;
    }

    save() {
        const INSERT_APPOINTMENT_QUERY = `INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)`;
        db.query(INSERT_APPOINTMENT_QUERY, [this.name, this.date, this.time], (err, result) => {
            if (err) {
                console.error('Failed to insert appointment:', err);
            } else {
                console.log('Appointment inserted successfully');
            }
        });
    }

    static fetchAll(cb) {
        const SELECT_APPOINTMENTS_QUERY = `SELECT * FROM appointments`;
        db.query(SELECT_APPOINTMENTS_QUERY, (err, result) => {
            if (err) {
                console.error('Failed to fetch appointments:', err);
                cb([]);
            } else {
                cb(result);
            }
        });
    }

    static deleteById(id, cb) {
        const DELETE_APPOINTMENT_QUERY = `DELETE FROM appointments WHERE id = ?`;
        db.query(DELETE_APPOINTMENT_QUERY, id, (err, result) => {
            if (err) {
                console.error('Failed to delete appointment:', err);
            } else {
                console.log('Appointment deleted successfully');
            }
            cb(err);
        });
    }
}

module.exports = Appointment;