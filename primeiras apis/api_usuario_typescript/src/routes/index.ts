import { Router } from "express";

const router = Router();
import  UserController from '../controllers/UserController';
import  AddressController from '../controllers/AddressController';

router.get('/usuarios', UserController.index);
router.post('/usuarios', UserController.create);
router.get('/usuarios/:id', UserController.findById);
router.put('/usuarios/:id', UserController.edit);
router.delete('/usuarios/:id', UserController.remove);

router.get('/enderecos-usuario/:id_endereco_usuario', AddressController.findById);
router.get('/enderecos-por-usuario/:id_usuario', AddressController.findByUserId);
router.post('/enderecos-usuario', AddressController.create);
router.put('/enderecos-usuario/:id_endereco_usuario', AddressController.edit);
router.delete('/enderecos-usuario/:id_endereco_usuario', AddressController.remove);


export default router;