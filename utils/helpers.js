export async function within(fn, res, duration, counter = 0) {
  if (counter === 3) {
    return res.json({
      message: "There was an error with the upstream service!",
    });
  }
  const id = setTimeout(() => {
    return within(fn, res, duration, counter + 1);
  }, duration);

  try {
    const data = await fn();
    clearTimeout(id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
