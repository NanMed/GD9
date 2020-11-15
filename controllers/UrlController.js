const UrlModel = require('../models/Url');
const appConfig = require('../configs/app');

exports.store = (req, res) => {
  console.log("El body", req.body)
  let url = {};
  const { nanoid } = require('nanoid');
  url.original_url = req.body.original_url;
  url.nanoid = nanoid(10);
  url.short_url = `http://localhost:${appConfig.expressPort}/${url.nanoid}`;
  UrlModel.create(url).then((id)=>{
    console.log("Url registrado", url);
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      UrlModel.findById(id).then((url) => res.json(url.short_url));
    } else {
      res.redirect('/');
    }
  })
}

exports.showAll = (req, res) => {
  // console.log("Entro")
  UrlModel.all()
    .then((data) => {
      // console.log("La data", data)
      res.render("homepage/index", { urls: data });
    });
}

exports.findByNanoid = (req,res) => {
  console.log("El find", req.params)
  const nanoid = req.params.nanoid
  const plus = nanoid.toString();
  if(plus.charAt(plus.length - 1) == '+'){
    return res.redirect(`/${nanoid}/informacion`);
  } else {
    UrlModel.find(nanoid).then((data) => {
      console.log("La data", data)
      UrlModel.changeStatus(data).then((id) => {
        console.log("Elemento actualizado");
      });
      return res.redirect(data.original_url);
    });
  }
}

exports.info = (req, res) => {
  const nanoidPlus = req.params.nanoid
  const nanoid = nanoidPlus.replace("+", "");
  console.log(nanoid)
  UrlModel.find(nanoid).then((data) => {
    console.log("La data de info", data);
    res.render("homepage/info", { url: data });
  });
};