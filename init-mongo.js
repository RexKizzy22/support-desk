db.createUser({
  user: "admin",
  pwd: "support",
  roles: [
    {
      role: "readWrite",
      db: "support",
    },
  ],
});
