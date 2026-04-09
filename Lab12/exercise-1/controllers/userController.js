// In-memory data (acts like database)
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Alice" }
];

// GET all users
exports.getAllUsers = (req, res) => {
    res.json(users);
};

// GET user by ID (route parameter)
exports.getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
};

// POST create user
exports.createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    const newUser = {
        id: users.length + 1,
        name
    };

    users.push(newUser);
    res.status(201).json(newUser);
};

// PUT update user
exports.updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    res.json(user);
};

// DELETE user
exports.deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    users = users.filter(u => u.id !== id);

    res.json({ message: "User deleted successfully" });
};