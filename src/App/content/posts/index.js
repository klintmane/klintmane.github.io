import _2018_10_18 from "./2018-10-18.md";

export default [
  {
    date: "2018-10-18",
    title: "Test",
    Markdown: _2018_10_18
  }
].sort((a, b) => new Date(a.date) < new Date(b.date));
