import { initialize } from "./connection.js";
import { getGroupExpensesModel, getUserModel } from "./models.js";
import { PORT } from "../constants.js";
import { nanoid } from "nanoid";

const app = initialize();

app.post("/registration", async (req, resp) => {
  const User = getUserModel();
  const { body } = req;
  const payload = {
    name: `${body.name}`,
    contactNumber: body.contactNumber,
    mailId: body.mailId,
    password: body.password,
    id: nanoid(),
  };
  await User.create(payload);
  resp.send({ userId: payload.id });
});

app.post("/login", async (req, res) => {
  const { mailId, password } = req.body;
  const User = getUserModel();
  try {
    const user = await User.findOne({ mailId: mailId, password: password });

    if (!user) {
      return res.send("Invalid");
    }
    return res.send({ id: user.id, name: user.name });
  } catch (error) {
    console.error(error);
    return res.send("Error");
  }
});

app.post("/member/add", async (req, resp) => {
  const groupExpenses = getGroupExpensesModel();
  const { body } = req;
  const userDocumentFound = await groupExpenses
    .findOne({ userId: body.userId })
    .exec();
  if (!userDocumentFound) {
    const groupData = await groupExpenses.create(body);
    resp.send(groupData);
  } else {
    const groupData = await groupExpenses.findOneAndUpdate(
      { userId: body.userId },
      body
    );
    resp.send(groupData);
  }
});

app.post("/expenses/add", async (req, resp) => {
  const groupExpenses = getGroupExpensesModel();
  const { body } = req;
  const userDocumentFound = await groupExpenses
    .findOne({ userId: body.userId })
    .exec();
  if (!userDocumentFound) {
    const groupData = await groupExpenses.create(body);
    resp.send(groupData);
  } else {
    const groupData = await groupExpenses.findOneAndUpdate(
      { userId: body.userId },
      { expenses: body.expenses }
    );
    resp.send(groupData);
  }
});

app.post("/members/read", async (req, resp) => {
  const groupExpenses = getGroupExpensesModel();
  const { body } = req;
  const userDocument = await groupExpenses
    .findOne({ userId: body.userId })
    .exec();
  if (!userDocument) {
    resp.send("Not found");
  } else {
    resp.send(userDocument.members);
  }
});

app.post("/expenses/read", async (req, resp) => {
  const groupExpenses = getGroupExpensesModel();
  const { body } = req;
  const userDocument = await groupExpenses
    .findOne({ userId: body.userId })
    .exec();
  if (!userDocument) {
    resp.send("Not found");
  } else {
    resp.send(userDocument.expenses);
  }
});

app.post("/clear-group", async (req, resp) => {
  const groupExpenses = getGroupExpensesModel();
  const { body } = req;
  const userDocument = await groupExpenses.findOneAndUpdate(
    { userId: body.userId },
    { expenses: [], members: [] }
  );
  resp.send(userDocument);
});
app.listen(PORT);
