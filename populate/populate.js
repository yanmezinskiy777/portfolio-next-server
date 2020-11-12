const Portfolio = require("../db/models/portfolio");
const Blog = require("../db/models/blogs");
const data = require("./data");

class Populate {
  async addDate() {
    await Portfolio.create(data.portfolios);
    await Blog.create(data.blogs);
  }
  async claen() {
    await Portfolio.deleteMany({});
    await Blog.deleteMany({});
  }
  async populate() {
    await this.claen();
    await this.addDate();
  }
}

module.exports = new Populate();
