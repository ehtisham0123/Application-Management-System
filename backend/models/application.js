module.exports = (sequelize, Sequelize, DataTypes) => {
  const Application = sequelize.define(
    "application", // Model name
    {
       // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rollnumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mobilenumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },   
      classandsection: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discipline: {
        type: DataTypes.STRING,
        allowNull: false,
      },   
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },   
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      subCategory: {
        type: DataTypes.STRING,
        allowNull: true,
      }, 
      purpose: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      approved_or_rejected_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      application_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      file_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },

    },
    {
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Application;
};
