var express = require("express")

var router = express.Router();

var UserController = require("../controllers/UserController");
var AddressController = require("../controllers/AddressController")

router.get('/usuarios', UserController.index);
router.post('/usuarios', UserController.create);
router.get('/usuarios/:id', UserController.findById);
router.put('/usuarios/:id', UserController.edit);
router.delete('/usuarios/:id', UserController.remove);

router.get('/enderecos-usuario/:id_endereco_usuario', AddressController.findById);
router.get('/enderecos-por-usuario/:id_usuario', AddressController.findByUserId);//-por adicionado no caminho da rota para que ela funcione
router.post('/enderecos-usuario', AddressController.create);
router.put('/enderecos-usuario/:id_endereco_usuario', AddressController.edit);
router.delete('/enderecos-usuario/:id_endereco_usuario', AddressController.remove);


module.exports = router;
