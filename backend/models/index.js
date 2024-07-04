const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.students = require("./student")(sequelize, Sequelize, DataTypes);
db.admins = require("./admin")(sequelize, Sequelize, DataTypes);
db.viceChancellor = require("./viceChancellor")(sequelize, Sequelize, DataTypes);
db.teachers = require("./teacher")(sequelize, Sequelize, DataTypes);
db.sessions = require("./session")(sequelize, Sequelize, DataTypes);
db.announcements = require("./announcement")(sequelize, Sequelize, DataTypes);
db.applications = require("./application")(sequelize, Sequelize, DataTypes);
db.forwardedApplications = require("./forwardedApplication")(sequelize, Sequelize, DataTypes);
db.remarks = require("./remark")(sequelize, Sequelize, DataTypes);
db.suggestions = require("./suggestion")(sequelize, Sequelize, DataTypes);



db.teachers.hasMany(db.forwardedApplications, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.applications.hasMany(db.forwardedApplications, {
  foreignKey: {
    name: "application_id",
    type: DataTypes.UUID,
  },
});

db.forwardedApplications.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.forwardedApplications.belongsTo(db.applications, {
  foreignKey: {
    name: "application_id",
    type: DataTypes.UUID,
  },
});


db.teachers.hasMany(db.remarks, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.applications.hasMany(db.remarks, {
  foreignKey: {
    name: "application_id",
    type: DataTypes.UUID,
  },
});

db.remarks.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.remarks.belongsTo(db.applications, {
  foreignKey: {
    name: "application_id",
    type: DataTypes.UUID,
  },
});

db.remarks.belongsTo(db.viceChancellor, {
  foreignKey: {
    name: "vice_chancellor_id",
    type: DataTypes.UUID,
  },
});

db.viceChancellor.hasMany(db.remarks, {
  foreignKey: {
    name: "vice_chancellor_id",
    type: DataTypes.UUID,
  },
});

db.forwardedApplications.belongsTo(db.viceChancellor, {
  foreignKey: {
    name: "vice_chancellor_id",
    type: DataTypes.UUID,
  },
});

db.viceChancellor.hasMany(db.forwardedApplications, {
  foreignKey: {
    name: "vice_chancellor_id",
    type: DataTypes.UUID,
  },
});



db.students.hasMany(db.applications, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});

db.applications.belongsTo(db.students, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});


db.announcements.belongsTo(db.teachers, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});

db.teachers.hasMany(db.announcements, {
  foreignKey: {
    name: "teacher_id",
    type: DataTypes.UUID,
  },
});


db.announcements.belongsTo(db.admins, {
  foreignKey: {
    name: "admin_id",
    type: DataTypes.UUID,
  },
});

db.admins.hasMany(db.announcements, {
  foreignKey: {
    name: "admin_id",
    type: DataTypes.UUID,
  },
});

db.announcements.belongsTo(db.viceChancellor, {
  foreignKey: {
    name: "vice_chancellor_id",
    type: DataTypes.UUID,
  },
});

db.viceChancellor.hasMany(db.announcements, {
  foreignKey: {
    name: "vice_chancellor_id",
    type: DataTypes.UUID,
  },
});

// db.applications.hasMany(db.applicationSubmissions, {
//   foreignKey: {
//     name: "application_id",
//     onDelete: 'CASCADE',
//     type: DataTypes.UUID,
//   },
// });

// db.applicationSubmissions.belongsTo(db.applications, {
//   foreignKey: {
//     name: "application_id",
//     onDelete: 'CASCADE',
//     type: DataTypes.UUID,
//   },
// });

db.suggestions.belongsTo(db.students, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});

db.students.hasMany(db.suggestions, {
  foreignKey: {
    name: "student_id",
    type: DataTypes.UUID,
  },
});

module.exports = db;
