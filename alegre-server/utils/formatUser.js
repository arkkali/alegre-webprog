export function formatUser(doc) {
  return {
    id: doc.customId || doc._id.toString(), 
    firstName: doc.firstName,
    lastName: doc.lastName,
    email: doc.email,
    username: doc.username,
    role: doc.role,
    age: doc.age,
    gender: doc.gender,
    status: doc.status,
    contact: doc.contact,
    address: doc.address ?? "",
  };
}