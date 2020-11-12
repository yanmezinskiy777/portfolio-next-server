const Portfolio = require("../db/models/portfolio");

exports.portfolioController = async (req, res) => {
  const portfolios = await Portfolio.find({});
  return res.json(portfolios);
};

exports.getProtfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    return res.json(portfolio);
  } catch (err) {
    return res.status(422).send("Api error");
  }
};

exports.postPortfolioController = async (req, res) => {
  const portfolio = new Portfolio(req.body)
  const userId = req.user.sub;
  portfolio.userId = userId;
  try{
    const result = await portfolio.save();
    return res.json(result);
  }catch(e){
    res.status(e.status || 400).send(e.message);
  }
}

exports.updatePortfolioController = async (req, res) => {
  const { body, params: { id } } = req;
  try{
    const updatedProtfolio = await Portfolio.findOneAndUpdate({ _id: id }, body, { new: true, runValidators: true});
    res.json(updatedProtfolio);
  }catch(e){
    res.status(e.status || 400).send(e.message);
  }

}

exports.deletePortfolioController = async (req, res) => {
  const id = req.params.id;
  try{
    const deletedProtfolio = await Portfolio.findOneAndDelete({ _id: id });
    res.json(deletedProtfolio)
  }catch(e){
    res.status(e.status || 400).send(e.message);
  }
}
