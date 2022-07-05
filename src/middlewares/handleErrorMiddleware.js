export default async function handleError(error, req, res, next) {
  console.error(error);
  res.sendStatus(500);
}
