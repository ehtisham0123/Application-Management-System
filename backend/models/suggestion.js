module.exports = (sequelize, Sequelize, DataTypes) => {
  const Suggestion = sequelize.define(
    "suggestions", // Model name
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
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isHidden: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // options  
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Suggestion;
};
